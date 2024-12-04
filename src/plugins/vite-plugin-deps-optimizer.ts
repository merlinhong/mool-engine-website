import type { Plugin, PluginOption } from 'vite'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import type { NodePath } from '@babel/traverse'
import type { ImportDeclaration } from '@babel/types'
import * as fs from 'fs'
import * as path from 'path'
import { createFilter } from '@rollup/pluginutils'
import { parse as vueParser } from '@vue/compiler-sfc'
import federation from '@originjs/vite-plugin-federation'

interface DepOptimizerOptions {
  include?: Array<string | RegExp>
  exclude?: Array<string | RegExp>
  cacheDir?: string
}

export function depsOptimizer(options: DepOptimizerOptions = {}): PluginOption[] {
  const filter = createFilter(
    options.include || [/\.[jt]sx?$/, /\.vue$/],
    options.exclude || [/node_modules/, /\.git/]
  )
  
  const dependencies = new Map<string, string>()
  let config: any

  // 扫描依赖的函数
  const scanDependencies = (code: string, id: string) => {
    // 处理 Vue 文件
    if (id.endsWith('.vue')) {
      const { descriptor } = vueParser(code)
      if (descriptor.script || descriptor.scriptSetup) {
        const scriptContent = (descriptor.script?.content || descriptor.scriptSetup?.content || '').trim()
        if (scriptContent) {
          analyzeImports(scriptContent)
        }
      }
      return
    }

    // 处理其他文件
    analyzeImports(code)
  }

  // 分析导入语句
  const analyzeImports = (code: string) => {
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'decorators-legacy']
    })
    
    traverse(ast, {
      ImportDeclaration(path: NodePath<ImportDeclaration>) {
        const source = path.node.source.value
        if (!source.startsWith('.') && !source.startsWith('/')) {
          // 是第三方依赖
          const mfName = `mf/${source}`
          dependencies.set(source, mfName)
        }
      }
    })
  }

  return [
    {
      name: "vite-plugin-deps-optimizer",
        enforce: "post",

      configResolved(resolvedConfig) {
        config = resolvedConfig;
      },

      transform(code, id) {
        if (!filter(id)) return null;

        try {
          scanDependencies(code, id);

          if (id.endsWith(".vue")) {
            return null;
          }

          let transformedCode = code;
          dependencies.forEach((mfName, depName) => {
            const regex = new RegExp(`from ['"]${depName}['"]`, "g");
            transformedCode = transformedCode.replace(regex, `from '${mfName}'`);
          });

          return {
            code: transformedCode,
            map: null,
          };
        } catch (error) {
          console.error(`Error processing file ${id}:`, error);
          return null;
        }
      },
    },
    federation({
      name: "mf",
      filename: "remoteEntry.js",
      exposes: {
        vue: "vue",
        "vue-router": "vue-router",
        "element-plus": "element-plus",
        pinia: "pinia",
        axios: "axios",
        "monaco-editor": "monaco-editor",
      },
      shared: {
        vue: { singleton: true },
        "vue-router": { singleton: true },
        "element-plus": { singleton: true },
        pinia: { singleton: true },
        axios: { singleton: true },
        "monaco-editor": { singleton: true },
      },
    }),
  ];
} 
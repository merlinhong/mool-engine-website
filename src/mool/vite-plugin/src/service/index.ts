import { Plugin, ResolvedConfig } from "vite";
import { createMockServer, requestMiddleware } from "./createMockServer";
import fs from "fs";
import { join, resolve, posix } from "node:path";
import chokidar from "chokidar";
import { ViteMockOptions } from "./types";
import emitter from "./mitt";
// 导出vite插件
interface IOpt {
  mock: ViteMockOptions;
  dts: string;
}


const SERVICE_DIR = join(process.cwd(), "src", "service");
function generateServiceTypes(path: string = "service.d.ts") {
  const typesPath = join(process.cwd(), path);
  const serviceFiles = fs
    .readdirSync(SERVICE_DIR)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts")
    .map((file) => file.replace(".ts", ""));

  const moduleTypes = serviceFiles
    .map(
      (module) => `
    ${module}: typeof import("src/service/${module}")['default'];
    `,
    )
    .join("");

  const typeContent = `// Auto-generated file
export {};
declare global {
  interface ServiceTypes {
    ${moduleTypes}
  };
};
`;

  fs.writeFileSync(typesPath, typeContent);
}

// 可以在构建或开发时调用此函数

export function servicePlugin(opt: IOpt): Plugin[] {
  let isDev = false;
  let config: ResolvedConfig;
  let timer: number | undefined = undefined;
  function clear() {
    clearTimeout(timer);
  }
  function schedule(fn: () => void) {
    clear();
    timer = setTimeout(fn, 500) as any;
  }
  function toArray(arr) {
    if (!arr) return [];
    if (Array.isArray(arr)) return arr;
    return [arr];
  }
  return [
    {
      name: "vite-plugin-service",
      apply: "serve",
      config(c) {
        if (!c.server) c.server = {};
        if (!c.server.watch) c.server.watch = {};
        c.server.watch.disableGlobbing = false;
      },
      configResolved(resolvedConfig) {
        config = resolvedConfig;
        isDev = config.command === "serve";
        isDev && createMockServer(opt.mock, config);
        
      },

      async configureServer(server) {
        emitter.on('update',handleFileChange);
        function handleFileChange(msg) {
          schedule(() => {
            server.restart();
          });
        }

        // 监听 service 目录
        const watcher = chokidar.watch(SERVICE_DIR, {
          ignored: /(^|[\/\\])\../, // 忽略隐藏文件
          persistent: true,
          depth: 1,
        });
        // 监听文件变化
        watcher.on("all", () => {
          generateServiceTypes(opt?.dts);
        });

        const { enable = isDev } = opt.mock;
        if (!enable) {
          return;
        }
        const middleware = await requestMiddleware(opt.mock);
        server.middlewares.use(middleware);

        // 服务器关闭时关闭监听器
        server.httpServer?.on("close", () => {
          watcher.close();
        });
      },
      handleHotUpdate(ctx) {
        
      },
      buildStart() {
        generateServiceTypes(opt?.dts);
      },
    },
  ];
}

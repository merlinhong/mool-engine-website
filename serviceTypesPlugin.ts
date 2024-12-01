import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import type { Plugin } from "vite";
const SERVICE_DIR = path.resolve(__dirname, "src/service");

function generateServiceTypes(_path: string = "service.d.ts") {
  const typesPath = path.resolve(__dirname, _path);
  const serviceFiles = fs
    .readdirSync(SERVICE_DIR)
    .filter((file) => file.endsWith(".ts") && file !== "index.ts")
    .map((file) => file.replace(".ts", ""));

  const moduleTypes = serviceFiles
    .map((module) => `
    ${module}: typeof import("./src/service/${module}")['default'];
    `)
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

export function serviceTypesPlugin(options?: { dts?: string }): Plugin {
  return {
    name: "vite-plugin-service-types",
    configureServer(server) {
      // 监听 service 目录
      const watcher = chokidar.watch(SERVICE_DIR, {
        ignored: /(^|[\/\\])\../, // 忽略隐藏文件
        persistent: true,
        depth: 1,
      });

      // 监听文件变化
      watcher
        .on("add", () => generateServiceTypes(options?.dts))
        .on("unlink", () => generateServiceTypes(options?.dts));

      // 服务器关闭时关闭监听器
      server.httpServer?.on("close", () => {
        watcher.close();
      });
    },
    buildStart() {
      generateServiceTypes(options?.dts);
    },
  };
}
// 可以在构建或开发时调用此函数

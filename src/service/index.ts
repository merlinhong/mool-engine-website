import ApiService, { type IConfig, IRootKeys, IUrlConfig, createServiceWithModules } from "@/mool/utils/request";
// 自定义配置
const config = {
  env: import.meta.env,
  default: "VITE_APP_BASE_API",
} as const satisfies IConfig<ImportMetaEnv>;


export type IApiConfig = IUrlConfig<IRootKeys<typeof config>>;

// 创建服务实例并直接应用类型
export const service = createServiceWithModules(new ApiService(config));

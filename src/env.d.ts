/// <reference types="vite/client" />

declare module "mockjs";

interface ImportMetaEnv {
  VITE_APP_BASE_API: string;
  VITE_APP_BASE_API_BASE: string;

}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.vue" {
  import type { DefineComponent, GlobalComponents } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare namespace JSX {
  interface IntrinsicElements extends GlobalComponents {
    [ElemName: string]: any;
  }
}




declare global {
  function $t(key: string): string;
}

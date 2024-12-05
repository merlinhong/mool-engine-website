import type { IApiConfig } from ".";
export default {
  list: {
    url: "/v1/list/query",
    root: "VITE_APP_BASE_API_BASE",
    data: {} as { name?: string },
  },
  add: {
    url: "/v1/add",
    root: "VITE_APP_BASE_API_BASE",
    data: {} as { uuid: string },
  },
  export:{
    url:'/v1/export',
    type:'get',
    contentType:'application/x-www-form-urlencoded',
    root:'VITE_APP_BASE_API_BASE',
    data:{}as {ids:string;querys:string}
  }
} satisfies IApiConfig;

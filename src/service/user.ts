import type { IApiConfig } from "./";


export default {
  login: {
    url: "/api/user/login",
    type: "post",
    data: {} as {
      username: string;
      password: string;
    },
  },
  logout: {
    url: "/api/user/logout",
    data: {} as Record<string, never>,
  },
} satisfies IApiConfig; 
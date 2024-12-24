import type { IApiConfig } from "./";
import Mock from "mockjs";


export default {
  login: {
    url: "/api/user/login2",
    data: {} as {
      username: string;
      password: string;
    },
    mock:{
      response: () => {
        return Mock.mock({
          data: {
            "result|50": [
              {
                bizName: "@integer(3,100)",
                auditTime: /170\d{10}/,
                fff:5555,
                createUser: "@boolean",
                "auditStatus|1": [0, 1, 2, 3],
              },
            ],
          },
        });
      },
    }
  },
  logout: {
    url: "/api/user/logout",
    data: {} as Record<string, never>,
  },
} satisfies IApiConfig; 
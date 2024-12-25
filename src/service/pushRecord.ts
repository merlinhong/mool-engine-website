import type { IApiConfig } from ".";
import Mock from "mockjs";

export default {
  list: {
    url: "/v1/query/333",
    data: {} as { name?: string },
    mock: {
      response:'222',
      rawResponse: async (req, res) => {
        let reqbody = "";
        await new Promise((resolve) => {
          setTimeout(() => {
            req.on("data", (chunk) => {
              reqbody += chunk;
            });
            req.on("end", () => resolve(undefined));
          }, 5000);
        });
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(
          JSON.stringify({
            code: 200,
            message: "success",
            data: Mock.mock({
              "result|45": [
                {
                  bizName: "@integer(3,100)",
                  auditTime: /170\d{10}/,
                  fff: 55556 ,
                  createUser: "@boolean",
                  "auditStatus|1": [0, 1, 2, 3],
                },
              ],
            }),
          }),
        );
      },
    },
  },
  add: {
    url: "/v1/add",
    data: {} as { uuid: string },
    mock:{
      rawResponse(req, res) {
        
      },
    }
  },
  export: {
    url: "/v1/export",
    type: "get",
    contentType: "application/x-www-form-urlencoded",
    data: {} as { ids: string; querys: string },
  },
} satisfies IApiConfig;

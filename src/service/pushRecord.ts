import type { IApiConfig } from ".";
import Mock from "mockjs";

export default {
  list: {
    url: "/v1/list/query",
    data: {} as { name?: string },
    mock: {
      response: () => {
        return Mock.mock({
          code: 0,
          desc: "success",
          data: {
            pageVo: {
              curPage: 2,
              lang: "en",
              pageSize: 10,
              totalRows: 100,
            },
            "result|10": [
              {
                bizType: "@word(10,14)",
                productId: /^1[0-9]{10}$/,
                bizName: "@integer(3,100)",
                createTime: /170\d{10}/,
                auditTime: /170\d{10}/,
                createUser: "@boolean",
                "auditStatus|1": [0, 1, 2, 3],
              },
            ],
          },
        });
      },
      //   rawResponse: async (req, res) => {
      //     let reqbody = "";
      //     await new Promise((resolve) => {
      //       req.on("data", (chunk) => {
      //         reqbody += chunk;
      //       });
      //       req.on("end", () => resolve(undefined));
      //     });
      //     res.setHeader("Content-Type", "application/json");
      //     res.statusCode = 200;
      //     res.end(
      //       JSON.stringify({
      //         code: 200,
      //         message: "success",
      //         data: { dd: 1 },
      //       }),
      //     );
      //   },
    },
  },
  add: {
    url: "/v1/add",
    data: {} as { uuid: string },
  },
  export:{
    url:'/v1/export',
    type:'get',
    contentType:'application/x-www-form-urlencoded',
    data:{}as {ids:string;querys:string}
  }
} satisfies IApiConfig;

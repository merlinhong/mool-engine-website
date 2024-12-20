export default {
  search: {
    url: "/mock/audit/search",
    data: {} as any,
    mock:{
      rawResponse: async (req, res) => {
        let reqbody = "";
        await new Promise((resolve) => {
          req.on("data", (chunk) => {
            reqbody += chunk;
          });
          req.on("end", () => resolve(undefined));
        });
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(
          JSON.stringify({
            code: 200,
            message: "success",
            data: { dd: 1 },
          }),
        );
      },
    },
    
  },
};

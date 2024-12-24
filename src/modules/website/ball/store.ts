import { ElMessageBox } from "element-plus";
import { FormaData } from "./type";
// 定义一个类来管理状态
export const AuditStore = class {
  public formData = ref<FormaData>({
    bizType: "",
    bizName: "",
    auditStartTime: "",
    auditEndTime: "",
    auditStatus: ["0"],
    createUser: "",
    createStartTime: "222",
    createEndTime: "",
    auditor: "",
  });

  public initData = { ...this.formData.value } as FormaData;

  public tableData = ref<any[]>([]);

  private searchParams = ref<DEFAULTSETTING>({
    url: "/audit/v1/list",
    data: {},
  });
  constructor() {}

  /**
   * 新增
   */
  increment = () => {
    console.log(this);
  };

  /**
   * 重置表单
   */
  reset = () => {
    Object.assign(this.formData.value, this.initData);
    console.log(this.formData.value);
    service.cancel("请求取消", () => {
      return ElMessageBox.confirm("确定取消请求吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
    });
  };
  /**
   * 查询方法
   * @param option 分页参数
   * @param data
   */
  onSearch = (option: { [key in "pageSize" | "currentPage"]+?: number } | null = null, data = this.formData.value) => {
    const { format, ...params } = this.searchParams.value;
    params.data = {
      ...Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== "")),
    };
    service.pushRecord.list(params.data).then((res) => {
      console.log(res);
      this.tableData.value = format ? format(res) : res.data.result;
    });
    // axios.get('/mock/api/getStatusList').then(res=>console.log(res))
  };
};

// 定义表单数据类型
interface FormaData {
  bizType: string;
  bizName: string;
  auditStatus: string[];
  createUser: string;
  createStartTime: string;
  createEndTime: string;
  auditor: string;
  auditStartTime: string;
  auditEndTime: string;
}
// 定义一个类来管理状态
export class AuditStore {
  public formData: Ref<FormaData> = ref({
    bizType: "",
    bizName: "",
    auditStartTime: "",
    auditEndTime: "",
    auditStatus: ["0"],
    createUser: "",
    createStartTime: "",
    createEndTime: "",
    auditor: "",
  });

  public initData: FormaData = { ...this.formData.value };

  public tableData: any[] = [];

  private searchParams: Ref<DEFAULTSETTING> = ref({
    url: "/audit/v1/list",
    data: {},
  });
  constructor() {}

  increment = () => {
    console.log(this);
  };

  /**
   * 重置表单
   */
  reset = () => {
    service.api.codeItem({ id: "1" });
    Object.assign(this.formData.value, this.initData);
    console.log(this.formData.value);
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
    service.audit.search(params.data).then((res) => {
      this.tableData = format ? format(res) : res.data.rows;
    });
  };
}

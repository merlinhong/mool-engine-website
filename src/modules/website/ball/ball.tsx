import { AuditStore } from "./store";
import {
  ElForm,
  ElTable,
  ElFormItem,
  ElSelect,
  ElOption,
  ElInput,
  ElDatePicker,
  ElButton,
  ElTableColumn,
  ElPagination,
  ElMessage,
} from "element-plus";
import { state } from "./data";

export default defineComponent({
  setup(props, ctx) {
    // 定义表格引用
    const tableRef = ref<InstanceType<typeof ElTable> | null>(null);
    const store = new AuditStore(); // 实例化状态类
    const formData = store.formData;
    useEffect(() => {
    }, [formData.value.auditor]);
    return () => (
      <>
        <div style={{ backgroundColor: "#f1f1f1" }}>
          <div
            style={{
              padding: "5px",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
              alignItems: "baseline",
              background: "#fff",
            }}
          >
            <ElForm
              labelPosition="right"
              labelWidth="80px"
              style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
            >
              <ElFormItem label="审核状态">
                <ElSelect
                  clearable
                  multiple
                  collapseTags
                  collapseTagsTooltip
                  filterable
                  v-model={formData.value.auditStatus}
                >
                  {state.statusItem.map((item, index) => (
                    <ElOption key={index} label={item.label} value={item.value} />
                  ))}
                </ElSelect>
              </ElFormItem>
              <ElFormItem label="提交人" style={{ width: "fit-content", height: "fit-content" }}>
                <ElInput
                  style={{ width: "fit-content" }}
                  clearable
                  v-model={formData.value.createUser}
                  placeholder="请输入"
                />
              </ElFormItem>
              <ElFormItem label="审核人" style={{ width: "fit-content", height: "fit-content" }}>
                <ElInput
                  style={{ width: "fit-content" }}
                  clearable
                  v-model={formData.value.auditor}
                  placeholder="请输入"
                />
              </ElFormItem>
              <div style={{ backgroundColor: "#fff", display: "flex", marginLeft: "40px" }}>
                <ElButton
                  style={{ display: "flex", flexDirection: "row", width: "fit-content" }}
                  type="primary"
                  onClick={() => store.onSearch({ currentPage: 1 })}
                >
                  搜索
                </ElButton>
                <ElButton
                  style={{ display: "flex", flexDirection: "row", width: "fit-content", marginLeft: "10px" }}
                  type="primary"
                  onClick={store.reset}
                >
                  重置
                </ElButton>
              </div>
            </ElForm>
          </div>
          <div style={{ padding: "5px", backgroundColor: "#fff" }}>
            <div
              style={{
                padding: "5px",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span style={{ width: "fit-content", color: "#000", fontSize: "16px" }} className="table_title">
                审核列表
              </span>
            </div>
            <ElTable
              v-loading={state.loading}
              ref={tableRef}
              headerCellStyle={{ background: "#f5f6f7", color: "rgba(0,0,0,.7)" }}
              data={store.tableData.value}
              border
            >
              {state.columns?.map((item, index) => (
                <ElTableColumn key={index} label={item.title} prop={item.dataIndex} {...item}
                  v-slots={
                    {
                      'slot-scope': (scope) => {
                        {
                          item.render ? (
                            <item.render index={scope.$index} scope={scope} rowData={scope.row[item.dataIndex]} item={item} />
                          ) : (
                          item.codeItem && item.dataIndex && item.codeItem[scope.row[item.dataIndex]]
                        )
                        }
                      }
                    }
                  }
                >
                </ElTableColumn>
              ))}
            </ElTable>

          </div>
        </div>
      </>
    )
  },
}
)

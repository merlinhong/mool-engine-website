import { type SearchTableColumn, SearchParams, Pagination } from "./type";
const router = useRouter();
const statusItems = {
    0: "审核中",
    1: "审核通过",
    2: "审核不通过",
    3: "已撤回",
};

export const state = reactive<{ columns?: SearchTableColumn[];[key: string]: any }>({
    loading: true,
    statusItem: Object.entries(statusItems).map((item) => ({ label: item[1], value: item[0] })),
    columns: [
        {
            title: "序号",
            dataIndex: " ",
            width: "80",
            align: "center",
            type: "index",
        },
        {
            title: "审核来源",
            dataIndex: "bizType",
            align: "center",
            codeItem: {
                1: "策略",
                2: "任务",
            },
        },
        {
            title: "审核名称",
            dataIndex: "bizName",
            align: "center",
        },
        {
            title: "审核状态",
            dataIndex: "auditStatus",
            align: "center",
            codeItem: statusItems,
        },
        {
            title: "提交人",
            dataIndex: "createUser",
            align: "center",
        },
        {
            title: "提交时间",
            dataIndex: "createTime",
            align: "center",
        },
        {
            title: "审核人",
            dataIndex: "auditor",
            align: "center",
        },
        {
            title: "审核时间",
            dataIndex: "auditTime",
            align: "center",
        },
        {
            title: "操作",
            dataIndex: "opt",
            width: "160",
            align: "center",
            render: (index, data, cellValue, col) => {
                return (
                    <div>
                        <el-button
                            class=""
                            type="primary"
                            text
                            color=""
                            onClick={() => {
                                const opt: Record<number, string> = {
                                    1: "./StrategyReview",
                                    2: "./pushTaskManager/auditTask",
                                };
                                router.push({
                                    path: opt[data.row.bizType],
                                    query: {
                                        flowNo: data.row.flowNo,
                                        isView: 1,
                                    },
                                });
                            }}
                        >
                            查看
                        </el-button>
                        <el-button
                            disabled={data.row.auditStatus != 0}
                            class=""
                            type="primary"
                            text
                            color=""
                            onClick={() => {
                                const opt: Record<number, string> = {
                                    1: "./StrategyReview",
                                    2: "./pushTaskManager/auditTask",
                                };
                                router.push({
                                    path: opt[data.row.bizType],
                                    query: {
                                        flowNo: data.row.flowNo,
                                    },
                                });
                            }}
                        >
                            审核
                        </el-button>
                    </div>
                );
            },
        },
    ],
});
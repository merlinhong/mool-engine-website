import axios, { AxiosRequestConfig } from "axios";

import type { RowProps, ColProps, FormItemRule, TableColumnInstance, PaginationProps, TableProps } from "element-plus";

import type { VNode, CSSProperties } from "vue";

interface DisplayRule {
  /**当前表单项显隐关联的字段值 */

  relate?:
    | {
        key: string;

        /**若该表单值为给定值，当前表单即显示，否则隐藏 */

        value: any;
      }[]
    | {
        key: string;

        /**若该表单值为给定值，当前表单即显示，否则隐藏 */

        value: any;
      };

  /**当前表单项的显隐规则，true显示false隐藏，与v-if同理 */

  rule?: boolean;

  /**切换是否置空上一次的表单值 */

  isEmpty?: boolean; //
}

// type Format<T> = {

// isModel?: boolean;

// props?: string;

// renderValue: (data: T, index?: number) => unknown;

// };

export type Page = {
  state: Record<string, any>;

  ref: Record<string, any>;

  css: string;

  lifeCycles: Record<string, { type: string; value: string }>;

  methods: Record<string, { type: string; value: string }>;

  componentName: string;

  popup: Col[];

  // css: "body {\r\n background-color:#eef0f5 ;\r\n margin-bottom: 80px;\r\n}",

  props: Record<string, any>;

  children: Col[];

  id: string;
};

type RemoveReadOnly<T> = {
  -readonly [P in keyof T]?: T[P];
};

export type RowScope = { row: any; column: any; $index: number };

export interface SearchTableColumn extends Partial<TableColumnInstance["$props"]> {
  title?: string;

  dataIndex?: string;

  show?: (index: number) => boolean;

  codeItem?: {
    [key: string | number]: string;
  };

  key?: string;

  render?: {
    type: string;

    value: string;
    schema?: Page;
  };
}

export interface Col<T = any> extends RemoveReadOnly<ColProps> {
  display?: DisplayRule;

  // div标签的子文本节点以及el-button的子文本节点
  label?: string;

  // 控制表格是否分页

  pager?: boolean;

  /**表单项提示 */

  tooltip?: (col: Col) => VNode;

  /**表单项中输入控件的绑定变量引用*/

  key?: string;

  /**父级key值 */

  pkey?: string;

  // 多标签页当前激活的索引
  active?: number;

  /** 组件名称 */

  componentName?: ComponentType;

  // 表格的分页器配置

  pagerConfig?: { order: number | null; value: Pagination };

  // 表格或者带有选项数据组件的请求入参对象，比如选择器，单选框，多选框

  fetchData?: {
    order: number | null;

    params: Partial<AxiosRequestConfig> & { format?: <T>(arg: T) => any };
  };

  /**触发表单验证的规则数组,绑定在el-form上的 */

  rules?: FormItemRule[];

  /**当前表单项el-form-item的labelWidth */

  labelWidth?: string;

  /**当前表单右侧按钮，字段相同 */

  append?: Col[];

  /**渲染表单内容 */

  render?: Render<T>;

  // 当前组件的子元素，属性与当前组件相同

  children?: Col[];

  // 控制当前组件是否显示

  condition?: { type: string; value: string };

  // 当前组件的循环绑定变量，v-for绑定的遍历数组

  loop?: { type: string; value: string };

  // 当前循环和索引的名称，默认item,index

  loopArgs?: string[];

  // 当前组件的唯一标识

  id?: string;

  // 当前组件的绑定属性集合

  props: {
    // 每一个组件的样式属性，用来编辑组件样式,可以为空对象，CSSProperties类型，比如{color: 'red'}，组件名采用小驼峰命名
    style?: Record<string, string>;

    // 控件的占位字段，生成表单时必生成，比如el-input的placeholder属性，不要在没有这个属性的组件上设置这个字段
    placeholder?: string;

    // el-form-item特有的prop属性，用于表单的校验，当前表单项绑定的变量名，比如name，不要在其他组件的props中设置这个字段
    prop?: string;

    // el-form-item特有的labelWidth属性，用于表单的label宽度，不要在没有这个属性的组件上设置这个字段，
    labelWidth?: string;

    // el-form-item特有的label属性，用于表单的label显示，不要在其他组件的props中设置这个字段
    label?: string;

    //el-form特有的rules属性，用于表单验证，格式为FormItemRule[],不要在没有这个属性的组件上设置这个字段，
    rules?: FormItemRule[];

    // 表格列集合
    columns?: SearchTableColumn[];

    // 控件类型，比如password,text,number等
    type?: string;

    // 组件的v-model属性绑定的变量配置
    value?:
      | {
          // 默认为JSExpression，也就是JS表达式的意思

          type: string;

          // 绑定的变量名称

          value: string;

          model: {
            // v-model的绑定属性名，默认为modelValue

            prop: string;
          };
        }
      | string;

    // 组件的绑定事件属性配置,on后面跟事件名,小驼峰命名,这里以点击事件为例

    onClick?: {
      // 默认为JSExpression，也就是JS表达式的意思

      type: string;

      // 绑定的事件函数名

      value: string;
    };
  } & Record<string, any>;
}

type CreateMutable<Type> = {
  -readonly [Property in keyof Type]+?: Type[Property];
};

export interface Pagination extends CreateMutable<PaginationProps> {
  params: Partial<Record<"currentPage" | "pageSize", [string, number]>>;
}

export type ComponentType =
  | "div"
  | "ElInput"
  | "Text"
  | "ElDatePicker"
  | "ElCheckBox"
  | "ElRadio"
  | "ElButton"
  | "ElSelect"
  | "TextArea"
  | "ElTable"
  | "ElTags"
  | "ElBreadCrumb"
  | "ElForm"
  | "ElFormItem"
  | "ElCard"
  | "ElDivider"
  | "ElSteps"
  | "ElIcon"
  | "ElCol"
  | "ElRow"
  | "ElMenu"
  | "ElCarousel"
  | "ElPageHeader"
  | "ElImage"
  | "ElDialog";

export type Render<T = any, K = Col> = (
  data: T,

  col?: K,

  child?: VNode,

  lowcode?: { editBtn: boolean; disabled: boolean },
) => VNode;

export interface SearchData<T = Record<string, any>[], K = any> {
  data?: Record<string, any> | T;

  format?: (args: { data: T } & ApiResponse) => K[];
}

export interface Row<T = Col> extends RemoveReadOnly<RowProps> {
  /**

  


* @interface Col<T=any>

  


* @extends {Partial<ColProps>}

  


* @property {DisplayRule} [display] - 显隐规则字段

  


* @property {boolean} [required] - 是否是提交表单的入参字段

  


* @property {string} [label] - 表单项的名称

  


* @property {string} [key] - 表单项的绑定值 key

  


* @property {string} [pkey] - 父级 key 值

  


* @property {any} [value] - 表单项的默认值

  


* @property {CSSProperties} [style] - CSS 样式规则

  


* @property {FormItemRule[]} [rules] - 触发表单验证的规则数组

  


* @property {Format<T>} [format] - 表单数据格式化

  
  


* @property {Col } [rightBtn] - 当前表单右侧按钮，字段相同

  


* @property {string} [rightBtn.key] - 按钮的 key

  


* @property {number} [rightBtn.span] - 按钮的宽度

  


* @property {CSSProperties} [rightBtn.style] - 按钮的样式规则

  


* @property {Render<T>} [rightBtn.render] - 渲染函数或字符串，接受数据，返回 VNode

  


*/

  col?: T[];

  /** 当前行类名 */

  class?: string | string[];

  /**表单标签对齐方式 */

  position?: "left" | "right" | "top";

  /**全局标签宽度 */

  labelWidth?: number;

  /** 当前行样式 */

  style?: CSSProperties;

  /** 事件类型 */

  eventType?: "click" | "doubleClick" | "rightClick";

  /** 当前行数据索引 */

  index?: number;

  /** 当前行插槽 */

  slot?: string | (() => VNode);

  /**表单数据交互入参对象 */

  formAJaxParams?: AxiosRequestConfig & { format?: <T>(arg: T) => any };

  /**表单 */
}

/**

  


* 表单配置的类型标注

  


*/

export interface BasicFormConfig<T = Col> {
  /**当前行表单所在数据对象的属性名称 */

  index?: string;

  /**操作行 */

  action?: string;

  /** 当前行配置*/

  row: Row<T>;
}

export type FormData = {
  [key: string]: any;
};

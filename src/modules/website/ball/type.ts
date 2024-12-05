import { AxiosRequestConfig } from "axios";
import type { FormInstance, TableColumnInstance, TableProps, PaginationProps } from "element-plus";
export type RowScope = { row: any; column: any; $index: number };
export interface SearchTableColumn extends Partial<TableColumnInstance["$props"]> {
  title?: string;
  dataIndex: string;
  show?: (index: number) => boolean;
  codeItem?: {
    [key: string | number]: string;
  };
  key?: string;
  render?: (index: number, data: RowScope, cellValue?: any,col?:SearchTableColumn) => JSX.IntrinsicElements;
}
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]+?: Type[Property];
};
export interface Pagination extends CreateMutable<PaginationProps> {
  params: Partial<Record<"currentPage" | "pageSize", [string, number]>>;
}
export interface SearchParams<T = Record<string, any>[], K = any> extends AxiosRequestConfig {
  format?: (args: { data: T } & ApiResponse) => K[];
}

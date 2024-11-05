/**
 * @description: 状态码
 */
export enum StateEnum {
  /** 200 请求成功 */
  OK = 200,

  /** 201 创建成功 */
  CREATED = 201,

  /** 204 成功且不反回 body */
  NO_CONTENT = 204,

  /** 400 请求参数错误 */
  INVALID_REQUEST = 400,

  /** 401 未登录 */
  UNAUTHORIZED = 401,

  /** 403 权限不足 */
  FORBIDDEN = 403,

  /** 404 资源不存在或资源不属于该用户 */
  NOT_FOUND = 404,

  /** 500 服务器发生错误，用户将无法判断发出的请求是否成功 */
  INTERNAL_SERVER_ERROR = 500,

  /** 无接口调用权限 */
  NOT_AUTH = 820101,
}

export enum ApiErrorCode {
  SUCCESS = 200, // 成功
  USER_ID_INVALID = 10001, // 用户id无效
  USER_NOTEXIST = 10002, // 用户id无效
  USER_EXIST = 10003, // 用户已存在
  INTERNAL_SERVER_ERROR = 10004, // 服务器内部错误
  PERMISSSION_EXIST = 10005, // 权限字段已存在
  ROLE_EXIST = 10006, // 角色已存在
  Forbidden = 10007 // 权限不足
}

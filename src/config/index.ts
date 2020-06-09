// Ajax统一状态码
export const statusCode = {
  SUCCESS: 1000, // 成功
  NOT_LOGIN: 1001, // 未登录
  TOKEN_EXPIRED: 1002, // TOKEN过期
  INVALID_PARAM: 1003, // 无效参数
  BAD_AUTHORIZED: 1004, // 未授权
  EMPTY_RESULT: 1005, // 结果为空
}

export const projectTitle = 'Vue模板'
export const baseURL = 'https://devohxzht.odrcloud.cn/api/'

// KEYS 用户登录成功之后返回的一些信息
export const KEYS = {
  JWTToken: 'JWTToken',
  RefreshToken: 'RefreshJWTToken',
  UserId: 'UserId',
  UserName: 'UserName',
  userType: 'UserType'
}

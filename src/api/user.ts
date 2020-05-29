import axios from '@/axios'
// 获取用户信息
export const fetchUser = (userId: any, config: any) => axios.get(`/api/user/userId/${userId}`, config)
// 登陆
export const login = (data: any) => axios.post('/auth/login', data)
// 刷新token
export const refreshToken = (data: any) => axios.post('/auth/refreshToken', data)

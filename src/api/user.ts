import axios from '@/axios'

// 登陆
export const login = (data: any) => axios.post('/auth/login', data)
// 刷新token
export const refreshToken = (data: any) => axios.post('/auth/refreshToken', data)

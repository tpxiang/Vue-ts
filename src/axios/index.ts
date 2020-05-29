import Vue from 'Vue'
import axios from 'axios'
import router from '@/router/index'
import { baseURL, statusCode, KEYS } from '@/config'
import { getStorageItem, setStorageItem, removeStorageItem } from '@/utils/utils'
import { refreshToken } from '@/api/user'

// 创建实例
const instance = axios.create({
    baseURL,
    timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use((conf: any) => {
    // 在响应中添加token
    const token: any = getStorageItem(KEYS.JWTToken)
    if (token) {
        conf.headers.JWTToken = token
    }
    return conf
}, (err: any) => {
    // 调用element-ui提示错误
    Vue.prototype.$message.error(err)
    Promise.reject(err)
})

const duration: any = 2000
const responseHandlers = {
    // 未登录,提示duration跳转登陆
    [statusCode.NOT_LOGIN]: (res: any) => {
        // 如果当前页面不是登陆，则跳转到登陆
        if (router.currentRoute.name !== 'login' || router.currentRoute.name !== 'backstageLogin') {
            setTimeout(() => {
                router.push({
                    name: 'login',
                    // query: {
                    //   redirect: router.currentRoute.fullPath
                    // }
                })
            }, duration)
        }
        return Promise.resolve(res)
    },
    // token过期，刷新token，重发请求
    [statusCode.TOKEN_EXPIRED]: async (res: any) => {
        // 保存前一个请求
        const { config }: any = res
        // 用refreshToken去刷新authToken, refreshToken过期时间比authToken长,等待刷新成功后再进行后续操作
        const refreshTokenResponse = await refreshToken({
            refreshToken: getStorageItem(KEYS.RefreshToken)
        })
        const { code, data = {} }: any = refreshTokenResponse
        const message: any = '登录过期，请重新登录'
        // token刷新成功，更新本地authToken和refreshToken
        if (code === statusCode.SUCCESS) {
            const { authToken, refreshTokens }: any = data
            setStorageItem(KEYS.JWTToken, authToken)
            setStorageItem(KEYS.RefreshToken, refreshTokens)
            // 用新的authToken重新请求
            config.headers[KEYS.JWTToken] = authToken
            // 这边不需要baseURL是因为会重新请求url,url中已经包含baseURL的部分了,如果不修改成空字符串，会变成'api/api/xxxx'的情况
            config.baseURL = ''
            return instance(config)
        }
        // 刷新失败跳转到登陆重新登陆，登陆成功之后跳转回来
        Vue.prototype.$message({
            message,
            duration,
            type: 'error'
        })
        // 重新登陆
        setTimeout(() => {
            router.push({
                name: 'login',
                // query: {
                //   redirect: router.currentRoute.fullPath
                // }
            })
        }, duration)
        return Promise.reject(res)
    }
}

// 响应拦截器
instance.interceptors.response.use(async (res: any) => {
    // 后续和后端协商响应状态码，添加统一的状态吗响应
    const { code }: any = res.data
    // 松散路由，不进行响应拦截跳转路由
    const { headers: { 'X-Strict-Route': strictRoute } }: any = res.config
    if (strictRoute === 'loose') {
        if (code !== statusCode.SUCCESS) {
            // 移除登陆相关的信息
            removeStorageItem(KEYS.UserId)
            removeStorageItem(KEYS.JWTToken)
            removeStorageItem(KEYS.RefreshToken)
            // 刷新当前页面
            router.replace(router.currentRoute.fullPath)
        }
        return res.data
    }
    if (typeof responseHandlers[code] === 'function') {
        const response: any = await responseHandlers[code].call(null, res)
        return response
    }
    return res.data
}, (err: any) => {
    // router.push({
    //   name: 'error'
    // })
    Promise.reject(err)
})

export default instance

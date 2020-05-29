import apis from '@/api'
import { KEYS, statusCode } from '@/config'
import { setStorageItem } from '@/utils/utils'

const actions = {
  login: async (context: any, payload: any) => {
    // 登陆
    try {
      const res: any = await apis.user.login(payload)
      const { code }: any = res
      if (code === statusCode.SUCCESS) {
        const {
          authToken,
          refreshToken,
          loginInfo: {
            userId
          }
        } = res.data
        // 设置localStorage
        setStorageItem(KEYS.JWTToken, authToken)
        setStorageItem(KEYS.RefreshToken, refreshToken)
        setStorageItem(KEYS.UserId, userId)
      }
      return Promise.resolve(res)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

export default actions

/**
 * 根据key获取localStorage的值
 * @param {string} name localStorage中存储的key
 * @returns { any } 找到就返回，未找到就返回undefined
 */
export const getStorageItem = (name: any) => {
  if (!name) return
  const value = window.localStorage.getItem(name)
  return value && value !== 'undefined' && JSON.parse(value)
}
/**
 * 将value以key为键保存到localStorage中
 * @param { string } name 存储到localStorage的key
 * @param { any } value 存储到localStorage的value
 * @returns { void }
 */
export const setStorageItem = (name: any, value: any) => {
  if (!name) return
  return window.localStorage.setItem(name, JSON.stringify(value))
}
/**
 * 删除localStorage
 * @param {string} name 删除localStorage中对应的key
 */
export const removeStorageItem = (name: any) => {
  if (!name) return
  return window.localStorage.removeItem(name)
}
/**
 * 清空localStorage
 */
export const clearStorage = () => window.localStorage.clear()

/**
 * @param {String} key  属性
 * @param {*} value 值
 */
export const sessionStorageSet = (key: any, value: any) => {
  if (typeof (value) === 'object') value = JSON.stringify(value)
  sessionStorage.setItem(key, value)
}

/**
 * @param {String} key  属性
 */
export const sessionStorageGet = (key: any) => sessionStorage.getItem(key)

/**
 * @param {String} key  属性
 */
export const sessionStorageRemove = (key: any) => {
  sessionStorage.removeItem(key)
}

// 检测浏览器内核
export const getBrowserType = () => {
  if (navigator.userAgent.indexOf('Trident') !== -1) {
    return 'IE'
  } else if (navigator.userAgent.indexOf('Presto') !== -1) {
    return 'OPERA'
  } else if (navigator.userAgent.indexOf('AppleWebKit') !== -1 && navigator.userAgent.indexOf('Chrome') !== -1) {
    return 'WEBKIT'
  } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
    return 'FIREFOX'
  } else if (navigator.userAgent.indexOf('AppleWebKit') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
    return 'SAFARI'
  }
}

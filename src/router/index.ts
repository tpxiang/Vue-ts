import Vue from 'vue'
import Router from 'vue-router'
import { projectTitle, KEYS } from '@/config'
import { getStorageItem } from '@/utils/utils'

Vue.use(Router)

/**
 * hidden: true                   如果hidden为true则在左侧菜单栏展示，否则不显示
 * name:'router-name'             路由名称，必须填写
 * meta : {
    title: 'title'               对应路由在左侧菜单栏的标题名称
    icon: 'icon-class'           对应路由在左侧菜单栏的图标样式，样式使用fontawesome图标库
  }
 **/

export const asyncRouterMap = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  }
]

const router: any = new Router({
  mode: 'hash',
  routes: asyncRouterMap
})

// 路由钩子,导航之前
router.beforeEach(async (to: any, from: any, next: any) => {
  // Loading.service() // 开启页面loging状态
  const userId = getStorageItem(KEYS.UserId)
  // 防止刷新页面之后用户信息丢失
  // next()
  if (to.matched.some((record: any) => record.meta.requireAuth) && !userId) {
    next({
      name: 'login',
    })
  } else {
    next()
  }
})

// 进入路由后设置文档标题
router.afterEach((to: any) => {
  document.title = to.matched.reduce(
    (acc: any, cur: any) => cur.meta.title || acc,
    projectTitle
  )
})

export default router

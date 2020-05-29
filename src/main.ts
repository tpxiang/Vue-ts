import Vue from 'Vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
import ElementUI from 'element-ui'
import './element-variables.scss'
import axios from './axios/index'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

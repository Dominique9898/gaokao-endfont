import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import _request from './utils/request/request'
import '@/styles/index.scss'
import '../src/assets/css/fcicon.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Message } from 'element-ui'

Vue.use(ElementUI)
Vue.prototype.request = _request
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

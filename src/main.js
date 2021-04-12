import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './styles/index.scss'
import store from './store'
import _request from '@/utils/request'

Vue.use(ElementUI)
Vue.prototype.request = _request
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

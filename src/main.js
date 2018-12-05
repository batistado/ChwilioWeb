import Vue from 'vue'
import './plugins/fontawesome'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './plugins/element.js'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(VueChartkick, {adapter: Chart})
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

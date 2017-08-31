import Vue from 'vue'
// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App'

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'))
  // Vue.use(ElementUI)
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  template: '<App/>'
}).$mount('#app')

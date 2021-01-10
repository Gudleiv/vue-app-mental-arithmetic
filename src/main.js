import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as bootstrap from './plugins/bootstrap'

Vue.config.productionTip = false

new Vue({
  router,
  bootstrap,
  store,
  render: (h) => h(App),
}).$mount('#app')

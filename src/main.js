import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import * as bootstrap from './plugins/bootstrap'
import firebase from './firebase'

Vue.config.productionTip = false
Vue.use(Vuelidate)

new Vue({
  router,
  bootstrap,
  store,
  render: (h) => h(App),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      } else {
        this.$store.dispatch('prepareLogin')
      }
    })
  }
}).$mount('#app')

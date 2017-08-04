import Vue from 'vue'
import App from './App.vue'
import routers from './routerConfig.js'
import stores from './store'
import Axios from 'axios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

Vue.prototype.$http = Axios

new Vue({
  el: '#app',
    store:stores,
  router: routers,
  render: h => h(App)
})

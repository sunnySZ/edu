import Vue from 'vue'
import App from './App.vue'
import routers from './routerConfig.js'
import stores from './store'
import Axios from 'axios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint);


Vue.prototype.$http = Axios;



//自定义过滤器导入
import filters from './filters'
//注册过滤器
Object.keys(filters).forEach((v,i)=>{
    Vue.filter(v,filters[v])
});

new Vue({
    el: '#app',
    store: stores,
    router: routers,
    render: h => h(App)
});

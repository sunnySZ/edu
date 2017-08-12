import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Activity from './components/activity.vue'
import Select from './components/select.vue'
import My from './components/my.vue'
import Ticket from './components/ticket.vue'
import Search from './components/search.vue'
import Detail from './components/detail.vue'
import Discover from './components/discover.vue'
import Order from './components/order.vue'

/*const my_routes = [
 {name: 'home', path: '/', component: List},
 {name: 'infinite', path: '/infinite', component: Infinite},
 {name: 'list', path: '/list', component: List},
 {name: 'listDetail', path: '/listDetail', component: ListDetail}
 ]
 export default new VueRouter({
 routes: my_routes //routes:routes 注意当键和值相同时，按照es6语法可以简写成routes,
 })*/

const router = new VueRouter({
  //  scrollBehavior: () => ({y: 0}),
    routes: [
        {path: '*', redirect: '/select'},//默认显示
        {name: 'select', path: '/select', component: Select},
        {name: 'activity', path: '/activity', component: Activity},
        {name: 'ticket', path: '/ticket', component: Ticket},
        {name: 'my', path: '/my', component: My},
        {name: 'search', path: '/search', component: Search},
        {name: 'detail', path: '/detail/:id', component: Detail},
        {name: 'discover', path: '/discover/:type', component: Discover},
        {name: 'order', path: '/order', component: Order}
    ]
})

export default router
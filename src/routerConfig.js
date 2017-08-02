import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Activity from './components/activity.vue'
import Select from './components/select.vue'
import My from './components/my.vue'
import Ticket from './components/ticket.vue'

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
    routes: [
        {name: 'select', path: '/', component: Select},
        {name: 'select', path: '/select', component: Select},
        {name: 'activity', path: '/activity', component: Activity},
        {name: 'ticket', path: '/ticket', component: Ticket},
        {name: 'my', path: '/my', component: My}
    ]
})

export default router
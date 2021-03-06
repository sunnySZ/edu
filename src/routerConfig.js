import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
Vue.use(VueRouter)

import Activity from './components/activity.vue'
import Select from './components/select.vue'
import My from './components/my.vue'
//import Ticket from './components/ticket.vue'
import Search from './components/search.vue'
import Detail from './components/detail.vue'
import Discover from './components/discover.vue'
import Order from './components/order.vue'
import OrderPay from './components/orderPay.vue'
import OrderList from './components/orderList.vue'
import Collect from './components/collect.vue'
import Coupon from './components/coupon.vue'
import Scores from './components/scores.vue'
import CouponSelect from './components/coupon_select.vue'
import Comments from './components/comments.vue'
import MyActivity from './components/myActivity.vue'
import MyActivityInfo from './components/myActivityInfo.vue'
import Age from './components/age.vue'
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
    scrollBehavior: () => ({y: 0}),
    mode: 'hash',
    routes: [
        {path: '*', redirect: '/select/', meta: {title: '精选'}},//默认显示
        {name: 'select', path: '/select/', component: Select, meta: {title: '精选'}},
        {name: 'activity', path: '/activity', component: Activity, meta: {title: '全部'}},
        // {name: 'ticket', path: '/ticket', component: Ticket,meta:{title:'购票'}},
        {name: 'my', path: '/my', component: My, meta: {title: '个人中心', auth: true}},
        {name: 'search', path: '/search', component: Search, meta: {title: '搜索'}},
        {name: 'detail', path: '/detail/:id', component: Detail, meta: {title: '活动详情'}},
        {name: 'discover', path: '/discover/:type', component: Discover, meta: {title: '发现'}},
        {name: 'order', path: '/order', component: Order, meta: {title: '订单确认', auth: true}},
        {name: 'orderPay', path: '/order/orderPay', component: OrderPay, meta: {title: '收银台', auth: true}},
        {name: 'orderList', path: '/orderList', component: OrderList, meta: {title: '订单列表', auth: true}},
        {name: 'collect', path: '/collect', component: Collect, meta: {title: '我的收藏', auth: true}},
        {name: 'coupon', path: '/coupon', component: Coupon, meta: {title: '优惠券', auth: true}},
        {name: 'scores', path: '/scores', component: Scores, meta: {title: '积分', auth: true}},
        {name: 'couponSelect', path: '/coupon_select', component: CouponSelect, meta: {title: '选择优惠券', auth: true}},
        {name: 'comments', path: '/comments', component: Comments, meta: {title: '评价', auth: true}},
        {name: 'myActivity', path: '/myActivity', component: MyActivity, meta: {title: '我的活动', auth: true}},
        {name: 'myActivityInfo', path: '/myActivityInfo', component: MyActivityInfo, meta: {title: '我的活动', auth: true}},
       /* {name: 'age', path: '/age', component: Age, meta: {title: '年龄百宝箱'}}*/
    ]
})

router.beforeEach((to, from, next) => {
    /*if(to.meta.auth&&to.name=='order'){//判断该路由是否需要登录权限
     if(store.state.user_id){//通过vuex state 获取当前uerInfo是否存在
     next()
     }else{
     var url1='/route.html?code=1';  //授权认证后跳转到order界面
     window.location.href='index.jsp?url='+encodeURIComponent(url1)
     }
     }*/
    if (to.meta && to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router
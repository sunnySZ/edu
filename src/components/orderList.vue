<template>
    <div class="orderList_page">
        <mt-navbar v-model="selected" fixed>
            <mt-tab-item id="0">全部</mt-tab-item>
            <mt-tab-item id="1">待付款</mt-tab-item>
            <mt-tab-item id="2">待使用</mt-tab-item>
            <mt-tab-item id="3">待评价</mt-tab-item>
            <mt-tab-item id="4">退款/返利</mt-tab-item>
        </mt-navbar>
        <ul class="list_box">
            <li v-for="item in orderListData">
                <!--  <router-link :to="{ name: 'detail',params: { id: n }}">-->
                <p class="list_item_top">商品订单:222222 <span>未付款</span></p>
                <div class="list_item">
                    <div class="img_box"><img
                            src="http://img.wanfantian.com/uploads/201707/28/81d9b4e9049f785a418ada5287be221d.png">
                    </div>
                    <div class="ticket_msg">
                        <span class="title">{{item.CREATE_TIME}}</span>

                        <p>兑换方式：</p></div>
                </div>
                <div class="list_item_btm">数量:1 实付:{{item.PAY_TOTAL}}
                    <mt-button size="small">取消订单</mt-button>
                    <mt-button type="primary" size="small" @click.native="payOrder(n)">去支付</mt-button>
                </div>
                <!-- </router-link>-->
            </li>
        </ul>
        <p v-show="isLoading" class="loading">
            <mt-spinner type="fading-circle"></mt-spinner>
        </p>
        <div class="get_more" @click="getMoreOrders" v-show="isMore">点击查看更多</div>
        <p v-show="nodata" class="no_data">暂无数据!</p>
        <Foot></Foot>
    </div>
</template>
<script>
    import Foot from './footer.vue'
    export default{
        data(){
            return {
                selected: this.$store.state.order_cur, //默认选中,必须是字符串
                nodata: false,
                isLoading: false,
                isMore: false,
                orderListData: [],
                params: {
                    curPage: 1,
                    pageSize: 5,
                    orderType: '1'//订单类型状态
                }
            }
        },
        created(){
            let curVal = this.$store.state.order_cur
            this.getData(curVal)
        },
        watch: {
            selected(curVal, oldVal){
                this.$store.dispatch('ordercur', curVal)
                this.params.orderType = curVal
                //初始化数据
                this.orderListData = [];
                this.nodata = false;
                this.getData(curVal)
            }
        },
        methods: {
            payOrder(n){  //n是订单id
                this.$store.dispatch('setorderid', n)
                //跳转到订单支付
                this.$router.push({
                    path: '/order/orderPay'
                })
            },
            getData(curVal){
                this.$indicator.open();
                // yjt/shoporders/pageOrderList/页码-每页条数-订单状态 ，0--全部,1--待付款,2--待使用,3--待评价,4--退款/返利
                let url = 'yjt/shoporders/pageOrderList/1-5-' + curVal;//this.params.orderType;
                this.$http.get(url).then((res) => {
                    if (res.data.code == '200') {  //返回成功
                        if (res.data.result.list.length > 0) {  //有数据
                            this.orderListData = res.data.list;
                            if (res.data.pageNumber > 1) {  //判断订单列表是否显示点击查看更多
                                this.params.isMore = true;
                            }
                        } else { //显示暂无数据
                            this.nodata = true;
                        }
                    } else { //返回失败
                        this.$toast('数据返回失败')
                    }
                    this.$indicator.close();
                }).catch((err) => {
                    this.$toast('订单列表' + err)
                    this.$indicator.close();
                });
            },
            getMoreOrders() { //加载更多订单
                this.isLoading = true;
                this.params.curPage += 1;
                let url = 'yjt/shoporders/pageOrderList/' + this.params.curPage + '-' + this.params.pageSize + '-' + this.params.orderType;
                this.$http.get(url).then((res) => {
                    if (res.data.code == '200') {  //返回成功
                        this.isLoading = false;
                        if (this.params.curPage >= res.data.totalPage) {
                            this.isMore = false;
                            this.$toast('已全部加载完毕')
                        }
                        this.orderListData = this.orderListData.concat(res.data.result.list)
                    } else { //返回失败
                        this.$toast('数据返回失败')
                    }
                }).catch((err) => {
                    this.isLoading = false;
                    this.$toast('订单列表' + err)
                });
            },
        },
        components: {
            Foot
        }
    }
</script>
<style lang="less">
    .orderList_page {
        margin-top: 55px;
        margin-bottom: 65px;
        .mint-navbar.is-fixed {
            z-index: 3000;
        }

        .list_item_top {
            padding-bottom: 1rem;
            color: #000000;
        }
        .list_item_top span {
            float: right;
            color: orange;
        }
        .list_item_btm {

        }
        .mint-button--small {
            margin-left: 1.5rem;
        }
    }


</style>
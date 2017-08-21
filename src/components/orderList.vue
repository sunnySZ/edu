<template>
    <div class="orderList_page">
        <mt-navbar v-model="selected" fixed>
            <mt-tab-item id="0">全部</mt-tab-item>
            <mt-tab-item id="1">待付款</mt-tab-item>
            <mt-tab-item id="2">已付款</mt-tab-item>
            <mt-tab-item id="3">退款</mt-tab-item>
            <mt-tab-item id="4">已完成</mt-tab-item>
        </mt-navbar>
        <ul class="list_box">
            <li v-for="item in orderListData">
                <!--  <router-link :to="{ name: 'detail',params: { id: n }}">-->
                <div class="list_item_top">订单编号：{{item.ORDER_ID}}</div>
                <div class="list_item">
                    <div class="img_box"><img :src="item.S_PIC"></div>
                    <div class="ticket_msg">
                        <span class="title">{{item.GOODS_NAME}}</span>
                        <p>下单时间：{{item.CREATE_TIME}}</p>
                        <p>有效期至：</p>
                    </div>
                </div>
                <div class="list_item_btm">
                    <div class="left"> 数量:{{item.COUNT}} 实付:{{item.ACTUAL_PAY_TOTAL}}</div>
                    <div class="right" v-if="item.STATE==='1'">
                        <mt-button size="small" @click.native="deleteOrder(item.ORDER_ID)">删除订单</mt-button>
                        <mt-button type="primary" size="small" @click.native="payOrder(item.ORDER_ID)">去支付</mt-button>
                    </div>
                    <div class="right" v-else-if="item.STATE==='2'">
                        <mt-button size="small" @click.native="cancelOrder(item.ORDER_ID)">取消订单</mt-button>
                    </div>
                    <div class="right" v-else-if="item.STATE==='3'">
                        已经申请待审核
                    </div>
                    <div class="right" v-else-if="item.STATE==='4'">
                        审核已通过等待退款
                    </div>
                    <div class="right" v-else-if="item.STATE==='5'">
                        <mt-button type="primary" size="small" @click.native="commentOrder(item.ORDER_ID)">去评论
                        </mt-button>
                    </div>
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
            cancelOrder(n){ //取消订单

            },
            deleteOrder(n){ //删除订单

            },
            commentOrder(){ //评论订单

            },
            getData(curVal){
                this.$indicator.open();
                this.isMore = false;
                // yjt/shoporders/pageOrderList/页码-每页条数-订单状态 ，0--全部,1--待付款,2--待使用,3--待评价,4--退款/返利
                let url = 'yjt/shoporders/pageOrderList/1-5-' + curVal;//this.params.orderType;
                this.$http.get(url).then((res) => {
                    if (res.data.code == '200') {  //返回成功
                        let lists = res.data.result.list;
                        let totalPage = res.data.result.totalPage;
                        if (lists.length > 0) {  //有数据
                            this.orderListData = lists;
                            if (totalPage > 1) {  //判断订单列表是否显示点击查看更多
                                this.isMore = true;
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
                        let lists = res.data.result.list;
                        let totalPage = res.data.result.totalPage;
                        if (this.params.curPage >= totalPage) {
                            this.isMore = false;
                            this.$toast('已全部加载完毕')
                        }
                        this.orderListData = this.orderListData.concat(lists)
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
            position: relative;
            height: 3.6rem;
            line-height: 3.6rem;
            font-size: 1.2rem;
            color: #000000;
        }
        .list_item_btm .left {
            position: absolute;
            left: 0;
            top: 0;
        }
        .list_item_btm .right {
            position: absolute;
            right: 0;
            top: 0;
        }
        .mint-button--small {
            margin-left: 1.5rem;
        }
    }


</style>
<template>
    <div class="orderList_page">
        <mt-navbar v-model="selected" fixed>
            <mt-tab-item id="1">全部</mt-tab-item>
            <mt-tab-item id="2">待付款</mt-tab-item>
            <mt-tab-item id="3">待使用</mt-tab-item>
            <mt-tab-item id="4">待点评</mt-tab-item>
            <mt-tab-item id="5">退款/返利</mt-tab-item>
        </mt-navbar>





        <ul class="list_box">
            <li v-for="n in 3">
                <router-link :to="{ name: 'detail',params: { id: n }}">
                   <p class="list_item_top">商品订单:222222 <span>未付款</span></p>
                   <div class="list_item">
                       <div class="img_box"><img src="http://img.wanfantian.com/uploads/201707/28/81d9b4e9049f785a418ada5287be221d.png"></div>
                       <div class="ticket_msg">
                           <span class="title">预售--乌克兰幽默小丑马戏团“欢乐小丑嘉年华</span>
                    
                           <p>兑换方式：</p></div>
                   </div>
                   <div class="list_item_btm">数量:1 实付:￥1200
                    <mt-button size="small">取消订单</mt-button>
                     <mt-button type="primary" size="small">去支付</mt-button>
                    </div>
                   
                </router-link>
            </li>
        </ul>

        <Foot></Foot>
    </div>
</template>
<script>
    import Foot from './footer.vue'
    export default{
        data(){
            return {
                selected: '1',//默认tab1高亮
        
            }
        },
        watch: {
          
            selected(curVal, oldVal){
                console.log(curVal)
               // this.$router.push({path: '/' + curVal})
            }
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

    .list_item_top{ padding-bottom:1rem; color:#000000;}
    .list_item_top span{ float:right; color:orange;}


    .list_box li{ display: block; padding: 1rem;border-bottom: 1px solid #e5e5e5; margin-bottom:1rem; background-color:white;  }
    .list_box li a{color: #bbbbbb;}
    .list_item{ display: flex; }
    .img_box{ flex:1;}
    .img_box img{ width: 100%;}
    .ticket_msg{ flex:4; padding-left: 1rem;}
    .ticket_msg .title{ font-size: 1.4rem; color:#000000;}
    .ticket_msg p{ line-height: 1.4rem;}
    }
</style>
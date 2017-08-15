<template>
    <div class="orderPay_page">
        <h2>凯德西城丨撒浪嘿哟，玩味CP大比拼</h2>
        <div class="order_item">
            <mt-cell title="出行时间：" value="2017-08-19"></mt-cell>
            <mt-cell title="商品名称：" value="海南7日亲子游"></mt-cell>
        </div>
        <div class="order_item">
            <mt-cell title="现金优惠券"></mt-cell>
            <mt-cell title="选择兑换现金优惠券" is-link></mt-cell>
        </div>

        <div class="order_item">
            <mt-cell title="支付方式"></mt-cell>
            <mt-cell title="微信支付"></mt-cell>
        </div>
    
        <ul class="footer_order">
            <li>
                总价:<span>￥0.1</span>
            </li>
            <li class="buy">去支付</li>
        </ul>

    </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
    import {MessageBox} from 'mint-ui';
    export default{
        data(){
            return {
                id: null,
                price:120,
                data:[]
            }
        },
        created(){
            //this.getData();
        },
        computed:mapGetters(['getNum']),
        methods:mapActions(['increment','decrement'])
       /* methods: {
            openAlert(msg) {
                MessageBox({
                    title: '注意事项',
                    message: msg,
                    confirmButtonText: '关闭'
                });
            },

        }*/
    }
</script>
<style lang="less">
    .orderPay_page {
       
    }
</style>
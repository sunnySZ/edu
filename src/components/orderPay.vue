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
            <li class="buy" @click="payOrder">去支付</li>
        </ul>

    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import {MessageBox} from 'mint-ui';
    export default{
        data(){
            return {
            }
        },
        methods: {
            callPay(jsonStr){
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', this.jsApiCall);
                        document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
                    }
                } else {
                    this.jsApiCall(jsonStr);
                }
            },
            jsApiCall(jsonStr){
                var _this=this;
                //微信H5支付API---https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_7&index=6
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', jsonStr,
                    function (res) {
                       /* _this.$router.push({
                            path: '/orderList'
                        })
                        alert('支付开始')*/
                        alert(res.err_msg)
                      //  if(/:ok$/i.test(res.err_msg)){
                       if (res.err_msg == "get_brand_wcpay_request:ok") {
                         //  alert('支付成功')
                            //跳转到订单支付成功后跳订单列表
                            _this.$router.push({
                                path: '/orderList'
                            })
                        } else {
                        //   alert('支付失败')
                        }
                    }
                )
            },
            payOrder(){
                let url = encodeURIComponent("/index.html");
                let qs = require('qs');
                let ordidstr = this.$store.state.order_id;   //Math.random().toString(36).substr(2);//随机订单号测试用
                this.$http.post('yjt/weixin/weixinprepay',
                    qs.stringify({"order_id": ordidstr, "url": url})).then((res) => {
                    let jsonStr = res.data.result; //拿到支付订单信息调微信支付接口
                    this.callPay(jsonStr)
                }).catch((err) => {
                    this.$toast(err)
                })
            }
        }
    }
</script>
<style lang="less">
    .orderPay_page {
        h2 {
            font-size: 1.6rem;
            padding: 1rem;
            background-color: white;
        }
    }
</style>
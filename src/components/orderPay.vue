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
import {mapGetters,mapActions} from 'vuex'
    import {MessageBox} from 'mint-ui';
    export default{
        data(){
            return {
                orderId:this.$store.state.order_id,
                price:120,
                data:[]
            }
        },
        created(){
            //this.getData();
        },

        methods: {
        callPay(jsonStr){
           if (typeof WeixinJSBridge == "undefined"){
              if( document.addEventListener ){
                  document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
              }else if (document.attachEvent){
                  document.attachEvent('WeixinJSBridgeReady', this.jsApiCall);
                  document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
              }
           }else{
              this.jsApiCall(jsonStr);
           }
        },
        jsApiCall(jsonStr){
            /*{
                           "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入     
                           "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
                           "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
                           "package":"prepay_id=u802345jgfjsdfgsdg888",     
                           "signType":"MD5",         //微信签名方式：     
                           "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
                       }*/
                 WeixinJSBridge.invoke(
                       'getBrandWCPayRequest', jsonStr,
                       function(res){     
                           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                              this.$toast('支付成功')
                           } else{
                             this.$toast('支付失败')
                           } 
                       }
                   )},
        payOrder(){
            let url = encodeURIComponent("/index.html");
             let qs = require('qs');
            this.$http.post('yjt/weixin/weixinprepay',
                 qs.stringify({"order_id":"12346789","url":url})).then((res)=>{
                  console.log(res)
                    //拿到支付订单信息调微信支付接口
                    let jsonStr=res.jsApiParameters;
                    this.callPay(jsonStr)
                   
                }).catch((err)=>{
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
            background-color:white;
        }
    }
</style>
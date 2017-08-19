<template>
    <div class="order_page">
        <h2>凯德西城丨撒浪嘿哟，玩味CP大比拼</h2>
        <mt-cell title="数量">
            <div class="nums"><span class="price">￥{{price}}/份</span>
                <i class="reduce" @click="decrement"></i>
                <span>{{getNum}}</span> <i class="add" @click="increment"></i>
            </div>
        </mt-cell>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="telVal"></mt-field>
        <mt-field label="备注" placeholder="" type="textarea" rows="4" v-model="textVal"></mt-field>
        <ul class="footer_order">
            <li>总价:<span>￥{{getNum * price}}</span></li>
            <li class="buy" @click="submitOrder">提交订单</li>
        </ul>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import {MessageBox} from 'mint-ui';
    export default{
        data(){
            return {
                telVal: '',
                textVal: '',
                goods_id: localStorage.getItem('goods_id'),
                price: 120,
            }
        },
        created(){
            this.getUserMsg();
        },
        computed: mapGetters(['getNum']),
        methods: {
            openAlert(msg) {
                MessageBox({
                    title: '注意事项',
                    message: msg,
                    confirmButtonText: '关闭'
                });
            },
            validatePhone: function (telval) {    //验证手机号码
                const regx = /^1[3|4|5|7|8][0-9]{9}$/;
                return regx.test(telval);
            },
            increment(){
                this.$store.dispatch('increment')
            },
            decrement(){
                this.$store.dispatch('decrement')
            },
            getUserMsg(){
                //点击购买授权成功后跳转到order界面地址传user_id
                //order/?user_id=a3eb85b253764e91a1fd9f18c186b928
                let _Path = this.$route.fullPath
                if (_Path.indexOf('?') > 0) {
                    let user_id = _Path.split('?')[1].split('=')[1]
                    this.$store.dispatch('setuserid', user_id)
                    // sessionStorage.setItem('user_id',user_id)
                }

                //授权登录进来后获取用户信息并本地存储
                this.$http.get('yjt/weixin/userinfo').then((res) => {
                    this.$toast(res.data.code)
                    if (res.data.code == 200) {
                        this.$store.dispatch('setusermsg', res.data.result)
                        //  sessionStorage.setItem('user_Info',JSON.stringify(res.data.result) )
                    }
                }).catch((err) => {
                    this.$toast(err)
                });

                let orderObj = {
                    id: null,//商品id
                    name: '',//商品名称
                    pay: 100,//实付金额
                    gotime: '2017-09-10'
                }
                sessionStorage.setItem('orderMsg', JSON.stringify(orderObj));
            },
            submitOrder(){
                if (!this.validatePhone(this.telVal)) {
                    this.$toast("请填写正确手机号");
                    return;
                } else if (this.textVal == '') {
                    this.$toast("请填写备注信息");
                    return
                }
                //提交订单
                let qs = require('qs');
                let params = {
                    REMARKS: this.textVal,  //备注
                    MOBILE: this.telVal,  //联系人手机号
                    GOODS_ID:this.goods_id ,//商品id
                    COUNT: this.$store.state.count,    //数量
                    NEED_INVOICE: '',  //是否需要发票,1:需要 2:不需要 默认值2
                    USER_NAME: '', //联系人姓名
                    PROV_AREA_ID: '',  //省id
                    DIJI_AREA_ID: '', //市id
                    QUXIAN_AREA_ID: '', //区id
                    ADDR_DETAILS: '', //详细地址
                };
                this.$http.post('/yjt/shoporders/giveOrder',
                    qs.stringify(params)).then((res) => {
                    if (res.data.code == '200') {
                        let oid = res.data.result.ORDER_ID;
                        this.$store.dispatch('setorderid', oid);
                        //提交订单成功跳转到订单支付
                        this.$router.push({
                            path: '/order/orderPay'
                        })
                    } else {
                        this.$toast("下单失败")
                    }
                }).catch((err) => {
                    this.$toast(err)
                });
            }

        }
    }


</script>
<style lang="less">

    .footer_order {
        display: flex;
        flex-wrap: nowrap;
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: #f8f8f8;
    }

    .footer_order li {
        display: block;
        width: 60%;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        font-size: 1.6rem;
        border-top: 1px solid #ccc;
        box-sizing: border-box;
        color: #6d6d6d;
    }

    .footer_order li span {
        color: #fa6e51;
    }

    .footer_order li:last-child {
        width: 40%;
        background-color: #fa6e51;
        color: white;
        border-top-color: #fa6e51;

    }

    .order_page {
        margin-bottom: 5rem;
        h2 {
            font-size: 1.6rem;
            padding: 1rem;

        }

        .itembg .mint-cell-wrapper {
            background-color: orangered;
            color: white;
            box-sizing: border-box;
            border-radius: 0.5rem;
            margin: 0 1rem 1rem;
            width: auto;
            background-size: 120% 0;
        }

        .itembg .mint-cell-value {
            color: white
        }
        .nums {
            display: flex;
            height: 2.5rem;
        }
        .nums span {
            line-height: 2.5rem;
            padding: 0 1rem;
            display: inline-block
        }
        .nums i {
            display: inline-block;
            width: 2.5rem;
            height: 2.5rem;
            background: url("../assets/icon.png") no-repeat;
            background-size: cover;
        }
        .nums i.add {
            background-position: 0 65%
        }
        .nums i.reduce {
            background-position: 0 70%
        }
        .nums span.price {
            color: orangered;
            padding-right: 3rem;
        }

    }
</style>
<template>
    <div class="order_page">
        <h2>凯德西城丨撒浪嘿哟，玩味CP大比拼</h2>
        <mt-cell title="数量">
            <div class="nums"><span class="price">￥{{goods_price}}/份</span>
                <i class="reduce" @click="decrement"></i>
                <span>{{getNum}}</span> <i class="add" @click="increment"></i>
            </div>
        </mt-cell>
        <mt-cell title="选择现金优惠券" :value="getCouponPrice" is-link :to="{ path: '/coupon_select' }"></mt-cell>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="telVal"></mt-field>
        <mt-field label="备注" placeholder="" type="textarea" rows="4" v-model="textVal"></mt-field>
        <ul class="footer_order">
            <li>总价:<span>￥{{totalPrice}}</span></li>
            <li class="buy" @click="submitOrder">提交订单</li>
        </ul>
        <mt-popup v-model="verifyBox" class="mint-popup-3">
            <mt-field placeholder="请输入手机号" type="tel" v-model="telVal"></mt-field>
            <mt-field placeholder="输入验证码" v-model="codeVal">
                <mt-button @click.native="getCode" :disabled="timeout==0?false:true" size="small"
                           :type="timeout==0?'primary':'default'">{{timeout | timeText}}
                </mt-button>
            </mt-field>
            <mt-button @click.native="submintMobile" size="large" type="danger" class="confirm_btn">绑定手机号
            </mt-button>
        </mt-popup>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import {MessageBox} from 'mint-ui';
    export default{
        data(){
            return {
                telVal: '',
                codeVal: '',
                textVal: '',
                verifyBox: false,
                goods_id: localStorage.getItem('goods_id'),
                goods_price: parseFloat(localStorage.getItem('goods_price')),
                handling: false,
                timeout: 0,
                timerId: 0
            }
        },
        created(){
            this.getUserMsg();
            this.$store.dispatch('goodsprice', this.goods_price);
        },
        computed: mapGetters(['getNum', 'getCouponPrice', 'totalPrice']),
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
            timerSet: function () {
                let v = this;
                if (v.timerId) {
                    clearInterval(v.timerId);
                }
                v.timerId = setInterval(function () {
                    if (v.timeout <= 0) {
                        clearInterval(v.timerId);
                    } else {
                        v.timeout--;
                    }
                }, 1000);
            },
            getCode(){
                let v = this;
                if (!v.validatePhone(v.telVal)) {
                    v.$toast("请填写正确手机号");
                    return;
                }
                if (v.handling || v.timeout > 0)return;
                v.handling = true;
                /* v.timeout = 60;
                 v.timerSet();*/
                v.$http.get('yjt/user/getmsgcode').then((res) => {   // yjt/user/getmsgcode
                    // this.$toast(res.data.code)
                    if (res.data.code == '200') {
                     //   v.$toast("验证码已发送！");
                        //设置验证码 重新获取时间
                        v.timeout = 60;
                        v.timerSet();
                    } else {
                        v.$toast(res.data.msg)
                    }
                    v.handling = false;
                }).catch((err) => {
                    v.$toast(err)
                });
            },
            submintMobile(){
                if (!this.validatePhone(this.telVal)) {
                    this.$toast("请填写正确手机号");
                    return;
                }
                if (this.codeVal == '') {
                    this.$toast('请输入验证码')
                    return;
                }
                //yjt/weixin/bindMobile
                this.$http.get('yjt/weixin/bindMobile', {
                    params: {
                        user_id: this.$store.state.user_id,
                        mobile: this.telVal,
                        code: this.codeVal
                    }
                }).then((res) => {
                    if (res.data.code == '200') {
                        this.$toast('绑定成功');
                        //验证手机号成功后，返回用户信息
                        this.$store.dispatch('setusermsg', res.data.result);
                        setTimeout(() => {
                            this.verifyBox = false;
                        }, 500)
                    } else {
                        this.$toast('验证码错误')
                    }
                }).catch((err) => {
                    this.$toast(err)
                });
            },
            getUserMsg(){
                let local_user_id = window.localStorage.getItem('user_id');
                if (!local_user_id) {  //第一次授权进入
                    let _Path = this.$route.fullPath;
                    //点击登录授权成功后台通过url传来user_id ,http://youertong.cn/index.html#/my?user_id=a3eb85b253764e91a1fd9f18c186b928
                    if (_Path.indexOf('?') > 0) {
                        let user_id = _Path.split('?')[1].split('=')[1];
                        this.$store.dispatch('setuserid', user_id);//存储到vuex
                        window.localStorage.setItem('user_id', user_id);//存储到本地
                        //授权后通过user_id验证获取用户信息
                        this.$http.get('yjt/weixin/userinfo?user_id=' + user_id).then((res) => {
                            if (res.data.code == '200') {
                                this.$store.dispatch('setusermsg', res.data.result);
                            }
                        }).catch((err) => {
                            this.$toast(err)
                        });
                    }
                } else if (local_user_id && !this.$store.state.user_id) { //用户关掉浏览器后再次进入,此时本地有存在用户user_id,vuex中无用户信息
                    this.$http.get('yjt/weixin/userinfo?user_id=' + local_user_id).then((res) => {
                        // this.$toast(res.data.code)
                        if (res.data.code == '200') {
                            this.$store.dispatch('setuserid', local_user_id);//存储到vuex
                            this.$store.dispatch('setusermsg', res.data.result) //个人中心界面使用
                            this.telVal= res.data.result.mobile;
                        }
                    }).catch((err) => {
                        this.$toast(err)
                    });
                } else { //用户登录,并获取了用户信息。此时本地有存在用户user_id,vuex中有用户信息
                   this.telVal = this.$store.state.user_msg.mobile;
                }
            },
            submitOrder(){
                if (!this.$store.state.user_msg.mobile) {
                    this.verifyBox = true; //弹出验证手机号界面
                    return
                }
                if (!this.validatePhone(this.telVal)) {
                    this.$toast("请填写正确手机号");
                    return;
                }
                //提交订单
                let qs = require('qs');
                let params = {
                    REMARKS: this.textVal,  //备注
                    MOBILE: this.telVal,  //联系人手机号
                    GOODS_ID: this.goods_id,//商品id
                    CASH_ID: this.$store.state.coupon_id,//优惠券id
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
                        this.$toast(res.data.msg)
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
        .mint-popup-3 {
            padding: 10px;
            box-sizing: border-box;
            width: 80%;
            background-color: #fff;
            border-radius: 3px;
            box-shadow: 0 0 3px #cccccc;
        }
        .mint-popup-3 .mint-cell-wrapper {
            background-image: none;
            border-bottom: 1px solid #f4f4f4;
        }
        .confirm_btn {
            margin-top: 20px;
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
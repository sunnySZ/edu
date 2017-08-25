<template>
    <div class="my_page">
        <div class="login_top">
            <img slot="icon" :src="userImg">
            <div class="login_msg">Hi {{nickName}}<span v-if="!isLogin">您还未登录</span>
                <br><a href="javascript:;" v-if="!isLogin" @click="login()">点击登陆</a>
                <a v-if="isLogin" @click="loginOut()">注销</a></div>
        </div>
        <mt-cell title="我的订单" value="全部订单" isLink @click.native="viewOrderList('0')"></mt-cell>
        <ul class="order_item">
            <li>
                <a href="javascript:;" @click="viewOrderList('1')">
                    <span class="order-icons order-pay"></span>
                    <p>待付款</p>
                </a>
            </li>
            <li>
                <a href="javascript:;" @click="viewOrderList('2')">
                    <span class="order-icons order-use"></span>
                    <p>待使用</p>
                </a>
            </li>
            <li>
                <a href="javascript:;" @click="viewOrderList('3')">
                    <span class="order-icons order-eval"></span>
                    <p>待评价</p>
                </a>
            </li>
            <li>
                <a href="javascript:;" @click="viewOrderList('4')">
                    <span class="order-icons order-refund"></span>
                    <p>退款/返利</p>
                </a>
            </li>
        </ul>
        <mt-cell title="会员专区"></mt-cell>
        <ul class="order_item order_item3">
            <li>
                <a href="javascript:;" @click="coupon">
                    <span class="order-icons coupon-icon"></span>
                    <p class="item-info pa dib">
                        <span class="item-title db">优惠券</span>
                        <span class="item-value db"></span>
                    </p>
                </a>
            </li>
            <li>
                <a href="javascript:;" @click="scores">
                    <span class="order-icons score-icon"></span>
                    <p class="item-info pa dib">
                        <span class="item-title db">积分</span>
                        <span class="item-value db"></span>
                    </p>
                </a>
            </li>
            <li>
                <a href="javascript:;" @click="collect">
                    <span class="order-icons collect-icon"></span>
                    <p class="item-info pa dib">
                        <span class="item-title db">收藏</span>
                        <span class="item-value db"></span>
                    </p>
                </a>
            </li>
            <li>
                <a href="#">
                    <span class="order-icons contact-icon"></span>
                    <p class="item-info pa dib">
                        <span class="item-title db">联系人</span>
                    </p>
                </a>
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
                userImg: '/dist/user_default.png',
                nickName: '',
                isLogin: false,
            }
        },
        created(){
            this.getUserMsg()
        },
        methods: {
            isWeiXin() {   //判断是否微信登陆 是不是微信浏览器
                let ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            },
            getUserMsg(){
                let local_user_id = window.localStorage.getItem('user_id');
                if (!local_user_id) {  //第一次授权进入
                    let _Path = this.$route.fullPath
                    //点击登录授权成功后台通过url传来user_id ,http://youertong.cn/index.html#/my?user_id=a3eb85b253764e91a1fd9f18c186b928
                    if (_Path.indexOf('?') > 0) {
                        let user_id = _Path.split('?')[1].split('=')[1];
                        this.$store.dispatch('setuserid', user_id);//存储到vuex
                        window.localStorage.setItem('user_id', user_id);//存储到本地
                        //授权后通过user_id验证获取用户信息
                        this.$http.get('yjt/weixin/userinfo?user_id=' + user_id).then((res) => {
                            if (res.data.code == '200') {
                                this.$store.dispatch('setusermsg', res.data.result);
                                this.userImg = res.data.result.userHeadImgurl; //用户头像
                                this.nickName = res.data.result.userNickname; //用户昵称
                                this.isLogin = true;
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
                            this.$store.dispatch('setusermsg', res.data.result);
                            this.userImg = res.data.result.userHeadImgurl;
                            this.nickName = res.data.result.userNickname;
                            this.isLogin = true;
                        }
                    }).catch((err) => {
                        this.$toast(err)
                    });
                } else { //用户登录,并获取了用户信息。此时本地有存在用户user_id,vuex中有用户信息
                    this.isLogin = true;
                    this.userImg = this.$store.state.user_msg.userHeadImgurl;
                    this.nickName = this.$store.state.user_msg.userNickname;
                }
            },
            viewOrderList(index){ //查看订单
                if (this.$store.state.user_id) { //判断登录
                    this.$store.dispatch('ordercur', index) //订单列表界面tab高亮
                    this.$router.push({path: '/orderList'})
                } else {
                    this.$toast("请登录后查看")
                }
            },
            collect(){ //查看收藏列表
                if (this.$store.state.user_id) { //判断登录
                    this.$router.push({path: '/collect'})
                } else {
                    this.$toast("请登录后查看")
                }
            },
            coupon(){
                if (this.$store.state.user_id) { //判断登录
                    this.$router.push({path: '/coupon'})
                } else {
                    this.$toast("请登录后查看")
                }
            },
            scores(){
                if (this.$store.state.user_id) { //判断登录
                    this.$router.push({path: '/scores'})
                } else {
                    this.$toast("请登录后查看")
                }
            },
            login(){
                if (this.isWeiXin()) {
                    //点击授权登录
                    var url1 = '/route.html?code=2';  //http://youertong.cn/index.html#/my
                    window.location.href = 'index.jsp?url=' + encodeURIComponent(url1)
                } else {
                    this.$toast("请在微信里操作")
                }
            },
            loginOut(){
                this.$store.dispatch('logout')
                this.isLogin = false;
                this.userImg = '/dist/user_default.png';
                this.nickName = ''


                //测试验证手机专用--start
                ///yjt/shoporders/deleteBindMobile
                this.$http.get('yjt/shoporders/deleteBindMobile').then((res) => {
                    // this.$toast(res.data.code)
                    if (res.data.code == '200') {
                        this.$toast('手机号删除成功')
                    }
                }).catch((err) => {
                    this.$toast(err)
                });
                //测试验证手机专用---end

            }

        },
        components: {
            Foot
        }
    }
</script>
<style lang="less">
    .my_page {
        .login_top {
            display: flex;
            background-color: #26a2ff;
            opacity: 0.6;
            font-size: 1.4rem;
        }
        .login_msg {
            padding-top: 2rem;
        }
        .login_top img {
            margin: 1rem;
            width: 5rem;
            height: 5rem;
            border-radius: 3rem;
        }
        .mint-cell {
            margin-top: 0;
            min-height: 3.2rem;
        }
        .mint-cell-title {
            border-left: 0.3rem solid #26a2ff;
            padding-left: 0.5rem;
            font-size: 1.4rem;
        }
        .mint-cell-wrapper {
            font-size: 1.2rem;
            background-image: none;
            padding: 0;
        }
        .mint-cell-value.is-link {
            color: #26a2ff;
            margin-right: 1.2rem;
        }
        .mint-cell-allow-right::after {
            right: 0.5rem;
        }
        .order_item {
            display: flex;
            justify-content: space-around;
            padding: 0;
            background-color: white;
            border-top: 1px solid #ccc;
            margin: 0 0 1rem;
        }
        .order_item li {
            min-height: 5rem;
            display: block;
            text-align: center;
        }
        .order_item3 {
            flex-wrap: wrap;
            justify-content: flex-start;
        }
        .order_item3 li {
            width: 33.33%;
            border-right: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
            box-sizing: border-box;
        }
        .order_item3 li:nth-child(3n) {
            border-right: none;
        }
        .order_item li a {
            color: #000000;
            display: block;
            padding: 1rem 0;
        }
        .order_item .order-icons {
            width: 2rem;
            height: 2rem;
            display: block;
            margin: 0.5rem auto;
            background: url("../assets/icon1.png") no-repeat;
            background-size: cover;
        }
        .order_item .order-pay {
            background-position: 0 40%;
        }
        .order_item .order-use {
            background-position: 0 50%;
        }
        .order_item .order-eval {
            background-position: 0 60%;
        }
        .order_item .order-refund {
            background-position: 0 70%;
        }
        .order_item3 .order-icons {
            background: url("../assets/icon.png") no-repeat;
            background-size: cover;
        }
        .order_item3 .child-traveller {
            background-position: 0 0;
        }
        .order_item3 .coupon-icon {
            background-position: 0 5%;
        }
        .order_item3 .score-icon {
            background-position: 0 10%;
        }
        .order_item3 .collect-icon {
            background-position: 0 15%;
        }
        .order_item3 .contact-icon {
            background-position: 0 20%;
        }

    }
</style>
<template>
    <div class="detail_page" v-if="detailData">
        <div class="wrap_top">
            <img :src="detailData.B_IMAGE"/>
            <!--detailData.ISFAVORITES | isFavorites-->
            <span :class="{ 'collect_btn': isNormal, 'cur':isCur}" @click="addCollect"></span>
            <h2>{{detailData.NAME}}</h2>
            <p class="txt_msg">{{detailData.REMARKS}}</p>
            <div class="wrap_msg">
                <span class="low_price">￥<mark>{{detailData.PRICE}}</mark>起</span>
                <span v-if="detailData.LABEL.length>0" class="share_gift"
                      v-for="item in detailData.LABEL">{{item}}</span>
                <span class="apply_num">累计报名{{detailData.SALED_NUM}}人</span>
            </div>
            <mt-cell title="适合年龄：" :value="detailData.AGE"></mt-cell>
            <mt-cell title="联系电话：" :value="detailData.TEL" is-link to="tel:8888888"></mt-cell>
            <mt-cell title="注意事项：" @click.native="openAlert(detailData.ATTENTION)" :value="detailData.ATTENTION"
                     is-link></mt-cell>
        </div>
        <div class="wrap_place">
            <p>游玩地</p>
            <mt-cell :title="detailData.ADRESS" is-link></mt-cell>
        </div>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">游玩内容</mt-tab-item>
            <mt-tab-item id="2" class="comment_pos">点评({{commentsData.totalRow}})</mt-tab-item>
            <mt-tab-item id="3">咨询({{questionData.totalRow}})</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div class="detail_tab_content">
                    <div class="detail_info" v-html="detailData.DETAILS"></div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class="detail_tab_content">
                    <ul class="list_box">
                        <li v-for="item in commentsData.list">
                            <div class="list_item">
                                <div class="img_box"><img :src="item.HEAD_PIC"></div>
                                <div class="ticket_msg">
                                    <span class="title">{{item.USER_NAME}}</span> <span class="stars"><i :style="{width: 1.5*parseInt(item.SCORE) + 'rem' }"></i></span>
                                    <p>{{item.CREATE_TIME}}</p>
                                    <p>{{item.CONTENT}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <p v-show="comments.isLoading" class="loading">
                        <mt-spinner type="fading-circle"></mt-spinner>
                    </p>
                    <div class="get_more" @click="getMoreComments" v-show="comments.isMore">点击查看更多</div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <div class="detail_tab_content">
                    <mt-field placeholder="请输入您想要咨询的问题，玩翻天客服会尽快回复您哦！~" type="textarea" rows="4"
                              v-model="val"></mt-field>
                    <mt-button type="primary" size="small" @click.native="sendQuestion">我要提问</mt-button>
                    <ul class="list_box">
                        <li v-for="item in questionData.list">
                            <div class="list_item">
                                <div class="img_box"><img :src="item.HEAD_PIC"></div>
                                <div class="ticket_msg">
                                    <span class="title">{{item.USER_NAME}}</span>
                                    <span>{{item.CREATE_TIME}}</span>
                                    <p>{{item.CONTENT}}</p>
                                    <ul v-if="item.REPALYLIST.length>0" class="list_box reply_msg">
                                        <li v-for="item in item.REPALYLIST">
                                            <div class="list_item">
                                                <div class="img_box"><img src="../assets/user_default.png"></div>
                                                <div class="ticket_msg">
                                                    <span class="title">{{item.USER_NAME}}</span>
                                                    <span>{{item.CREATE_TIME}}</span>
                                                    <p>{{item.CONTENT}}</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <p v-show="questions.isLoading" class="loading">
                        <mt-spinner type="fading-circle"></mt-spinner>
                    </p>
                    <div class="get_more" @click="getMoreQuestions" v-show="questions.isMore">点击查看更多</div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <div class="footer">
            <router-link to="/select/" class="ask">
                <i></i>首页
            </router-link>
            <a class="comments" @click="viewComments">
                <i></i>点评
                <em v-show="isComShow">{{commentsData.totalRow}}</em>
            </a>
            <a class="share" href="javascript:" @click="shareModal">
                <i></i>分享</a>
            <a class="buy" href="javascript:;" @click="buyNow">立刻购买</a>
        </div>
        <div class="v-modal" v-show="isModal" style="z-index: 2004;"><img src="../assets/sharepic.png"
                                                                          @click="closeModal"></div>
    </div>
</template>
<script>
    import {MessageBox} from 'mint-ui';
    export default{
        data(){
            return {
                isNormal: true, //点击时判断收藏高亮
                isCur: false,
                selected: '1',
                id: null,
                price: 0,
                val: '', //提问内容
                isModal: false,//分享
                detailData: null,
                commentsData: null,
                questionData: null,
                isComShow: false,
                comments: {
                    isLoading: false,
                    isMore: false,  //是否显示"点击加载更多"
                    curPage: 1,
                    pageSize: 5
                },
                questions: {
                    isLoading: false,
                    isMore: false,
                    curPage: 1,
                    pageSize: 5
                },
                userInfo: {
                    nick: null,
                    ulevel: null,
                    uid: null,
                    portrait: null
                }
            }
        },
        created(){
            this.getData();
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
            shareModal(){ //分享
                this.isModal = true;
            },
            closeModal(){
                this.isModal = false;
            },
            viewComments(){
                var offsetTop = document.querySelectorAll('.comment_pos')[0].offsetTop;
                document.body.scrollTop = offsetTop
                this.selected = '2'
            },
            buyNow(){
                if (this.isWeiXin()) {
                    //  var url1='/?#/order/';
                    /* var url1='/route.html?code=1';  
                     window.location.href='index.jsp?url='+encodeURIComponent(url1)*/
                    if (window.localStorage.getItem('user_id')) {
                        this.$router.push({
                            path: '/order'
                        })
                    } else {
                        //  var url1='/#/order/';
                        var url1 = '/route.html?code=1';//http://youertong.cn/index.html#/order
                        window.location.href = 'index.jsp?url=' + encodeURIComponent(url1)
                    }
                } else {
                    this.$toast('请在微信里购买')
                }
            },
            openAlert(msg) {
                MessageBox({
                    title: '注意事项',
                    message: msg,
                    confirmButtonText: '关闭'
                });
            },
            addCollect(){ //添加收藏或取消收藏，yjt/goodsfavorites/favoritesorcancel/4
                let local_user_id = window.localStorage.getItem('user_id');
                if (local_user_id && !this.$store.state.user_id) {
                    //用户关掉浏览器后再次进入,此时本地有存在用户user_id,vuex中无用户信息
                    this.$http.get('yjt/weixin/userinfo?user_id=' + local_user_id).then((res) => {
                        // this.$toast(res.data.code)
                        if (res.data.code == '200') {
                            this.$store.dispatch('setuserid', local_user_id);//存储到vuex
                            this.$store.dispatch('setusermsg', res.data.result) //个人中心界面使用
                            this.addCollectHttp()
                        }
                    })
                } else if (this.$store.state.user_id) {
                    this.addCollectHttp()
                } else {
                    this.$toast('请在个人中心登录后操作')
                }
            },
            addCollectHttp(){
                let url = 'yjt/goodsfavorites/favoritesorcancel/' + this.id
                this.$http.get(url).then((res) => {
                    if (res.data.code === '200') {
                        if (this.detailData.ISFAVORITES == 1) {
                            this.isCur = false;
                            this.detailData.ISFAVORITES = 0;
                            this.$toast('取消成功');
                        } else if (this.detailData.ISFAVORITES == 0) {
                            this.isCur = true;
                            this.detailData.ISFAVORITES = 1;
                            this.$toast('收藏成功');
                        } else {
                            this.isCur = false;
                        }
                    } else {
                        this.$toast('操作失败')
                    }
                    console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                });
            },
            getData() {  //获取详情,评论,提问
                this.id = this.$route.params.id;
                window.localStorage.setItem('goods_id', this.id) //存储商品id，订单界面用
                // console.log(localStorage.getItem('goods_id'))
                // this.$store.dispatch('goodsid', this.id);
                this.$indicator.open();
                let httpArr = [
                    this.$http.get('yjt/shopgoods/info/' + this.id), //活动详情
                    this.$http.get('yjt/goodsrepaly/pagelist/1-5?shoid=' + this.id),  //点评,根据活动ID获取活动评论列表
                    this.$http.get('yjt/goodsquestion/pagelist/1-5?shoid=' + this.id)  //提问,根据活动ID获取活动提问列表
                ];
                this.$http.all(httpArr).then(this.$http.spread((data1, data2, data3) => {
                    this.detailData = data1.data;
                    this.commentsData = data2.data;
                    this.questionData = data3.data;

                    if (this.commentsData.totalRow > 0) {  //判断底部点评数字是否显示
                        this.isComShow = true;
                    }

                    if (this.detailData.ISFAVORITES && this.detailData.ISFAVORITES == 1) {
                        this.isCur = true;
                    }

                    localStorage.setItem('goods_price', this.detailData.PRICE) //存储商品id，订单界面用
                    if (data2.data.totalPage > 1) {  //判断点评列表是否显示点击查看更多
                        this.comments.isMore = true;
                    }
                    if (data3.data.totalPage > 1) {  //判断点评列表是否显示点击查看更多
                        this.questions.isMore = true;
                    }
                    this.$indicator.close();
                }));
            },
            getMoreComments() { //加载更多评论
                this.comments.isLoading = true;
                this.comments.curPage += 1;
                let url = 'yjt/goodsrepaly/pagelist/' + this.comments.curPage + '-' + this.comments.pageSize + '?shoid=' + this.id
                this.$http.get(url).then((res) => {
                    this.comments.isLoading = false;
                    if (this.comments.curPage >= res.data.totalPage) {
                        this.comments.isMore = false;
                        // this.$toast('没有更多了...')
                    }
                    this.commentsData.list = this.commentsData.list.concat(res.data.list)
                }).catch((err) => {
                    this.comments.isLoading = false;
                    console.log(err)
                });
            },
            getMoreQuestions() { //加载更多提问
                this.questions.isLoading = true;
                this.questions.curPage += 1;
                let url = 'yjt/goodsquestion/pagelist/' + this.questions.curPage + '-' + this.questions.pageSize + '?shoid=' + this.id;
                this.$http.get(url).then((res) => {
                    this.questions.isLoading = false;
                    if (this.questions.curPage >= res.data.totalPage) {
                        this.questions.isMore = false;
                        // this.$toast('没有更多了...')
                    }
                    this.questionData.list = this.questionData.list.concat(res.data.list)
                }).catch((err) => {
                    this.questions.isLoading = false;
                    console.log(err)
                });
            },
            sendQuestion(){  //提问
                let local_user_id = window.localStorage.getItem('user_id');
                if (local_user_id && !this.$store.state.user_id) {
                    //用户关掉浏览器后再次进入,此时本地有存在用户user_id,vuex中无用户信息
                    this.$http.get('yjt/weixin/userinfo?user_id=' + local_user_id).then((res) => {
                        // this.$toast(res.data.code)
                        if (res.data.code == '200') {
                            this.$store.dispatch('setuserid', local_user_id);//存储到vuex
                            this.$store.dispatch('setusermsg', res.data.result) //个人中心界面使用
                            this.sendQuestionHttp()
                        }
                    })
                } else if (this.$store.state.user_id) {
                    this.sendQuestionHttp()
                } else {
                    this.$toast('请在个人中心登录后操作')
                }
            },
            sendQuestionHttp(){
                //  let url = 'yjt/goodsquestion/add?shoid=4&content=999888';
                var qs = require('qs');
                if (this.val !== '') {
                    this.$http.post('yjt/goodsquestion/add', qs.stringify({
                        shoid: this.id,
                        content: this.val
                    })).then((res) => {
                        if (res.data.code === '200') {
                            this.$toast('提交成功');
                            this.questionData.list.unshift({
                                CONTENT: this.val,
                                USER_NAME:this.$store.state.user_msg.userNickname,
                                HEAD_PIC: this.$store.state.user_msg.userHeadImgurl,
                                REPALYLIST: [],
                                CREATE_TIME:'刚刚'
                            });
                            this.questionData.totalRow += 1;
                            this.val = '';
                        } else {
                            this.$toast('提交失败')
                        }

                    }).catch((err) => {
                        console.log(err)
                    });
                } else {
                    this.$toast('请输入提问内容')
                }
            }
        }
    }
</script>
<style lang="less">
    .wrap_top {
        position: relative;
        background-color: white;
    }

    .wrap_top img {
        width: 100%;
    }

    .wrap_top h2 {
        font-size: 1.6rem;
        padding: 0.8rem;
        margin: 0;
    }

    .wrap_top .txt_msg {
        font-size: 1.2rem;
        line-height: 1.8rem;
        word-break: break-all;
        color: #737373;
        padding: 0 0.8rem;
    }

    .wrap_msg {
        line-height: 3rem;
        font-size: 1.2rem;
        color: #fa6e51;
        padding: 0 0.6rem;
    }

    .wrap_msg mark {
        font-size: 2.4rem;
        background: none;
        color: #fa6e51;
    }

    .wrap_msg .apply_num {
        color: #666666;
        padding-left: 1rem;
    }

    .wrap_top .mint-cell-value {
        flex: 2.4;
        height: 48px;
        white-space: nowrap;
        line-height: 48px;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .wrap_place {
        background-color: white;
        margin: 1rem 0;
    }

    .wrap_place .mint-cell-title {
        font-size: 1.4rem;
        padding: 1rem 0;
        line-height: 1.4rem;
    }

    .wrap_place p {
        font-size: 1.6rem;
        line-height: 3.6rem;
        padding-left: 1rem;
    }

    .detail_page {
        .ticket_msg {
            flex: 5;
        }
        .v-modal {
            text-align: right;
        }
        .v-modal img {
            width: 70%;
        }
        .stars {
            display: inline-block;
            width: 7.5rem;
            height: 1.5rem;
            background: url("../assets/star.png") no-repeat;
            background-position: left bottom;
            background-size: cover;
            position: relative;
        }
        .stars i {
            display: block;
            height: 1.5rem;
            background: url("../assets/star.png") no-repeat;
            background-position: left top;
            background-size: auto 235%;
            position: absolute;

            left: 0;
            top: 0;
        }

        .reply_msg {
            padding: 0.5rem;
            background-color: #fff5dd;
            border-radius: 0.5rem;
        }

        .collect_btn {
            background: rgba(0, 0, 0, 0.6) url("../assets/icon1.png") no-repeat;
            display: block;
            position: absolute;
            width: 2.5rem;
            height: 2.5rem;
            right: 1rem;
            top: 1rem;
            background-position: 0 90%;
            background-size: cover;
            border-radius: 50%;
        }
        .collect_btn.cur {
            background-position: 0 100%
        }
        .collect_btn.cur_no {
            background-position: 0 90%;
        }

        .mint-navbar {
            border-bottom: 1px solid #cccccc
        }
        .mint-navbar .mint-tab-item.is-selected {
            margin-bottom: 0;
        }

        .detail_tab_content {
            background-color: white;
            padding-bottom: 5rem;
        }
        .detail_info {
            padding: 1rem;
        }
        .detail_info img {
            width: 100%;
            height: auto;
        }

        .mint-button--small {
            margin-left: 70%;
        }

        .footer {
            display: flex;
            flex-wrap: nowrap;
            position: fixed;
            bottom: 0;
            width: 100%;
            background-color: #f8f8f8;
        }
        .footer a {
            display: block;
            width: 20%;
            height: 4.6rem;

            text-align: center;
            font-size: 1.2rem;
            border-top: 1px solid #ccc;
            box-sizing: border-box;
            color: #6d6d6d;
        }
        .footer a:last-child {
            width: 40%;
            background-color: #fa6e51;
            font-size: 1.6rem;
            color: white;
            border-top-color: #fa6e51;
            line-height: 4.6rem;
        }
        .footer i {
            width: 2.4rem;
            height: 2.4rem;
            display: block;
            margin: 0.5rem auto 0;
            background: url("../assets/icon1.png") no-repeat;
            background-size: cover;
        }
        .footer .ask i {
            background-position: 0 0;
        }
        .footer .share i {
            background-position: 0 10%;
        }
        .footer .comments i {
            background-position: 0 20%;
        }
        .footer .comments {
            position: relative;
        }
        .footer .comments em {
            font-size: 1rem;
            color: #fff;
            background: #fa6e51;
            padding: 0 0.5rem;
            border-radius: 1rem;
            position: absolute;
            top: 0.5rem;
            right: 1rem;
        }

    }
</style>
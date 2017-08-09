<template>
    <div class="detail_page" v-if="detailData">
        <div class="wrap_top">
            <img :src="detailData.B_IMAGE"/>
            <span class="collect-btn" id="collect"></span>
            <h2>{{detailData.NAME}}</h2>
            <p class="txt_msg">{{detailData.REMARKS}}</p>
            <div class="wrap_msg">
                <span class="low_price">￥<mark>{{detailData.PRICE}}</mark>起</span>
                <span class="share_gift" v-for="item in detailData.LABEL">{{item}}</span>
                <span class="apply_num">累计报名{{detailData.SALED_NUM}}人</span>
            </div>

            <mt-cell title="适合年龄：" :value="detailData.AGE"></mt-cell>
            <mt-cell title="联系电话：" :value="detailData.TEL" is-link></mt-cell>
            <mt-cell title="注意事项：" :value="detailData.ATTENTION" is-link></mt-cell>
        </div>
        <div class="wrap_place">
            <p>游玩地</p>
            <mt-cell :title="detailData.ADRESS" is-link></mt-cell>
        </div>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">游玩内容</mt-tab-item>
            <mt-tab-item id="2">点评({{commentsData.totalRow}})</mt-tab-item>
            <mt-tab-item id="3">咨询(8)</mt-tab-item>
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
                                <div class="img_box"><img
                                        src="http://img.wanfantian.com/uploads/201707/28/81d9b4e9049f785a418ada5287be221d.png">
                                </div>
                                <div class="ticket_msg">
                                    <span class="title">{{item.USER_NAME}}</span>
                                    <p>{{item.CONTENT}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <p v-show="listLoading" class="loading">
                        <mt-spinner type="fading-circle"></mt-spinner>
                    </p>
                    <div class="get_more" @click="getMoreComments()" v-show="isMore">点击查看更多</div>


                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <div class="detail_tab_content" style="height:600px;"></div>
            </mt-tab-container-item>
        </mt-tab-container>
        <div class="footer">
            <a class="ask" href="javaScript:;">
                <i></i>客服
            </a>
            <a class="comments" href="/comment/commentListAll?type=2&amp;coupon_id=2569&amp;buy_log=0">
                <i></i>点评
                <em>{{commentsData.totalRow}}</em>
            </a>
            <a class="share" href="#">
                <i></i>分享</a>
            <a class="buy" href="#">立刻购买</a>
        </div>

    </div>
</template>
<script>
    export default{
        data(){
            return {
                listLoading: false,
                selected: '1',
                id: null,
                detailData: null,
                commentsData: null,
                isMore: false, //点评是否显示"点击加载更多"
                params: {
                    curPage: 1,
                    pageSize: 5
                }
            }
        },
        created(){
            this.getData();
        },
        methods: {

            //获取详情及评论
            getData() {
                this.id = this.$route.params.id;
                var _this = this
                let httpArr = [
                    _this.$http.get('yjt/shopgoods/info/' + this.id), //推荐活动
                    _this.$http.get('yjt/goodsrepaly/pagelist/1-5?shoid=' + this.id)  //点评,根据活动ID获取活动评论列表
                ]
                _this.$http.all(httpArr).then(_this.$http.spread(function (data1, data2) {
                    _this.detailData = data1.data;
                    _this.commentsData = data2.data;
                    if (data2.data.pageSize > 1) {
                        _this.isMore = true;
                    }
                }));


            },
            getMoreComments() {
                this.listLoading = true;
                this.params.curPage += 1
                let url = 'yjt/goodsrepaly/pagelist/' + this.params.curPage + '-' + this.params.pageSize + '?shoid=' + this.id
                this.$http.get(url).then((res) => {
                    this.listLoading = false;
                    if (this.params.curPage >= res.data.totalPage) {
                        this.isMore = false;
                        this.$toast('没有更多了...')
                    }
                    this.commentsData.list = this.commentsData.list.concat(res.data.list)
                }).catch((err) => {
                    //上下拉loading动画关闭
                    //   this.$indicator.close();//隐藏loading
                    this.listLoading = false;
                    console.log(err)
                });
            }
        }
    }
</script>
<style lang="less">
    .detail_page {
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
        .wrap_msg .share_gift {
            font-size: 1rem;
            padding: 0.1rem;
            border: 1px solid #fa6e51;
            border-radius: 0.3rem;
            margin-left: 0.5rem;
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
        .mint-navbar {
            border-bottom: 1px solid #cccccc
        }
        .mint-navbar .mint-tab-item.is-selected {
            margin-bottom: 0;
        }

        .detail_tab_content {
            background-color: white;
            padding: 1rem 1rem 4.6rem;
        }
        .detail_info img {
            width: 100%;
            height: auto;
        }
        .get_more{ padding: 1rem; text-align: center;}
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
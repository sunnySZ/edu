<template>
    <div class="detail_page">
        <div class="wrap_top">
            <img src="http://img.wanfantian.com/uploads/201707/27/5e121909343182f872a30dfaeb029c0a.jpg">
            <span class="collect-btn" id="collect"></span>
            <h2>顽童堡儿童主题乐园</h2>
            <p class="txt_msg">引进自美国的顽童堡来荟聚中心啦~好玩又益智！暑假玩翻天大放送，原价108元的全场通玩票，现仅需39.9元~数量有限，先到先得哦~</p>
            <div class="wrap_msg">
                <span class="low_price">￥<mark>49.90</mark>起</span>
                <span class="share_gift">分享有礼</span>
                <span class="share_gift">点评有礼</span>
                <span class="apply_num">累计报名967人</span>
            </div>

            <mt-cell title="适合年龄：" value="2岁及以上"></mt-cell>
            <mt-cell title="联系电话：" value="027-83258006" is-link></mt-cell>
            <mt-cell title="注意事项：" value="1、特惠票使用时间：即日起至8月31日（限时3个小时）
2、游玩地点：硚口区长宜路1号荟聚中心F区欧尚1楼顽童堡儿童主题乐园
3、兑换方式：无需预约，凭玩翻天验证码前往商家兑换即可
4、商家联系电话：027-83258006" is-link></mt-cell>
        </div>
        <div class="wrap_place">
            <p>游玩地</p>
            <mt-cell title="顽童堡儿童主题乐园 硚口区长宜路1号荟聚中心F区欧尚1楼顽童堡儿童主题乐园" is-link></mt-cell>
        </div>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">游玩内容</mt-tab-item>
            <mt-tab-item id="2">点评(33)</mt-tab-item>
            <mt-tab-item id="3">咨询(8)</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div class="detail_tab_content">
                    111111 内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内
                    22222容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容66666
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class="detail_tab_content" style="height: 300px;"></div>
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
                <em>34</em>
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
                selected: '1'
            }
        },
        watch: {
            selected(curVal, oldVal){
                console.log(curVal)
            }
        },
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
            padding: 0 1rem;
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
            padding-left: 3rem;
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
            margin:0.5rem auto 0;
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
        .footer .comments{ position: relative;}
        .footer .comments em {
            font-size:1rem;
            color: #fff;
            background: #fa6e51;
            padding: 0 0.5rem;
            border-radius:1rem;
            position: absolute;
            top: 0.5rem;
            right:1rem;
        }

    }
</style>
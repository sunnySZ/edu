<template>
    <div class="select_page">
        <mt-header fixed>
            <router-link to="/search" slot="left">
                <input class="info" type="text" placeholder="搜索商品活动或游玩地">
            </router-link>
           </mt-header>
        <Banner></Banner>


        <ul class="type_list">
            <li><img src="http://img.wanfantian.com/uploads/201706/16/bba95870ae8a27ce5f21a4571c4f66a7.png">
                <span>夏令营</span></li>
            <li>  <img src="http://img.wanfantian.com/uploads/201706/16/dd93350d82b61389b4f453b1c0c1ece9.png">
                <span>暑期游</span></li>
            <li>
                <img src="http://img.wanfantian.com/uploads/201706/30/834b8eb4329534a71a60b7170b273580.png">
                <span>运动</span>
            </li>
            <li>
                <img src="http://img.wanfantian.com/uploads/201704/20/37008df3effbd37d7079481adb4ea030.png">
                <span>儿童剧</span>
            </li>
            <li>
                <img src="http://img.wanfantian.com/uploads/201706/12/248c3ca6e394111720f944199c45ec3d.png">
                <span>微度假</span>
            </li>
        </ul>
        <mt-cell title="优惠推荐" is-link :to="{ name:'infinite', params: { url: '/lkp/v2/movie/coming_soon?' }}" value="更多"></mt-cell>
        <ul class="coupon_list">
            <li>
                <a href="https://play.wanfantian.com/ticket/commodityDetail?id=2569&#10;">
                    <img src="http://img.wanfantian.com/uploads/201707/31/107fb1575047943239a8f94675eab7d2.jpg">
                    <span>¥49.90起</span>
                    <p>顽童堡儿童主题乐园</p>
                </a>
            </li>
            <li>
                <a href="https://play.wanfantian.com/ticket/commodityDetail?id=2541&#10;">
                    <img src="http://img.wanfantian.com/uploads/201708/02/ff36a720297ebad5f71901d40f5f4cfe.jpg">
                    <span>¥9.90起</span>
                    <p>奥山小鬼帮帮团之极速前进</p>
                </a>
            </li>
            <li>
                <a href="https://play.wanfantian.com/ticket/commodityDetail?id=2541&#10;">
                    <img src="http://img.wanfantian.com/uploads/201708/02/ff36a720297ebad5f71901d40f5f4cfe.jpg">
                    <span>¥9.90起</span>
                    <p>奥山小鬼帮帮团之极速前进</p>
                </a>
            </li>
        </ul>
        <mt-cell title="热门精选"></mt-cell>
        <ul class="hot_list">
            <li class="page-lazyload-listitem" v-for="item in list">
                <img v-lazy="item" class="page-lazyload-image">
            </li>
        </ul>
        <Foot></Foot>
    </div>
</template>
<script>
    import Banner from './banner.vue'
    import Foot from './footer.vue'
    export default{
        data(){
            return {
                list: [
                    'http://img.wanfantian.com/uploads/201708/02/2203c30f42c01473cb3a874816e315e9.jpg',
                    'http://img.wanfantian.com/uploads/201708/02/eec9bf5575fe3f9f9bd5c8cf13b14083.jpg',
                    'http://img.wanfantian.com/uploads/201708/03/6a3b89be6a1449f913891ec049e86bf3.jpg',
                    'http://img.wanfantian.com/uploads/201707/24/5a0ff73b393e129fc887366611ba78b1.png',
                    'http://img.wanfantian.com/uploads/201706/06/c8c5ae626076b0a2d999dffb72b27f8c.png',
                ]
            }
        },
        components: {
            Banner,
            Foot
        }
    }
</script>
<style lang="less">
    .info{
        padding:0.5rem 0 0.5rem 1rem;
        border: none;
        font-size:1.2rem;
        box-sizing: border-box;
        border-radius:1.5rem;
        width: 70%;
        position:absolute;
        left:15%;
        top:0.5rem;
        color: #999999;
    }

    .select_page {
        margin-top: 50px;
        margin-bottom: 65px;


        .type_list,.coupon_list{display: flex; justify-content: space-between; padding: 0; margin: 0; }
        .type_list > li{width: 16%; min-height:5rem;display: block; text-align: center;}
        .type_list li img{ width: 100%;}
        .coupon_list > li{ width: 32%; display: block;}
        .coupon_list li img{ width: 100%;}
        .coupon_list li a {display: block;
              width: 100%;
            position: relative;
        }
     .coupon_list li a span {
            padding: 0 1rem;
            height:2.4rem;
            line-height: 2.4rem;
            color: #fff;
            position: absolute;
            left:0;
            bottom:3.4rem;
            font-size: 1.2rem;
            background: #ee7e66;
        }
        .coupon_list li a p{height:2.4rem;
            font-size:1rem;
            line-height:2.4rem;
            color: #000;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;}

        .mint-cell-title {
            border-left: 0.3rem solid green;
            padding-left: 0.5rem;
            font-size: 1.4rem;
        }
        .mint-cell-wrapper {
            font-size: 1.2rem;
            background-image: none;
            padding: 0;
        }
        .mint-cell-value.is-link {
            color: green;
            margin-right: 1.2rem;
        }
        .mint-cell-allow-right::after {
            right: 0.5rem;
        }
        .hot_list{ padding: 0; margin: 0;}
        .hot_list li{ display: block}
        .hot_list li img{width: 100%;}
    }
</style>
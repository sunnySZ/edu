<template>
    <div class="select_page">
        <mt-header fixed>
            <mt-button slot="left">深圳</mt-button>
            <router-link to="/search" slot="left">
                <input class="info" type="text" placeholder="搜索商品活动或游玩地">
            </router-link>
        </mt-header>
        <Banner></Banner>
        <ul class="type_list">
            <li><img src="http://img.wanfantian.com/uploads/201706/16/bba95870ae8a27ce5f21a4571c4f66a7.png">
                <span>夏令营</span></li>
            <li><img src="http://img.wanfantian.com/uploads/201706/16/dd93350d82b61389b4f453b1c0c1ece9.png">
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
        <mt-cell title="优惠推荐" label="全年遛娃 嗨翻天！" is-link
                 :to="{ name:'home', params: { url: '/lkp/v2/movie/coming_soon?' }}"
                 value="更多"></mt-cell>
        <ul class="coupon_list">
            <li v-for="(item,index) in hotData">
                <router-link :to="{ name: 'detail',params: { id: item.id }}">
                    <img src="http://img.wanfantian.com/uploads/201707/31/107fb1575047943239a8f94675eab7d2.jpg">
                    <span>¥49.90起</span>
                    <p>顽童堡儿童主题乐园</p>
                </router-link>
            </li>
        </ul>
        <mt-cell title="热门精选" label="用心推荐 优质体验"></mt-cell>
        <ul class="hot_list">
            <li v-for="(item,index) in hotData">
                <router-link :to="{ name: 'detail',params: { id: item.id }}">
                    <img src="http://img.wanfantian.com/uploads/201708/02/2203c30f42c01473cb3a874816e315e9.jpg"/>
                    <aside class="aside">
                        <p>超燃丨加拿大互动亲子剧《你是演奏家》</p>
                        <span>返利18元</span>
                        <span>分享有礼</span>
                        <span>点评有礼</span>
                    </aside>
                    <span class="price">￥<mark>120.00</mark>起</span>
                    <span class="num">已售94份</span>
                </router-link>
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
                hotData:[{"id":1},{"id":2},{"id":3}]
            }
        },
        components: {
            Banner,
            Foot
        }
    }
</script>
<style lang="less">
    .info {
        border: none;
        font-size: 12px;
        padding-left: 3rem;
        box-sizing: border-box;
        border-radius: 15px;
        width: 76%;
        position: absolute;
        left: 12%;
        top: 6px;
        color: #999999;
        height: 28px;
        line-height: 28px;
    }

    .select_page {
        margin-top: 40px;
        margin-bottom: 65px;
        .type_list, .coupon_list {
            display: flex;
            justify-content: space-around;
            margin: 0;
            padding: 0;
            background-color: white;
        }
        .type_list {
            padding: 1rem 0;
        }
        .type_list > li {
            width: 16%;
            min-height: 5rem;
            display: block;
            text-align: center;
        }
        .type_list li img {
            width: 100%;
        }
        .coupon_list > li {
            width: 30%;
            display: block;
        }
        .coupon_list li img {
            width: 100%;
        }
        .coupon_list li a {
            display: block;
            width: 100%;
            position: relative;
        }
        .coupon_list li a span {
            padding: 0 1rem;
            height: 2.4rem;
            line-height: 2.4rem;
            color: #fff;
            position: absolute;
            left: 0;
            bottom: 3.4rem;
            font-size: 1.2rem;
            background: #ee7e66;
        }
        .coupon_list li a p {
            height: 2.4rem;
            font-size: 1rem;
            line-height: 2.4rem;
            color: #000;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
        .mint-cell {
            margin-top: 1rem;
            min-height: 3.2rem;
        }
        .mint-cell-label {
            display: inline;
            color: #c4babd;
            font-size: 1.2rem;
            padding-left: 0.5rem;
            margin-left: 0.5rem;
            border-left: 1px solid #ccc;
        }
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
        .hot_list {
            padding: 0;
            margin: 0;
        }
        .hot_list li {
            display: block;
            margin-bottom: 1rem;
            position: relative;
            background-color: white;
            padding-bottom: 0.5rem;
        }
        .hot_list li a img {
            width: 100%;
        }
        .hot_list li a .aside {
            font-size: 1.4rem;
            line-height: 2.2rem;
            padding-left: 1rem;
            color: #000000;
            font-size: 1.4rem;
        }
        .hot_list li a .aside span {
            font-size: 1rem;
            padding: 0.1rem 0.3rem;
            border: 1px solid #fa6e51;
            border-radius: 0.3rem;
            color: #fa6e51;
        }
        .hot_list li a .price {
            font-size: 1.2rem;
            padding: 0.2rem 0.5rem;
            background: rgba(0, 0, 0, 0.6);
            color: #ffffff;
            position: absolute;
            bottom: 7rem;
            left: 0;
        }
        .hot_list li a .price mark {
            font-size: 2.4rem;
            background: none;
            color: #ffffff;
        }
        .hot_list li a .num {
            border-radius: 1rem 0 0 1rem;
            padding: 0.2rem 1rem;
            font-size: 1.2rem;
            position: absolute;
            bottom: 6rem;
            right: 0;
            background: rgba(0, 0, 0, 0.6);
            color: #ffffff;
        }
    }
</style>
<template>
    <div class="select_page">
        <mt-header fixed>
            <mt-button slot="left">深圳</mt-button>
            <router-link to="/search" slot="left">
                <input class="info" type="text" placeholder="搜索商品活动或游玩地">
            </router-link>
        </mt-header>
        <SelectBanner></SelectBanner>
        <SelectType></SelectType>
        <mt-cell title="优惠推荐" label="全年遛娃 嗨翻天！" is-link
                 :to="{ name: 'discover',params: { type: 'more' }}"
                 value="更多"></mt-cell>
        <ul class="coupon_list">
            <li v-for="(item,index) in recommendData">
                <router-link :to="{ name: 'detail',params: { id: item.ID }}">
                    <img :src="item.S_PIC">
                    <span>¥49.90起</span>
                    <p>{{item.NAME}}</p>
                </router-link>
            </li>
        </ul>
        <mt-cell title="热门精选" label="用心推荐 优质体验"></mt-cell>
        <ul class="hot_list" v-infinite-scroll="loadMore" infinite-scroll-disabled="allLoaded"
            infinite-scroll-distance="50">
            <li v-for="(item,index) in hotData">
                <router-link :to="{ name: 'detail',params: { id: item.ID }}">
                    <img :src="item.S_PIC"/>
                    <aside class="aside">
                        <p>{{item.NAME}}</p>
                        <span>返利18元</span>
                        <span>分享有礼</span>
                        <span>点评有礼</span>
                    </aside>
                    <span class="price">￥<mark>{{item.PRICE}}</mark>起</span>
                    <span class="num">已售94份</span>
                </router-link>
            </li>
        </ul>
        <p v-show="listLoading" class="loading">
            <mt-spinner type="fading-circle"></mt-spinner>
            loading...
        </p>
        <Foot></Foot>
    </div>
</template>
<script>
    import SelectBanner from './select_banner.vue'
    import SelectType from './select_type.vue'
    import Foot from './footer.vue'

    export default {
        data() {
            return {
                listLoading: false,//加载中
                allLoaded: false, //默认下拉数据加载完毕，不调用loadBottom方法
                recommendData: [],
                hotData: [],
                params: {
                    curPage: 1,
                    pageSize: 5
                },
                listType: 7  //热门精选
            }
        },
        created() {
            this.getDataList();
        },
        methods: {
            getDataList() {
                var _this = this
                let httpArr = [
                    _this.$http.get('yjt/shopgoods/pagelistbytype/1-3-6'), //推荐活动
                    _this.$http.get('yjt/shopgoods/pagelistbytype/1-5-7')  //热门精选
                ]

                _this.$http.all(httpArr)
                    .then(_this.$http.spread(function (data1, data2) {
                        _this.recommendData = data1.data.list;
                        _this.hotData = data2.data.list;
                        console.log(data1.data)
                        console.log(data2.data)
                    }));
            },
            loadMore() {
                //isRefresh,bool==true是下拉刷新，false表示是上拉加载更多
                if (this.listLoading) return;
                this.listLoading = true;
                let url = 'yjt/shopgoods/pagelistbytype/' + this.params.curPage + '-' + this.params.pageSize + '-' + this.listType
                this.$http.get(url).then((res) => {
                    this.listLoading = false;
                    this.params.curPage += 1
                    if (this.params.curPage > res.data.totalPage) {
                        this.allLoaded = true;
                        this.$toast('没有更多了...')
                    }
                    this.hotData = this.hotData.concat(res.data.list)
                }).catch((err) => {
                    //上下拉loading动画关闭
                    //   this.$indicator.close();//隐藏loading
                    this.listLoading = true;
                    console.log(err)
                });
            }
        },
        components: {
            SelectBanner,
            SelectType,
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
        width: 74%;
        position: absolute;
        left: 13%;
        top: 6px;
        color: #999999;
        height: 28px;
        line-height: 28px;
        background: #ffffff url("../assets/icon1.png") no-repeat;
        background-position: 0 30%;
    }

    .loading {
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
    .loading div {
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
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

    }
</style>
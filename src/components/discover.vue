<template>
    <div class="discover_page">
        <div class="head" v-if="typeListData[listType-1]">
            <img :src="typeListData[listType-1].B_IMAGE"/>
            <p> {{typeListData[listType - 1].TYPE_ID}} ---- {{typeListData[listType - 1].T_DESC}}</p>
        </div>
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
            <mt-spinner color="#26a2ff" type="fading-circle"></mt-spinner>
        </p>
        <p v-show="nodata" class="nodata">暂无数据!</p>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                listLoading: false,//加载中
                allLoaded: false, //默认下拉数据加载完毕，不调用loadBottom方法
                nodata:false,
                listType: this.$route.params.type, //通过路由获取类别
                hotData: [],
                typeListData: JSON.parse(sessionStorage.getItem('typeListData')),
                params: {
                    curPage: 1,
                    pageSize: 5
                },
            }
        },
/*        activated(){
            console.log(123)
            this.nodata=false;
            this.hotData=[];
            this.params.curPage=1;
            this.listType= this.$route.params.type
            this.loadMore();
        },*/
        methods: {
            loadMore() {
                console.log(11)
                if (this.listLoading) return;
                this.listLoading = true;
                let url = 'yjt/shopgoods/pagelistbytype/' + this.params.curPage + '-' + this.params.pageSize + '-' + this.listType;
                this.$http.get(url).then((res) => {
                    console.log(22)
                   if(res.data.totalRow==0){
                       console.log(111)
                       this.nodata=true;
                   }
                    this.listLoading = false;
                    this.params.curPage += 1;
                    if (this.params.curPage > res.data.totalPage) {
                        this.allLoaded = true;
                        // this.$toast('没有更多了...')
                    }
                    this.hotData = this.hotData.concat(res.data.list)
                }).catch((err) => {
                    this.listLoading = false;
                });
            }
        },
        components: {}
    }
</script>
<style lang="less">
    .nodata {
        text-align: center;
        padding: 1rem;
    }

    .discover_page {
        .head {
            background-color: white;
            margin-bottom: 1rem;
        }
        .head img {
            width: 100%;
        }
        .head p {
            line-height: 2rem;
            padding: 1rem;
            font-size: 1.2rem;
        }
        .hot_list li {
            border-radius: 0.5rem 0.5rem;
            margin: 1rem;
        }
        .hot_list li img {
            border-radius: 0.5rem 0.5rem 0 0;
        }
    }
</style>
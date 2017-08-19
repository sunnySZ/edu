<template>
    <div class="search_page">
        <mt-header fixed>
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <router-link to="/search" slot="left">
                <input class="info" type="text" placeholder="搜索商品活动或游玩地" v-model="val">
            </router-link>
            <mt-button slot="right" @click="handleSearch(false)">搜索</mt-button>
        </mt-header>

        <div class="search_history" v-show="historyShow">
            <h2>搜索记录</h2>
            <mt-cell v-for="item in searchHistory" :title="item" @click.native="handleSearch(item)"></mt-cell>
            <mt-button plain size="large" type="primary" @click.native="clearHistory">清空搜索记录</mt-button>
        </div>

        <div class="search_result">
            <ul class="list_box" v-infinite-scroll="loadMore" infinite-scroll-disabled="allLoaded"
                infinite-scroll-distance="50">
                <li v-for="item in searchData">
                    <router-link :to="{ name: 'detail',params: { id: item.ID }}">
                        <div class="list_item">
                            <div class="img_box"><img :src="item.S_PIC" />
                            </div>
                            <div class="ticket_msg">
                                <span class="title">{{item.NAME}}</span>
                                <p>￥<span class="price">{{item.PRICE}}</span></p>
                                <p>已售{{item.SALES_NUM}}份 <span class="address">{{item.ADRESS}}</span></p></div>
                        </div>
                    </router-link>
                </li>
            </ul>
            <p v-show="listLoading" class="loading">
                <mt-spinner type="fading-circle"></mt-spinner>
                loading...
            </p>
        </div>
    </div>
</template>
<script>

    export default{
        data(){
            return {
                selected: '1',
                searchHistory: JSON.parse(localStorage.getItem('search_list')) || [],
                historyShow: false,
                listLoading: false,//加载中
                allLoaded: false, //默认下拉数据加载完毕，不调用loadBottom方法
                searchData:[],
                val: '',
                params: {
                    curPage: 1,
                    pageSize: 10,
                    kw: ''  //搜索关键词
                }
            }
        },
        created(){
            if (this.searchHistory.length > 0) {
                this.historyShow = true;
            } else {
                this.historyShow = false;
            }
        },
        methods: {
            clearHistory(){
                localStorage.removeItem('search_list');
                this.historyShow = false;
            },
            loadMore() {
                if (this.listLoading || this.val=='') return;
                this.listLoading = true;
                this.params.curPage += 1
                var url = 'yjt/shopgoods/pagelist/' + this.params.curPage + '-' + this.params.pageSize + '?kw=' + this.val;
                this.$http.get(url).then((res) => {
                    this.listLoading = false;
                    if (this.params.curPage >= res.data.totalPage) {
                        this.allLoaded = true;
                        this.$toast('全部加载完毕')
                    }
                    this.searchData = this.searchData.concat(res.data.list)
                }).catch((err) => {
                    this.listLoading = true;
                    console.log(err)
                });
            },
            handleSearch(searchval){

                if(searchval){  //点击搜索记录列表搜索
                    this.val=searchval
                }
                this.listLoading = true;
                this.historyShow = false; //隐藏搜索记录
                this.allLoaded = false;
                this.searchData=[];//重置搜索
              //  this.$indicator.open();//显示loading
                if (this.val !== '') {
                    if (this.searchHistory.length > 0) {
                        for (var i = 0; i < this.searchHistory.length; i++) {
                            if (this.searchHistory.indexOf(this.val) < 0) {
                                this.searchHistory.push(this.val)
                            }
                        }
                    } else {
                        this.searchHistory.push(this.val)
                    }
                    console.log(this.searchHistory)
                    //搜索记录存储
                    localStorage.setItem("search_list", JSON.stringify(this.searchHistory));
                    this.params.curPage =1
                    var url = 'yjt/shopgoods/pagelist/' + this.params.curPage + '-' + this.params.pageSize + '?kw=' + this.val;
                    this.$http.get(url).then((res) => {
                        this.listLoading = false;
                     //   this.$indicator.hide()//隐藏loading
                       if(res.data.list.length>0){
                           this.searchData =res.data.list
                       }else{
                           this.$toast('暂无您搜索的内容')
                       }
                    }).catch((err) => {
                        this.listLoading = true;
                        console.log(err)
                    });
                    console.log('请求数据')
                } else {
                    this.$toast('请输入搜索内容')
                    //   console.log('请输入搜索内容')
                }
            }
        }

    }
</script>
<style lang="less">
    .search_page {
        margin-top: 50px;
        h2{ padding:1rem;}
        .mint-button--primary.is-plain{ margin: 5%;  width: 90%;}
    }
</style>
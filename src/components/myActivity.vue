<template>
    <div class="myActivity_page">
        <mt-navbar v-model="selected" fixed>
            <mt-tab-item id="1">进行中活动</mt-tab-item>
            <mt-tab-item id="2">已下架活动</mt-tab-item>
        </mt-navbar>
        <ul class="list_box">
            <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore"
                         :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" topLoadingText="加载中...">
                <li v-for="(item,index) in activityData">
                    <router-link :to="{ name: 'myActivityInfo',params: { id: item.ID }}">
                   <div class="list_item">
                       <div class="img_box"><img :src="item.S_PIC"></div>
                       <div class="ticket_msg">
                           <span class="title">{{item.NAME}}</span>
                           <p><span class="price">{{item.PRICE}}</span><del>150.00</del></p>
                           <p>已售12份 <span class="address">江汉路步行街</span></p></div>
                   </div>
                </router-link>
            </li>
            </mt-loadmore>
        </ul>
        <Foot></Foot>
    </div>
</template>
<script>
    import Foot from './footer.vue'
    export default{
        data(){
            return {
                selected: '1',//默认空不设置tab高亮
                listLoading: false,//加载中
                allLoaded: true,//默认下拉数据加载完毕，不调用loadBottom方法
                activityData: [],
                topStatus: '',
                params: {
                    curPage: 1,
                    pageSize: 5
                },
                listType: 6  //活动
            }
        },
        created(){
            this.$indicator.open();
            //初始化刷新请求数据
            this.getData(true)
        },
        methods: {
            getData(isRefresh){
                //isRefresh,bool==true是下拉刷新，false表示是上拉加载更多
                if (this.listLoading) return;
                this.listLoading = true;
                if (isRefresh) {
                    this.params.curPage = 1
                } else {
                    this.params.curPage += 1
                }
                let url = 'yjt/shopgoods/pagelistbytype/' + this.params.curPage + '-' + this.params.pageSize + '-' + this.listType;
                this.$http.get(url).then((res) => {
                    this.listLoading = false;
                    if (this.params.curPage >= res.data.totalPage) {
                        this.allLoaded = true;
                        this.$toast('没有更多了...')
                    } else {
                        this.allLoaded = false;
                    }
                    if (isRefresh) {
                        this.activityData = res.data.list
                        this.$indicator.close();//隐藏loading
                        this.$refs.loadmore.onTopLoaded();//关闭下拉loading动画
                    } else {
                        this.activityData = this.activityData.concat(res.data.list)
                        this.$refs.loadmore.onBottomLoaded();//关闭上拉loading动画
                    }
                }).catch((err) => {
                    //上下拉loading动画关闭
                    if (isRefresh) {
                        this.$indicator.close();//隐藏loading
                        this.$refs.loadmore.onTopLoaded();
                    } else {
                        this.$refs.loadmore.onBottomLoaded();
                    }
                    console.log(err)
                });

            },
            loadTop(){
                //下拉刷新数据
                this.getData(true)
            },
            handleTopChange(status){
                this.topStatus = status;
            },
            loadBottom(){
                //上拉加载更多
                if (this.listLoading) {
                    this.$refs.loadmore.onBottomLoaded();
                } else {
                    this.allLoaded = true;
                    this.getData(false)
                }
            }
        },
        components: {
            Foot
        }
    }
</script>
<style lang="less">
    .myActivity_page {
        margin-top: 60px;
        margin-bottom: 56px;
        .list_box{}
    .list_box li{ display: block; padding: 1rem;border-bottom: 1px solid #e5e5e5; }
    .list_box li a{color: #bbbbbb;}
    .list_item{ display: flex;}
    .img_box{ flex:1;}
    .img_box img{ width: 100%;}
    .ticket_msg{ flex: 3; padding-left: 1rem;}
    .ticket_msg .title{ font-size: 1.4rem; color:#000000;}
    .ticket_msg p{ line-height: 1.4rem;}
    .ticket_msg .price{ font-size: 1.6rem; color: #fa6e51; padding-right: 1rem;}
    .ticket_msg .address{ padding-left: 5rem;}
        .mint-navbar.is-fixed {
            z-index: 3000;
        }
    }
</style>
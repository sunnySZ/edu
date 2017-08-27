<template>
    <div class="activity_page">
        <ul class="hot_list">
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore"
                       :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" topLoadingText="加载中...">
            <li v-for="(item,index) in activityData">
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
          </mt-loadmore>
        </ul>
        <!--<ul class="hot_list" v-infinite-scroll="loadMore" infinite-scroll-disabled="allLoaded"
            infinite-scroll-distance="50">
            <li v-for="(item,index) in activityData">
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
        </p>-->
        <Foot></Foot>
    </div>
</template>
<script>
   // let wx=require('http://res.wx.qq.com/open/js/jweixin-1.2.0.js') ;
   // console.log(wx)
    import Foot from './footer.vue'
    export default{
        data(){
            return {
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

           /* wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: '', // 必填，公众号的唯一标识
                timestamp: , // 必填，生成签名的时间戳
                nonceStr: '', // 必填，生成签名的随机串
                signature: '',// 必填，签名，见附录1
                jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });*/

            /*wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                }
            });*/
        },
        methods: {
           /* loadMore(){
                //isRefresh,bool==true是下拉刷新，false表示是上拉加载更多
                if (this.listLoading) return;
                this.listLoading = true;
                let url = 'yjt/shopgoods/pagelistbytype/' + this.params.curPage + '-' + this.params.pageSize + '-' + this.listType;
                this.$http.get(url).then((res) => {
                    this.listLoading = false;
                    this.params.curPage += 1
                    if (this.params.curPage > res.data.totalPage) {
                        this.allLoaded = true;
                        // this.$toast('没有更多了...')
                    }
                    this.activityData = this.activityData.concat(res.data.list)
                }).catch((err) => {
                    this.listLoading = false;
                    console.log(err)
                });
            },*/
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
        /*watch: {
         selected(curVal, oldVal){
         console.log(curVal)
         this.$indicator.open()
         setTimeout(() => {
         this.$indicator.close()
         }, 1000)
         }
         },*/
        components: {
            Foot
        }
    }
</script>
<style lang="less">
    .activity_page {
        margin-bottom: 56px;
    }
</style>
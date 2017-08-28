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
    import wx from 'weixin-js-sdk'
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
                    pageSize: 5,
                    lat: 22.67165,
                    lng: 114.014654,
                    dis: 0.5,
                },
                listType: 6  //活动
            }
        },
        mounted(){
            this.getSign();
        },
        created(){

        },
        methods: {
            getSign(){
                var url = window.location.href.split("#")[0];
                this.$http.get("yjt/weixin/weixinJsConfigSign?url=" + url).then((res) => {
                    this.wxInit(res.data.result);
                });
            },
            wxInit(sd){
                var _this = this;
                wx.config({
                    debug: false,
                    appId: sd.appid,
                    timestamp: sd.timestamp,
                    nonceStr: sd.nonce_str,
                    signature: sd.sign,
                    jsApiList: [
                        'getLocation',
                    ]
                });
                wx.ready(function () {
                    wx.getLocation({
                        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: function (res) {
                            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                            var speed = res.speed; // 速度，以米/每秒计
                            var accuracy = res.accuracy; // 位置精度
                            _this.params.lat = latitude;
                            _this.params.lng = longitude;
                            alert('您的位置是'+_this.params.lat+','+ _this.params.lng);
                            //初始化刷新请求数据
                            _this.$indicator.open();
                            _this.getData(true)
                        },
                        fail:function(){
                            alert("请开启微信位置权限")
                        },
                        cancel: function () {
                            alert("请同意获取地理位置")
                            // 这个地方是用户拒绝获取地理位置
                        }
                    })
                });
                wx.error(function (res) {
                    alert(res+'error')
                    // alert("error")
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });

            },
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
                //   附近活动列表 {当前页}-{每页显示条数}   dis单位千米 0.5表示500米内的活动
                // yjt/shopgoods/nearbypagelist/1-5?lat=22.67165&lng=114.014654&dis=0.5
                let url = 'yjt/shopgoods/nearbypagelist/' + this.params.curPage + '-' + this.params.pageSize;
                this.$http.get(url, {
                    params: {
                        lat: this.params.lat,
                        lng: this.params.lng,
                        dis: this.params.dis
                    }
                }).then((res) => {
                    this.$indicator.close()
                    let lists = res.data.list;
                    this.listLoading = false;
                    if (lists.length > 0) {
                        if (this.params.curPage >= res.data.totalPage) {
                            this.allLoaded = true;
                            if (this.params.curPage != 1) {
                                this.$toast('没有更多了...')
                            }
                        } else {
                            this.allLoaded = false;
                        }
                        if (isRefresh) {
                            this.activityData = lists
                          //  this.$indicator.close();//隐藏loading
                            this.$refs.loadmore.onTopLoaded();//关闭下拉loading动画
                        } else {
                           this.activityData = this.activityData.concat(lists)
                            this.$refs.loadmore.onBottomLoaded();//关闭上拉loading动画
                        }
                    }else{
                        this.$toast('暂无附近活动数据')
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
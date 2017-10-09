<template>
    <div class="activity_page">
        <ul class="sortItem">
            <li><span>年龄：</span>
                <a v-for="(item, index) in agelist"
                   :class="{'cur':ind1 === index}"
                   @click="select_age(index)">{{item}}</a>
            </li>
            <li><span>距离：</span>
                <a v-for="(item, index) in dislist"
                   :class="{'cur':ind2 === index}"
                   @click="select_dis(index)">{{item}}</a>
            </li>
            <li><span>价格：</span><a val="">全部</a><input/>-<input/>元</li>
            <li><span></span>
                <a v-for="(item, index) in sortlist"
                   :class="{'cur':ind3 === index}"
                   @click="select_sort(index)">{{item}}</a>
                <mt-button size="small" type="primary" @click.native="handleButtonClick">查询</mt-button>
            </li>
        </ul>
        <!--<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore"
                     :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" topLoadingText="加载中...">
        </mt-loadmore>-->
        <ul class="hot_list">
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
                agelist: ['全部', '0-2岁', '2-4岁', '4-6岁', '6-12岁'],
                ind1: '0',
                dislist: ['全部', '500米', '1000米', '2000米', '5000米'],
                ind2: '0',
                sortlist: ['按人气', '按价格', '上架时间'],
                ind3: '0',
                listLoading: false,//加载中
                allLoaded: true,//默认下拉数据加载完毕，不调用loadBottom方法
                activityData: [],
                topStatus: '',
                params: {
                    kw: "",
                    agetag: "",
                    tsort: 1,
                    psort: 1,
                    curPage: 1,
                    pageSize: 10,
                    lat: 22.67165,
                    lng: 114.014654,
                    dis: 5000,
                    pricestart: '',
                    priceend: ''
                },
                listType: 6  //活动
            }
        },
        mounted(){
              this.getSign();
        },
        created(){
          //  this.getData(true)
        },
        methods: {
            select_age: function (index) {
                this.ind1 = index;
                switch (index) {
                    case 0:
                        this.params.agetag = "";
                        break;
                    case 1:
                        this.params.agetag = "0,2";
                        break;
                    case 2:
                        this.params.agetag = "2,4";
                        break;
                    case 3:
                        this.params.agetag = "4,6";
                        break;
                    case 4:
                        this.params.agetag = "6,12";
                        break;
                }
            },
            select_dis: function (index) {
                this.ind2 = index;
                switch (index) {
                    case 0:
                        this.params.dis = "5000";
                        break;
                    case 1:
                        this.params.dis = "0.5";
                        break;
                    case 2:
                        this.params.dis = "1";
                        break;
                    case 3:
                        this.params.dis = "2";
                        break;
                    case 4:
                        this.params.dis = "5";
                        break;
                }
            },
            select_sort: function (index) {
                this.ind3 = index;
                switch (index) {
                    case 0:
                        this.params.psort =1;
                        break;
                    case 1:
                        this.params.psort = 3;
                        break;
                    case 2:
                        this.params.psort = 2;
                        break;
                }
            },
            handleButtonClick(){
                this.getData(true)
            },
            getSign(){
                //http://www.youertong.cn/index.html#/select/
                //http://www.youertong.cn/index.html?from=singlemessage&isappinstalled=0#/select/
                //var url = encodeURIComponent(window.location.href.split("#")[0]);
                var url = window.location.href.split("#")[0];
                this.$http.get("yjt/weixin/weixinJsConfigSign?url=" + encodeURIComponent(url)).then((res) => {
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
                        'getLocation'
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
                            // alert('您的位置是'+_this.params.lat+','+ _this.params.lng);
                            //初始化刷新请求数据
                            _this.$indicator.open();
                            _this.getData(true)
                        },
                        fail: function () {
                            //  alert("请开启微信位置权限")
                        },
                        cancel: function () {
                            alert("请同意获取地理位置")
                            // 这个地方是用户拒绝获取地理位置
                        }
                    })
                });
                wx.error(function (res) {
                    //  alert(res+'error')
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

                /*活动搜索列表
                 {当前页}-{每页显示条数} kw=搜索关键词  agetag年龄标签  value值  多个 用逗号分隔
                 tsort:1降序 2为升序
                 psort:1人气  2上架时间 3价格
                 dis单位千米 0.5表示500米内的活动
                 pricestart:开始价格
                 priceend:结束价格*/
                //       http://121.40.154.136/yjt/shopgoods/pagelist/1-5?kw=西&agetag=0,2&tsort=1&psort=1&lat=22.67165&lng=114.014654&dis=0.5&pricestart=1&priceend=8

                this.$indicator.open();
                this.$http.get(url, {
                    params: {
                        kw: this.params.kw,
                        agetag: this.params.agetag,
                        tsort: this.params.tsort,
                        psort: this.params.psort,
                        lat: this.params.lat,
                        lng: this.params.lng,
                        dis: this.params.dis
                    }
                }).then((res) => {
                    this.$indicator.close()
                    let lists = res.data.list;
                    this.listLoading = false;
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

                    } else {
                        this.activityData = this.activityData.concat(lists)

                    }
                }).catch((err) => {

                    console.log(err)
                });

            },
        },
        /*watch: {
         selected(curVal, oldVal){

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
        padding-top: 11rem;
        .sortItem {
            padding: 0.5rem 1rem;
            background-color: white;
            position: fixed;
            width: 100%;
            left: 0;
            top: 0;
            z-index: 100;
            height: 10rem;
        }
        .sortItem li {
            list-style: none;
            position: relative;
            padding-left: 3rem;
            line-height: 2rem;
            margin-bottom: 0.5rem;
        }
        .sortItem li span {
            position: absolute;
            left: 0;
            top: 0;
            width: 3rem;
        }
        .sortItem li a {
            display: inline-block;
            padding: 0 0.5rem;
        }
        .sortItem li a.cur {
            background-color: #fa6e51;
            color: white;
        }
        .sortItem li input {
            width: 4rem;
            margin: 0 0.5rem;
        }
        .mint-button--small {
            height: 28px;
            padding: 5px 10px;
            margin-left: 3rem;
        }
    }
</style>
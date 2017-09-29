<template>
    <div class="age_page">
        <!--  <p v-show="listLoading" class="loading">
              <mt-spinner color="#26a2ff" type="fading-circle"></mt-spinner>
          </p>-->
        <mt-navbar class="page-part" v-model="selected" fixed>
            <mt-tab-item v-for="(item,index) in tagData" :id="index+1">{{item.NAME}}</mt-tab-item>
        </mt-navbar>
        <ul class="hot_list">
            <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore"
                         :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" topLoadingText="加载中...">
                <li v-for="(item,index) in tabData">
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


        <Foot></Foot>
    </div>
</template>
<script>
    import Foot from './footer.vue'
    export default{
        data(){
            return {
                listLoading: false,
                allLoaded: true,//默认下拉数据加载完毕，不调用loadBottom方法
                selected: 1,
                nodata: false,
                params: {
                    curPage: 1,
                    pageSize: 5
                },
                tagData: [],
                tabData: [],
                agetags: "0,2"
            }
        },
        watch: {
            selected(curVal, oldVal){
                switch (curVal) {
                    case 1:
                        this.agetags = "0,0.5";
                        break;
                    case 2:
                        this.agetags = "0.5,1";
                        break;
                    case 3:
                        this.agetags = "1,2";
                        break;
                    case 4:
                        this.agetags = "2,3";
                        break;
                    case 5:
                        this.agetags = "3,6";
                        break;
                    case 6:
                        this.agetags = "6,12";
                        break;
                }
                //初始化数据
                this.tabData = [];
                this.nodata = false;
                this.$indicator.open();
                this.getData(true)
            }
        },
        created(){
            this.getAgelist();
        },
        methods: {
            getAgelist(){
                this.$indicator.open();
                //  this.listLoading=true; //控制
                let httpArr = [
                    this.$http.get('yjt/shopgoods/agetaglist'), //年龄标签
                    this.$http.get('yjt/shopgoods/pagelist/1-5?agetag=0,2&tsort=1&psort=1') //年龄商品搜索
                ];
                //  var url = 'yjt/shopgoods/agetaglist';
                this.$http.all(httpArr).then(this.$http.spread((data1, data2) => {
                    this.$indicator.close();
                    this.tagData = data1.data;
                    this.tabData = data2.data.list;
                    //      this.listLoading=false;
                }));
            },
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
                let url = 'yjt/shopgoods/pagelist/' + this.params.curPage + '-' + this.params.pageSize + '?agetag=' + this.agetags + '&tsort=1&psort=1';
                this.$http.get(url).then((res) => {
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
                        this.tabData = lists
                        //  this.$indicator.close();//隐藏loading
                        this.$refs.loadmore.onTopLoaded();//关闭下拉loading动画
                    } else {
                        this.tabData = this.tabData.concat(lists)
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
    .age_page {

        padding-top: 60px;
        padding-bottom: 56px;

    }
</style>
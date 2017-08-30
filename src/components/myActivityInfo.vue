<template>
    <div class="myActivityInfo_page" v-if="detailData">
        <div class="wrap_top">
            <img :src="detailData.B_IMAGE"/>
            <h2>{{detailData.NAME}}</h2>
            <p class="txt_msg">{{detailData.DETAILS}}</p>
            <div class="wrap_msg">
                <span class="low_price">金额￥<mark>{{detailData.PRICE}}</mark></span>
                <span class="apply_num">参与人数{{detailData.SALED_NUM}}人</span>
            </div>
            <mt-cell title="负责人：" :value="detailData.TEL"></mt-cell>
            <mt-cell title="开始日期：" :value="detailData.START_DATE"></mt-cell>
            <mt-cell title="结束日期：" :value="detailData.END_DATE"></mt-cell>
        </div>
        <div class="wrap_place">
            <p>参与人员</p>
            <mt-cell v-for="item in fansData" :title="item.NICK_NAME">
                <span>{{item.MOBILE}}</span>
                <img slot="icon" :src="item.HEAD_IMGURL" width="32" height="32">
            </mt-cell>
            <p v-show="isLoading" class="loading">
                <mt-spinner type="fading-circle"></mt-spinner>
            </p>
            <div class="get_more" @click="getMorePerson" v-show="isMore">点击查看更多</div>
            <!--<ul class="joinList">
                <li v-for="item in fansData"><img src="../assets/user_default.png" /><span>{{item.NICK_NAME}}</span> </li>
                <li class="get_more" @click="getMorePerson" v-show="isMore"><span>更多</span></li>
            </ul>-->
        </div>
        <Foot></Foot>
    </div>
</template>
<script>
    import Foot from './footer.vue'
    export default{
        data(){
            return {
                id: '',
                status: 1,  //订单状态
                isMore: false,
                isLoading: false,
                detailData: null,
                fansData: null,
                params: {
                    curPage: 1,
                    pageSize: 5
                }
            }
        },
        created(){
            this.getData();
        },
        methods: {
            getData(){
                this.$indicator.open();
                this.id = this.$route.params.id;
                this.status = this.$store.state.my_status;
                let httpArr = [
                    this.$http.get('yjt/shopgoods/getGoodsUsers?goods_id=' + this.id), //我的活动详情
                    this.$http.get('yjt/shopgoods/getGoodsUsersCount/1-5?goods_id=' + this.id + '&state=' + this.status),  //参与人员列表
                ];

                this.$http.all(httpArr).then(this.$http.spread((data1, data2) => {
                    this.$indicator.close();//隐藏loading
                    this.detailData = data1.data.result.goods;

                    this.fansData=data1.data.result.fans.list;



                    //this.fansData = data2.data.result.list;



                    /*if(res.data.code=='200'){
                     let fans=res.data.result.fans;

                     /!*  this.fansData=fans.list;
                     if(fans.totalPage>1){
                     this.isMore=true;
                     }*!/


                     }else{ //返回失败
                     this.$toast(res.data.msg)
                     }*/
                }));
            },
            getMorePerson(){
                //加载更多人员
                this.isLoading = true;
                this.params.curPage += 1;
                //http://youertong.cn/yjt/shopgoods/getGoodsUsersCount/页码-每页条数?goods_id=&state=
                let url = 'yjt/shopgoods/getGoodsUsersCount/' + this.params.curPage + '-' + this.params.pageSize + '?goods_id=' + this.id + '&state=' + this.status;
                this.$http.get(url).then((res) => {
                    if (res.data.code == '200') {  //返回成功
                        this.isLoading = false;
                        let lists = res.data.result.list;
                        let totalPage = res.data.result.totalPage;
                        if (this.params.curPage >= totalPage) {
                            this.isMore = false;
                            this.$toast('已全部加载完毕')
                        }
                        this.fansData = this.fansData.concat(lists)
                    } else { //返回失败
                        this.$toast('数据返回失败')
                    }
                }).catch((err) => {
                    this.isLoading = false;
                    this.$toast('订单列表' + err)
                });
            }

        },
        components: {
            Foot
        }
    }
</script>
<style lang="less">
    .myActivityInfo_page {
        margin-bottom: 60px;
        .wrap_msg {
            font-size: 1.4rem;
        }
        .wrap_place .mint-cell-title {
            padding: 0;
        }
        .mint-cell img {
            border-radius: 50%;
        }
        /*.joinList{width: 100%; display: flex; justify-content: flex-start; align-items: center;}
        .joinList li{ display: block;width: 20%; text-align: center;}
        .joinList li img{ width:80%; margin: 0 auto;}*/
    }
</style>
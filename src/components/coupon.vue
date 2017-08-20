<template>
    <div class="coupon_page">
        <mt-field placeholder="请输入可兑换邀请码" v-model="couponCode">
            <mt-button size="small" type="primary" @click.native="exChange">兑换</mt-button>
        </mt-field>
        <mt-cell v-for="item in couponData" title="优惠券标题" :label="item.CODE" :value="item.EXPIRE_TIME">
            <span>{{item.ADD_TIME}}</span>
        </mt-cell>
        <p v-show="isLoading" class="loading">
            <mt-spinner type="fading-circle"></mt-spinner>
        </p>
        <div class="get_more" @click="getMoreData" v-show="isMore">点击查看更多</div>
        <p v-show="nodata" class="no_data">暂无数据!</p>
        <Foot></Foot>
    </div>
</template>
<script>
    import Foot from './footer.vue'
    export default{
        data(){
            return {
                couponCode: '',
                isLoading: false,
                nodata: false,
                isMore: false,
                couponData: [], //
                params: {
                    curPage: 1,
                    pageSize: 5,
                }
            }
        },
        created(){
            this.getData();
        },
        methods: {
            getData(){
                this.$indicator.open();
                this.params.curPage = 1;//初始化 ，兑换调用后点击更多
                let url = 'yjt/buscashdetail/pagelist/1-5 '; // 优惠券列表  当前页-每页条数
                this.$http.get(url).then((res) => {
                    let lists = res.data.list;
                    let totalPage = res.data.totalPage;
                    if (lists.length > 0) {
                        this.couponData = lists;
                        if (totalPage > 1) {  //判断是否显示点击查看更多
                            this.isMore = true;
                        }
                    } else { //显示暂无数据
                        this.nodata = true;
                    }
                    this.$indicator.close();
                }).catch((err) => {
                    this.$indicator.close();
                });

            },
            exChange(){
                /*59m14v8t
                 979Kgvz1
                 3435XZ15
                 fq07WN6J
                 jcmcE93q
                 F9l1HgeY
                 k724op1N
                 4h167o6Q
                 5o5NIqnU
                 U1I7076w
                 oa1M7Y7l
                 tP8r8k05
                 9212EXv7
                 D8CMShJM
                 95uO7535
                 o0s2h5P4
                 c0a6930z
                 xqN75zvF
                 4396Sr67*/
                //   yjt/buscashdetail/exchange/59m14v8t  优惠券兑换
                if (this.couponCode == '') {
                    this.$toast('请输入可兑换邀请码')
                    return
                }
                this.$indicator.open();
                // /yjt/buscashdetail/pagelist/1-5  优惠券列表  当前页-每页条数
                let url = 'yjt/buscashdetail/exchange/' + this.couponCode;
                this.$http.get(url).then((res) => {
                    if (res.data.code == '200') {
                        this.$toast('兑换成功')
                        this.getData();
                    } else {
                        this.$toast('兑换码错误')
                    }
                    this.$indicator.close();
                }).catch((err) => {
                    this.$indicator.close();
                });


            },
            getMoreData(){
                this.isLoading = true;
                this.params.curPage += 1;
                let url = 'yjt/buscashdetail/pagelist/' + this.params.curPage + '-' + this.params.pageSize;
                this.$http.get(url).then((res) => {
                    this.isLoading = false;
                    let lists = res.data.list;
                    let totalPage = res.data.totalPage;
                    if (lists.length > 0) {
                        if (this.params.curPage >= totalPage) {
                            this.isMore = false;
                            // this.$toast('没有更多了...')
                        }
                        this.couponData = this.couponData.concat(lists)
                    } else { //显示暂无数据
                        //    this.nodata = true;
                    }
                }).catch((err) => {
                });
            }
        },
        components: {
            Foot
        }
    }
</script>
<style lang="less">

    .coupon_page {
        margin-bottom: 65px;
        .mint-field {
            margin: 1rem;
            background: none;
        }
        .mint-field .mint-cell-wrapper {
            background-image: none;
        }
        .mint-field .mint-cell-value {
            background-color: white;
        }
    }
</style>
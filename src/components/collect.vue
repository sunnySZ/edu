<template>
    <div class="collect_page">

        <ul class="list_box">
            <li v-for="item in collectData">
                <router-link :to="{ name: 'detail',params: { id: item.ID }}">
                    <div class="list_item">
                        <div class="img_box"><img :src="item.S_PIC">
                        </div>
                        <div class="ticket_msg">
                            <span class="title">{{item.NAME}}</span>
                            <p><span class="price">{{item.PRICE}}</span></p>
                            <p>已售{{item.SALES_NUM}}份 <span class="address">{{item.ADRESS}}</span></p></div>
                    </div>
                </router-link>
            </li>
        </ul>

        <p v-show="isLoading" class="loading">
            <mt-spinner type="fading-circle"></mt-spinner>
        </p>
        <div class="get_more" @click="getMoreCollect" v-show="isMore">点击查看更多</div>
        <p v-show="nodata">暂无数据!</p>

    </div>
</template>
<script>
    export default{
        data(){
            return {
                isLoading: false,
                nodata: false,
                isMore: false,
                collectData: [],
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
                // yjt/goodsfavorites/pagelist/1-5  活动收藏列表  当前页-每页条数
                let url = 'yjt/goodsfavorites/pagelist/1-5';
                this.$http.get(url).then((res) => {
                    if (res.data.list.length > 0) {
                        this.collectData = res.data.list;
                        if (res.data.pageNumber > 1) {  //判断订单列表是否显示点击查看更多
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
            getMoreData(){
                this.isLoading = true;
                this.curPage += 1;
                let url = 'yjt/goodsfavorites/pagelist/' + this.params.curPage + '-' + this.params.pageSize;
                this.$http.get(url).then((res) => {
                    if (res.data.list.length > 0) {
                        this.collectData = res.data.list;
                        if (this.params.curPage >= res.data.totalPage) {
                            this.isMore = false;
                            // this.$toast('没有更多了...')
                        }
                        this.collectData = this.collectData.concat(res.data.list)
                    } else { //显示暂无数据
                        this.nodata = true;
                    }
                }).catch((err) => {
                });
            }
        }

    }
</script>
<style lang="less">

    .collect_page {

    }
</style>
<template>
    <div class="scores_page">
        <div class="scores_top">{{totalScore}}<span>积分</span>
            <a href="#" class="rules_link">积分规则</a>
        </div>
        <mt-cell v-for="(item,index) in scoresData" :key="index" :title="item.INTEGRAL_NAME"  :label="item.CREATE_TIME"  :value="item.SCORE"></mt-cell>
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
                scoresCode: '',
                isLoading: false,
                nodata: false,
                isMore: false,
                scoresData: [],
                totalScore: '0',
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
                let url = 'yjt/user/integrationpagelist/1-5 '; // 积分列表  当前页-每页条数
                this.$http.get(url).then((res) => {
                    let lists = res.data.result.page.list;
                    let totalPage = res.data.result.page.totalPage;
                    this.totalScore = res.data.result.totalScore;
                    if (lists.length > 0) {
                        this.scoresData = lists;
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
            getMoreData(){
                this.isLoading = true;
                this.params.curPage += 1;
                let url = 'yjt/user/integrationpagelist/' + this.params.curPage + '-' + this.params.pageSize;
                this.$http.get(url).then((res) => {
                    this.isLoading = false;
                    let lists = res.data.result.page.list;
                    let totalPage = res.data.result.page.totalPage;
                    if (lists.length > 0) {
                        if (this.params.curPage >= totalPage) {
                            this.isMore = false;
                            // this.$toast('没有更多了...')
                        }
                        this.scoresData = this.scoresData.concat(lists)
                    } else { //显示暂无数据
                     //   this.nodata = true;
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

    .scores_page {
        margin-bottom: 65px;
        .scores_top {
            padding: 5rem 1rem;
            text-align: center;
            background-color: #26a2ff;
            color: white;
            font-size: 3.6rem;
            position: relative;
        }
        .scores_top span {
            font-size: 1.2rem;
            padding-left: 0.5rem
        }
        .rules_link {
            position: absolute;
            right: 1rem;
            top: 1rem;
            font-size: 1.2rem;
            color: white;
        }
    }
</style>
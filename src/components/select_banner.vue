<template>
    <div class="banner_page">
        <p v-show="listLoading" class="loading">
        <mt-spinner color="#26a2ff" type="fading-circle"></mt-spinner>
        </p>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in banner" :key="index">
                <router-link :to="{ name: 'discover',params: { type: item.ID }}">
                    <img :src="item.PIC_URL"/>
                </router-link>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                listLoading: true,
                banner: []
            }
        },
        created(){
            //  this.$indicator.open('加载中...');
            this.getBanner();
        },
        methods: {
            getBanner(){
                var url = 'yjt/bannerlist';
                this.$http.get(url).then((res) => {
                    this.listLoading = false;//隐藏loading
                    this.banner = res.data;
                }).catch((err) => {
                });
            }
        }
    }
</script>
<style lang="less">
    .banner_page {
        .mint-swipe {
            height: 13rem;

        }
        .mint-swipe-item img {
            width: 100%;
        }
    }
</style>
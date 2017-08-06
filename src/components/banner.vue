<template>
    <div class="banner_page">
        <mt-swipe :auto="4000">
            <!--<mt-swipe-item v-for="(item,index) in data" :key="index">
                <div @click="bannerClick(item.id)">
                    <img :src="item.src" />
                </div>
            </mt-swipe-item>-->
            <mt-swipe-item v-for="(item,index) in banner" :key="index">
                <div @click="bannerClick(item.ID)">
                    {{item.CREATE_TIME}}---{{item.PIC_URL}}
                </div>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                banner:[],
                data: [
                    {"title": "我是图片1", "id": "1","src":"http://img.wanfantian.com/uploads/201707/28/ad607582d8aba00a6de168c9b6542c79.png"},
                    {"title": "我是图片2", "id": "2","src":"http://img.wanfantian.com/uploads/201707/31/8bb352a5c12a4a0763df56f45cba50a2.jpg"},
                    {"title": "我是图片3", "id": "3","src":"http://img.wanfantian.com/uploads/201707/28/ad607582d8aba00a6de168c9b6542c79.png"}
                ]
            }
        },
        created(){
            this.$indicator.open('加载中1...');
            this.getBanner();
        },
        methods:{
            getBanner(){
                var url = 'yjt/bannerlist';
                this.$http.get(url).then((res) => {
                    console.log(res.data)
                    this.$indicator.close();//隐藏loading
                 this.banner=res.data;
                }).catch((err) => {

                });
            },
            bannerClick(id){
                console.log(id)
                // this.$router.push({})
            }
        }
    }
</script>
<style lang="less">
    .banner_page{
    .mint-swipe {height: 13rem; line-height: 13rem; font-size:2rem}
    .mint-swipe-item img{width: 100%;}
    }
</style>
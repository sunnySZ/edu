<template>
    <div class="activity_page">
        <mt-navbar v-model="selected" fixed>
            <mt-tab-item id="1">本周最热</mt-tab-item>
            <mt-tab-item id="2">最新活动</mt-tab-item>
            <mt-tab-item id="3">精彩回顾</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <ul class="hot_list">
                    <li v-for="(item,index) in hotData">
                        <router-link :to="{ name: 'detail',params: { id: item.id }}">
                            <img src="http://img.wanfantian.com/uploads/201708/02/2203c30f42c01473cb3a874816e315e9.jpg"/>
                            <aside class="aside">
                                <p>超燃丨加拿大互动亲子剧《你是演奏家》</p>
                                <span>返利18元</span>
                                <span>分享有礼</span>
                                <span>点评有礼</span>
                            </aside>
                            <span class="price">￥<mark>120.00</mark>起</span>
                            <span class="num">已售94份</span>
                        </router-link>
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :title="'测试 ' + n"  :key="n"/>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <mt-cell v-for="n in 6" :title="'选项 ' + n"  :key="n"/>
            </mt-tab-container-item>
        </mt-tab-container>
        <Foot></Foot>
    </div>
</template>
<script>
    import Foot from './footer.vue'
    export default{
        data(){
            return {
                selected: '1',//设置默认高亮
                hotData:[{"id":1},{"id":2},{"id":3}]
            }
        },
        watch: {
            selected(curVal, oldVal){
                console.log(curVal)
                this.$indicator.open()
                setTimeout(() => {
                    this.$indicator.close()
                }, 1000)
            }
        },
        components: {
            Foot
        }
    }
</script>
<style lang="less">
    .activity_page {
        margin-top: 50px;
        margin-bottom: 65px;
    }
</style>
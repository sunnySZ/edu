<template>
    <div class="activity_page">
        <mt-navbar v-model="selected" fixed>
            <mt-tab-item id="1">本周最热</mt-tab-item>
            <mt-tab-item id="2">最新活动</mt-tab-item>
            <mt-tab-item id="3">精彩回顾</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <mt-cell v-for="n in 10" :title="'内容 ' + n" :key="n"/>
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
                selected: '1'//设置默认高亮
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
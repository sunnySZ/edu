<template>
    <div class="my_page">
        个人中心
        <input type="button" value="增加" @click="increment"/>
        <input type="button" value="偶数增加" @click="addOdd"/>
        <input type="button" value="异步增加" @click="clickAsync"/>
        <p>现在数字为{{getNum}}</p>
       <p>动画队列运动，过滤筛选</p>
        <input type="text" v-model="$store.state.show"/>
        <transition-group enter-active-class="zoomInLeft" leave-active-class="animated zoomOutRight">
            <div class="box animated" v-for="(val,index) in lists" :key="index">
                {{val}}
            </div>
        </transition-group>

        <Foot></Foot>
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    import Foot from './footer.vue'
    /*import '_animate.css@3.5.2@animate.css/animate.css'*/
    export default{
        data(){
            return{
            }
        },
       computed: mapGetters(['getNum','lists']),
        methods:  mapActions(['increment','addOdd','clickAsync']),
        components:{
            Foot
        }
    }
</script>
<style lang="less">
    .box{
        background-color: red;
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
        line-height: 100px;
        text-align: center;
    }
</style>
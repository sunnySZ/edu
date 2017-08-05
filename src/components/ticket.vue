<template>
    <div class="ticket_page">
        <mt-navbar v-model="selected" fixed>
            <mt-tab-item id="1">所有分类</mt-tab-item>
            <mt-tab-item id="2">全部区域</mt-tab-item>
            <mt-tab-item id="3">最新上架</mt-tab-item>
        </mt-navbar>
         <mt-popup v-model="popupVisible" position="top" class="pop_tab">
             <div class="select_box" v-show="selected==1?true:false"><mt-cell v-for="n in 26" :title="'内容  ' + n" :key="n" /></div>
             <div class="select_box" v-show="selected==2?true:false">222</div>
             <div class="select_box" v-show="selected==3?true:false">333</div>
           <mt-cell class="page-part" title="当前选中">{{selected}}</mt-cell>
         </mt-popup>
        <mt-cell v-for="n in 6" :title="'内容  ' + n" :key="n" />
        <Foot></Foot>
    </div>
</template>
<script>
    import Foot from './footer.vue'
    export default{
        data(){
            return {
                selected:'',//默认空不设置tab高亮
                popupVisible:false,//控制modal显示
            }
        },
        watch:{
            popupVisible(val){
                //当modal关闭时候取消tab高亮设置
                if(!val){
                    this.selected=''
                }
            },
            selected(curVal,oldVal){
                if(curVal){
                    this.popupVisible=true
                }
            }
        },
        components: {
            Foot
        }
    }
</script>
<style lang="less">
    .ticket_page{
        margin-top: 50px;
        margin-bottom: 65px;

        .mint-navbar.is-fixed{
            z-index: 3000;
        }
        .pop_tab{
            width: 100%;
            text-align: center;
            padding-top: 50px;
            max-height: 80%;
            overflow: auto;
            box-sizing: border-box;;
        }
        .select_box{
            padding: 20px;
        }
    }
</style>
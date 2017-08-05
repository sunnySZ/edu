<template>
    <div class="ticket_page">
        <mt-navbar v-model="selected" fixed>
            <mt-tab-item id="1">所有分类</mt-tab-item>
            <mt-tab-item id="2">全部区域</mt-tab-item>
            <mt-tab-item id="3">最新上架</mt-tab-item>
        </mt-navbar>
        <mt-popup v-model="popupVisible" position="top" class="pop_tab">
            <div class="select_box" v-show="selected==1?true:false">
                <mt-cell v-for="n in 26" :title="'内容  ' + n" :key="n"/>
            </div>
            <div class="select_box" v-show="selected==2?true:false">222</div>
            <div class="select_box" v-show="selected==3?true:false">333</div>
            <mt-cell class="page-part" title="当前选中">{{selected}}</mt-cell>
        </mt-popup>
        <mt-cell v-for="n in 6" :title="'预售--乌克兰幽默小丑马戏团“欢乐小丑嘉年华”  ' + n" :key="n">
            <img slot="icon" src="http://img.wanfantian.com/uploads/201707/28/81d9b4e9049f785a418ada5287be221d.png">
            <div class="ticket_msg">
               <p><span class="price">100.00</span><del>150.00</del></p>
               <p>已售12份 <span class="address">江汉路步行街</span></p></div>
        </mt-cell>
        <Foot></Foot>
    </div>
</template>
<script>
    import Foot from './footer.vue'
    export default{
        data(){
            return {
                selected: '',//默认空不设置tab高亮
                popupVisible: false,//控制modal显示
            }
        },
        watch: {
            popupVisible(val){
                //当modal关闭时候取消tab高亮设置
                if (!val) {
                    this.selected = ''
                }
            },
            selected(curVal, oldVal){
                if (curVal) {
                    this.popupVisible = true
                }
            }
        },
        components: {
            Foot
        }
    }
</script>
<style lang="less">
    .ticket_page {
        margin-top: 50px;
        margin-bottom: 65px;
        .mint-navbar.is-fixed {
            z-index: 3000;
        }
        .pop_tab {
            width: 100%;
            text-align: center;
            padding-top: 50px;
            max-height: 80%;
            overflow: auto;
            box-sizing: border-box;;
        }
        .select_box {
            padding: 20px;
        }
        .mint-cell-wrapper{padding: 1rem; background-image: none; border-bottom: 1px solid #e5e5e5;box-sizing: border-box;}
        .mint-cell img{width: 8rem; height: 8rem; margin-right: 1rem;}
        .mint-cell-title{ display: flex;}
        .mint-cell-text{font-size: 1.6rem; line-height: 1.6em;}
        .mint-cell-value{ position: absolute; left: 10rem; bottom: 1rem; font-size: 1.2rem; color: #bbbbbb;}
        .ticket_msg{}
        .ticket_msg p{ line-height: 1.6rem;}
        .ticket_msg .price{ font-size: 1.6rem; color: #fa6e51; padding-right: 1rem;}
        .ticket_msg .address{ padding-left: 5rem;}
    }
</style>
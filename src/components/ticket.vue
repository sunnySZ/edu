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
        <ul class="list_box">
            <li v-for="n in 6">
                <router-link :to="{ name: 'detail',params: { id: n }}">
                   <div class="list_item">
                       <div class="img_box"><img src="http://img.wanfantian.com/uploads/201707/28/81d9b4e9049f785a418ada5287be221d.png"></div>
                       <div class="ticket_msg">
                           <span class="title">预售--乌克兰幽默小丑马戏团“欢乐小丑嘉年华</span>
                           <p><span class="price">100.00</span><del>150.00</del></p>
                           <p>已售12份 <span class="address">江汉路步行街</span></p></div>
                   </div>
                </router-link>
            </li>
        </ul>

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
    .list_box{ background-color: white;}
    .list_box li{ display: block; padding: 1rem;border-bottom: 1px solid #e5e5e5; }
    .list_box li a{color: #bbbbbb;}
    .list_item{ display: flex;}
    .img_box{ flex:1;}
    .img_box img{ width: 100%;}
    .ticket_msg{ flex: 3; padding-left: 1rem;}
    .ticket_msg .title{ font-size: 1.4rem; color:#000000;}
    .ticket_msg p{ line-height: 1.4rem;}
    .ticket_msg .price{ font-size: 1.6rem; color: #fa6e51; padding-right: 1rem;}
    .ticket_msg .address{ padding-left: 5rem;}
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

    }
</style>
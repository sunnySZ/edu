<template>
    <div class="order_page">

        <h2>凯德西城丨撒浪嘿哟，玩味CP大比拼</h2>
        <div class="order_item">
            <mt-cell title="特别说明：" value="fdfdfdf"></mt-cell>
            <mt-cell title="兑换说明 ：" value="dfddf" is-link to="tel:8888888"></mt-cell>
            <mt-cell title="退订说明：" @click.native="openAlert('xxxx')" value="xxxxxx"
                     is-link></mt-cell>
        </div>
        <div class="order_item">
            <mt-cell title="选择时间"></mt-cell>
            <mt-cell title="2017-08-26 10:00---2017-08-30 10:00" class="itembg"></mt-cell>
            <mt-cell title="选择出行日期" is-link></mt-cell>
        </div>

        <div class="order_item">
            <mt-cell title="选择地点"></mt-cell>
            <mt-cell title="西沙群岛" value="中国" class="itembg"></mt-cell>
        </div>
        <div class="order_item">
            <mt-cell title="数量">
                <div class="nums"><span class="price">￥{{price}}/份</span>
                <i class="add" @click="increment">+</i><span>{{getNum}}</span>
                <i class="reduce" @click="decrement">-</i></div>
            </mt-cell>
        </div>
        <ul class="footer">
            <li>
                总价:<span>￥{{getNum*price}}</span>
            </li>
            <li class="buy">提交订单</li>
        </ul>

    </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
    import {MessageBox} from 'mint-ui';
    export default{
        data(){
            return {
                id: null,
                price:120,
            }
        },
        created(){
            //this.getData();
        },
        computed:mapGetters(['getNum']),
        methods:mapActions(['increment','decrement'])
       /* methods: {
            openAlert(msg) {
                MessageBox({
                    title: '注意事项',
                    message: msg,
                    confirmButtonText: '关闭'
                });
            },

        }*/
    }
</script>
<style lang="less">
    .order_page {
        margin-bottom: 5rem;
        h2 {
            font-size: 1.6rem;
            padding: 1rem;
            background-color:white;
        }
        .order_item {
            margin-bottom: 1rem;
        }
        .itembg .mint-cell-wrapper {
            background-color: orangered;
            color: white;
            box-sizing: border-box;
            border-radius: 0.5rem;
            margin: 0 1rem 1rem;
            width: auto;
            background-size:120% 0;
        }

        .itembg .mint-cell-value{ color: white}
        .nums{ display:flex; height: 2rem; }
        .nums span{ line-height: 2rem; padding: 0 1rem; display: inline-block}
        .nums i{ display: inline-block; width: 2rem; height: 2rem; background-color: lightgray;}
        .nums span.price{ color: orangered; padding-right: 3rem;}

        .footer {
            display: flex;
            flex-wrap: nowrap;
            position: fixed;
            bottom: 0;
            width: 100%;
            background-color: #f8f8f8;
        }
        .footer li {
            display: block;
            width: 60%;
            height:4rem;
            line-height: 4rem;
            text-align: center;
            font-size: 1.6rem;
            border-top: 1px solid #ccc;
            box-sizing: border-box;
            color: #6d6d6d;
        }
        .footer li span {
            color: #fa6e51;
        }
        .footer li:last-child {
            width: 40%;
            background-color: #fa6e51;
            color: white;
            border-top-color: #fa6e51;

        }

    }
</style>
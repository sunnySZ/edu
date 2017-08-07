<template>
    <div class="discover_page">
        <div class="head">
            <img src="http://img.wanfantian.com/uploads/201706/13/24dafc7ae43338d4348731614f606ab5.jpg" />
            <p>      眼看暑期的热浪已经翻滚而来，<br>
                宝贝们就要放假啦！<br>
                各位爹妈有没有酝酿点special的出游计划?<br>
                去疯去闹，这个夏天我们必须玩翻天！<br>
                精彩亲子游行程持续更新中……</p>
        </div>



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
    </div>
</template>
<script>
    export default{
        data(){
            return {
                hotData:[{"id":1},{"id":2},{"id":3}]
            }
        },
        components: {
        }
    }
</script>
<style lang="less">
    .discover_page {
        .head{ background-color: white; margin-bottom: 1rem;}
        .head img{ width: 100%;}
        .head p{ line-height: 2rem; padding: 1rem; font-size: 1.2rem;}
        .hot_list li{ border-radius:0.5rem 0.5rem; margin: 1rem;}
        .hot_list li img{ border-radius: 0.5rem 0.5rem 0 0;}
    }
</style>
<template>
    <div class="comments_page">
        <star-rating v-model="rating"></star-rating>
        <!--<p class="startext">{{starText}}</p>-->
        <ul class="taglist">
            <li v-for="item in listData" @click="toggleClass(item)" :class="{ 'cur':item.SELECTED}">{{item.NAME}}</li>
        </ul>
        <mt-field placeholder="其他想说的" type="textarea" rows="3" v-model="textVal"></mt-field>
        <mt-button size="large" type="primary" @click.native="submitComment">提交</mt-button>
    </div>
</template>
<script>
    import Vue from 'vue'
    import StarRating from 'vue-star-rating'
    Vue.component('star-rating', StarRating);
    export default{
        data(){
            return {
                rating: 0,  //星分数
                starText: '', //选星文本
                textVal: '',  //评论文本
                listData: [],
                goods_id: '', //商品id
                order_id: '' //订单id
            }
        },
        created(){
            this.getData();
            this.goods_id = this.$route.params.goods_id;
            this.order_id = this.$route.params.order_id;

            console.log(this.$route.params)
        },
        watch: {
            /*rating(curVal,oldVal){
             switch (curVal){
             case 1:
             this.starText='比较满意仍需改善11';
             break;
             case 2:
             this.starText='比较满意仍需改善22';
             break;
             case 3:
             this.starText='比较满意仍需改善33';
             break;
             case 4:
             this.starText='比较满意仍需改善44';
             break;
             case 5:
             this.starText='比较满意仍需改善55';
             break;
             }
             }*/
        },
        methods: {
            getData(){
                this.$indicator.open();
                let url = 'yjt/goodsrepaly/taglist';//评论标签
                this.$http.get(url).then((res) => {
                    this.listData = res.data;
                    this.$indicator.close();
                }).catch((err) => {
                    this.$indicator.close();
                });
            },
            toggleClass: function (item) {
                item.SELECTED = !item.SELECTED;
            },
            getSelectTags(){
                //获取选中的tag
                let tags = [];
                for (var i = 0; i < this.listData.length; i++) {
                    if (this.listData[i].SELECTED) {
                        tags.push(this.listData[i].VALUE)
                    }
                }
                return tags.join(',');
            },
            submitComment(){
                if (this.rating < 1) {
                    this.$toast('请选择评分');
                    return;
                }
                this.$indicator.open();
                let url = 'yjt/goodsrepaly/add'; //订单评价yjt/goodsrepaly/add?shoid=4&content=9999&orderid=1&socre=3&tags=1,2,3
                let params = {
                    shoid: this.goods_id,
                    orderid: this.order_id,
                    score: this.rating,
                    content: this.textVal,
                    tags: this.getSelectTags()
                };
                this.$http.get(url, {
                    params: params
                }).then((res) => {
                    if (res.data.code === '200') {
                        this.$toast('评价成功');
                        this.$store.dispatch('ordercur', '3'); //订单列表界面tab高亮
                        this.$router.push({path: '/orderList'});
                        console.log(this.$store.state)
                    } else {
                        this.$toast('评价失败');
                    }
                    this.$indicator.close();
                }).catch((err) => {
                    this.$indicator.close();
                });
            }
        },
        components: {
            StarRating
        }
    }
</script>
<style lang="less">
    .comments_page {
        padding-top: 1rem;
        width: 80%;
        margin: 0 auto;
        .taglist {
            display: flex;
            margin: 1rem auto;
            width: 100%;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        .taglist li {
            display: block;
            width: 46%;
            margin: 0.5rem 0;
            padding: 0.7rem 0;
            box-sizing: border-box;
            border: 1px solid #cccccc;
            background-color: white;
            color: #666666;
            text-align: center;
        }
        .taglist li.cur {
            background-color: #fff5f3;
            border-color: #f0a97e;
            color: orange
        }
        .mint-cell-wrapper {
            background-image: none;
        }
        .mint-button {
            margin-top: 2rem;
        }
        .startext {
            padding-top: 1rem;
            text-align: center;
            color: orange;
        }
    }
</style>
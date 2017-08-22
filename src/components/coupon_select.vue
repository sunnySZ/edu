<template>
    <div class="coupon_select_page">
        <div>
            <mt-cell title="请选择现金优惠券">{{ value1 }}</mt-cell>
        </div>
        <mt-radio
                class="page-part"
                v-model="value1"
                :options="options1"/>
        <mt-button class="btn" type="primary" @click.native="confirmCoupon">确定</mt-button>

        <p v-show="nodata" class="no_data">暂无可用优惠券!</p>

    </div>
</template>
<script>
    export default{
        data(){
            return {
                value1: '',//选中的选项
                id: '',
                price: 0,
                goods_id: localStorage.getItem('goods_id'),
                nodata: false,
                options1:[],
                optionArr: [],
                nameArr: [],
                priceArr: [],
                idArr: []
            }
        },
        created(){
            this.getData();

        },
        methods: {
            confirmCoupon(){
                for (var i = 0; i < this.options1.length; i++) { //循环匹配选中项的id
                    if (this.options1[i] == this.value1) {
                        this.id = this.idArr[i];
                        this.price = this.priceArr[i];
                        return;
                    }
                }
                this.$store.dispatch('couponid', this.id);  //存储优惠券id
                this.$store.dispatch('couponprice', this.price); //存储优惠券面值
                this.$router.push({
                    path: '/order'
                })
            },
            getData(){
                this.$indicator.open();
                // http://localhost/yjt/buscashdetail/availablelist/{活动ID}
                let url = 'yjt/buscashdetail/availablelist/' + this.goods_id;
                this.$http.get(url).then((res) => {
                    let lists = res.data;
                    if (lists.length > 0) {
                        let showArr = [];
                        for (var i = 0; i < lists.length; i++) {
                            this.nameArr[i] = lists[i].VOLUME_NAME; //优惠券名称
                            this.priceArr[i] = lists[i].VOLUME_AMOUNT; //优惠券价格
                            this.idArr[i] = lists[i].ID; //优惠券id
                            showArr[i] = this.nameArr[i] + '---' + this.priceArr[i] + '元';//组装选项
                            this.optionArr[i] = {
                                label: showArr[i],
                                value: this.idArr[i]
                            }
                        }
                        this.options1 = this.optionArr;
                        console.log(this.optionArr)
                    } else {
                        this.nodata = true;
                    }
                    this.$indicator.close();
                }).catch((err) => {
                    this.$indicator.close();
                });

            }

        }
    }
</script>
<style lang="less">

    .coupon_select_page {
        .btn {
            margin: 1rem auto;
            display: block;
        }
    }
</style>
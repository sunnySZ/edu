let states = {
    count: 1,
    user_id: '',   //测试时不为空，生产留空
    order_id: '',  //提交订单生成的支付订单id
    user_msg: {},
    order_cur: '0',//订单界面tab高亮，注意类型必须是字符串
    coupon_id: '',//选中的现金兑换优惠券id
    goods_price:0,//商品价格
    coupon_price: 0,//选中的现金兑换优惠券的金额
    //  goods_id:''//商品id
}
export default states


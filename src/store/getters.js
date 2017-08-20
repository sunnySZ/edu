const getters = {
    getNum(state){
        return state.count
    },
    getCouponPrice(state){   //优惠券金额
        return state.coupon_price
    },
    totalPrice(state){   //实付金额
        return state.goods_price * state.count - state.coupon_price
    },
    getUserMsg(state){
        return state.user_msg
    }
}

export default getters
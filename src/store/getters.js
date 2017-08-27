const getters = {
    getNum(state){
        return state.count
    },
    getCouponPrice(state){   //优惠券金额
        return state.coupon_price
    },
    totalPrice(state){   //实付金额
        return ((state.goods_price * state.count).toFixed(2) - state.coupon_price).toFixed(2)
    },
    getUserMsg(state){
        return state.user_msg
    }
}

export default getters
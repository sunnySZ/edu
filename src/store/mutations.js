import * as types from './types'
const mutations = { //处理状态、数据变化
    [types.INCREMENT](state){
        state.count++;
    },
    [types.DECREMENT](state){
        if (state.count > 1) {
            state.count--;
        }
    },
    [types.SETUSERID](state, res){  //设置用户id
        state.user_id = res
    },
    [types.SETORDERID](state, res){  //设置订单id
        state.order_id = res
    },
    [types.SETUSERMSG](state, res){  //用户信息
        state.user_msg = res
    },
    [types.ORDERCUR](state, res){  //订单tab高亮
        state.order_cur = res
    },
    [types.ORDERCUR](state, res){  //选中的现金兑换优惠券id
        state.coupon_id = res
    },
    [types.COUPONIDPRICE](state, res){  //选中的现金兑换优惠券的金额
        state.coupon_price = res
    },
    [types.GOODSPRICE](state, res){  //商品价格
        state.goods_price = res
    },
    /*    [types.GOODSID](state,res){  //商品id
     state.goods_id=res
     },*/
    [types.LOGOUT](state){  //注销
        state.user_msg = {}
        state.user_id = ''
        sessionStorage.clear();
    }
}

export default mutations
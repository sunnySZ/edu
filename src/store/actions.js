import * as types from './types'

const actions = {
    //处理你要做什么，如异步请求、判断、流程控制等
    increment: ({commit}) => {  //增加
        commit(types.INCREMENT)
    },
    decrement: ({commit}) => {  //减少
        commit(types.DECREMENT)
    },
    setuserid: ({commit}, state) => {  //存储用户id
        commit(types.SETUSERID, state)
    },
    setorderid: ({commit}, state) => {  //存储订单id
        commit(types.SETORDERID, state)
    },
    setusermsg: ({commit}, state) => {  //存储用户信息
        commit(types.SETUSERMSG, state)
    },
    ordercur: ({commit}, state) => {  //订单界面高亮
        commit(types.ORDERCUR, state)
    },
    couponid: ({commit}, state) => {  //选中的现金兑换优惠券id
        commit(types.COUPONID, state)
    },
    couponprice: ({commit}, state) => {  //选中的现金兑换优惠券的金额
        commit(types.COUPONPRICE, state)
    },
    goodsprice: ({commit}, state) => {  //商品价格
        commit(types.GOODSPRICE, state)
    },
    mystatus: ({commit}, state) => {  //我的活动列表订单状态
        commit(types.MYSTATUS, state)
    },
    /*    goodsid: ({commit},state) => {  //商品id
     commit(types.GOODSID,state)
     },*/
    logout: ({commit}) => {  //注销
        commit(types.LOGOUT)
    },

}
export default actions
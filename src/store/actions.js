import * as types from './types'

const actions = {
    //处理你要做什么，如异步请求、判断、流程控制等
    increment: ({commit}) => {  //增加
        commit(types.INCREMENT)
    },
    decrement: ({commit}) => {  //减少
        commit(types.DECREMENT)
    },
    setuserid: ({commit},state) => {  //存储用户id
        commit(types.SETUSERID,state)
    },
    setorderid: ({commit},state) => {  //存储订单id
        commit(types.SETORDERID,state)
    },
    setusermsg: ({commit},state) => {  //存储用户信息
        commit(types.SETUSERMSG,state)
    },
    logout: ({commit}) => {  //注销
        commit(types.LOGOUT)
    },

}
export default actions
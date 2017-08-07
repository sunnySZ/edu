import * as types from './types'

const actions = {
    //处理你要做什么，如异步请求、判断、流程控制等
    increment: ({commit}) => {  //增加
        commit(types.INCREMENT)
    },
    addOdd: ({commit, state}) => {  //偶数增加
        if (state.count % 2 == 0) {
            commit(types.INCREMENT)
        }
    },
    clickAsync: ({commit}) => {  //异步增加
        new Promise((resolve) => {
            setTimeout(function () {
                commit(types.INCREMENT)
                resolve()
            }, 1000)
        })

    }
}
export default actions
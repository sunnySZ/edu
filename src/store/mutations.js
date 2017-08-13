import * as types from './types'
const mutations={ //处理状态、数据变化
    [types.INCREMENT](state){
        state.count++;
    },
    //更新用户信息
    [types.UPDATEUSERINFO](state, newUserInfo) {
        state.userInfo = newUserInfo;
    }
}
export default mutations
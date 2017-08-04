import * as types from './types'
const mutations={ //处理状态、数据变化
    [types.INCREMENT](state){
        state.count++;
    }
}
export default mutations
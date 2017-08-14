import * as types from './types'
const mutations={ //处理状态、数据变化
    [types.INCREMENT](state){
        state.count++;
    },
    [types.DECREMENT](state){
    	if(state.count>0){
    		 state.count--;
    	} 
    },
    [types.SETUSER](state,res){  //设置用户信息
        state.userInfo=res
    }
}
export default mutations
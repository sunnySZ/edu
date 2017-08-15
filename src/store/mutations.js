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
    [types.SETUSERID](state,res){  //设置用户id
    	console.log(res)
        state.user_id=res
    }
}
export default mutations
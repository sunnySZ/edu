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
        state.user_id=res
    },
    [types.SETORDERID](state,res){  //设置订单id
        state.order_id=res
    },
    [types.SETUSERMSG](state,res){  //用户信息
        state.user_msg=res
    },
    [types.LOGOUT](state){  //注销
        state.user_msg={}
        state.user_id=''
        sessionStorage.clear();
    }
}

export default mutations
const getters={
    getNum(state){
        return state.count
    },
    lists(state){
        let arr=[];
        /*state.list.forEach(function(val){
         if(val.indexOf(state.show)!=-1){
         arr.push(val)
         }
        });*/

        //es6
        state.list.forEach(val=>{
            if(val.indexOf(state.show)!=-1){
                arr.push(val)
            }
        })
        return arr

    }
}

export default getters
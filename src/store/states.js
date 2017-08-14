let states={
    count:1,
    show:'',
    list:['apple','banana','pear','orange'],
    userInfo:localStorage.getItem("user_Info")?JSON.parse(localStorage.getItem("user_Info")):{}
   /*  userInfo: { //保存用户信息
        nick: null,
        ulevel: null,
        uid: null,
        portrait: null
    }*/
}
export default states


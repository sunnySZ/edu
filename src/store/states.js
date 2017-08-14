let states={
    count:1,
    show:'',
    list:['apple','banana','pear','orange'],
    userInfo:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):{}
   /*  userInfo: { //保存用户信息
        nick: null,
        ulevel: null,
        uid: null,
        portrait: null
    }*/
}
export default states


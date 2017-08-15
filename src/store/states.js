let states={
    count:1,
    show:'',
    list:['apple','banana','pear','orange'],
    user_id:localStorage.getItem('user_id') ? localStorage.getItem('user_id'): '',
}
export default states


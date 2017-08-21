/**
 * Created by Sunny on 2017-8-11.
 */
export default {
    yy_mm_dd: function (input) {
        if (input) {
            var d = new Date(input);
            var year = d.getFullYear();
            var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            var hour = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            return year + '-' + month + '-' + day
            // return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
        }
    },
    isFavorites:function (str) {  //收藏显示状态判断
        if(str){ //登录后会返回str
            if(str==1){  //1表示已收藏，0表示未收藏
                return 'collect_btn cur'
            }else{
                return 'collect_btn'
            }
        }else{
            return 'collect_btn'
        }
    }

}
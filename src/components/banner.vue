<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in data">
                <div @click="bannerClick(item.id)">
                    {{item.title}}
                </div>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                data: [
                    {"title": "我是图片1", "id": "1"},
                    {"title": "我是图片2", "id": "2"},
                    {"title": "我是图片3", "id": "3"}
                ]
            }
        },
       methods:{
           bannerClick(id){
               console.log(id)
              // this.$router.push({})
           }
       }
    }
</script>
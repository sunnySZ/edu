<template>
    <div>
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="select"><img slot="icon" src="../assets/logo.png">精选</mt-tab-item>
            <mt-tab-item id="activity"><img slot="icon" src="../assets/logo.png">活动</mt-tab-item>
            <mt-tab-item id="ticket"><img slot="icon" src="../assets/logo.png">买票</mt-tab-item>
            <mt-tab-item id="my"><img slot="icon" src="../assets/logo.png">我的</mt-tab-item>
        </mt-tabbar>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                selected: this.$route.name
            }
        },
        watch: {
            selected(curVal, oldVal){
                console.log(curVal)
                this.$router.push({path: '/' + curVal})
            }
        }
    }
</script>
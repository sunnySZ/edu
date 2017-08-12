<template>
    <div class="footer_page">
        <!--<mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="select"><img slot="icon" src="../assets/logo.png">精选</mt-tab-item>
            <mt-tab-item id="activity"><img slot="icon" src="../assets/logo.png">活动</mt-tab-item>
            <mt-tab-item id="ticket"><img slot="icon" src="../assets/logo.png">买票</mt-tab-item>
            <mt-tab-item id="my"><img slot="icon" src="../assets/logo.png">我的</mt-tab-item>
        </mt-tabbar>-->
        <ul class="footer">
            <router-link to="/select" tag="li" activeClass="active">
                <i class="icon1"></i>精选
            </router-link>
            <router-link to="/activity" tag="li" activeClass="active">
                <i class="icon2"></i>活动
            </router-link>
            <router-link to="/ticket" tag="li" activeClass="active">
                <i class="icon3"></i>买票
            </router-link>
            <router-link to="/my" tag="li" activeClass="active">
                <i class="icon4"></i>我的
            </router-link>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return {
               // selected: this.$route.name
            }
        },
      /*  watch: {
            selected(curVal, oldVal){
                console.log(curVal)
                this.$router.push({path: '/' + curVal})
            }
        }*/
    }
</script>
<style lang="less">
    .footer_page {
        .footer {
            display: flex;
            justify-content: space-around;
            height: 4.6rem;
            width: 100%;
            margin: 0;
            padding: 0;
            background-color: #fafafa;
            position: fixed;
            left: 0;
            bottom: 0;
            background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
            background-size: 100% 1px;
            background-repeat: no-repeat;
        }
        .footer li {
            display: block;
            width: 25%;
            text-align: center;
        }
        .footer li i {
            display: block;
            width: 2rem;
            height: 2rem;
            margin: 0.8rem auto 0.1rem;
            background: url("../assets/icon.png") no-repeat;
            background-size: cover;
        }
        .footer li.active { color:#fa6e51;}
        .footer li i.icon1{ background-position: 0 25%}
        .footer li i.icon2{ background-position: 0 30%}
        .footer li i.icon3{ background-position: 0 35%}
        .footer li i.icon4{ background-position: 0 40%}
        .footer li.active i.icon1{background-position: 0 45%}
        .footer li.active i.icon2{background-position: 0 50%}
        .footer li.active i.icon3{background-position: 0 55%}
        .footer li.active i.icon4{background-position: 0 60%}

    }
</style>
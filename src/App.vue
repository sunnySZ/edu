<template>
    <div id="app">
        <!--<keep-alive><router-view></router-view></keep-alive>-->
        <!--<transition name="slide-down"><router-view></router-view></transition>-->
        <router-view></router-view>
        <ScrollTop></ScrollTop>
    </div>
</template>

<script>
    import ScrollTop from './components/ScrollTop.vue'
    export default {
        name: 'app',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        components:{
            ScrollTop
        }
        /*watch:{
            $route(to,from){
                console.log(to.path);
                if(to.path=='/my1'){
                  this.$store.dispatch('increament')
                }
            }
        },*/
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    body{ background-color: #eeeeee; margin: 0;}
    a{ text-decoration: none;}
    @media screen and (min-width:320px){html{font-size:10px;}}
    @media screen and (min-width:540px){html{font-size:21px;}}
    @media screen and (min-width:740px){html{font-size:28px;}}

    p,h2,ul{ padding: 0; margin: 0;}
    .no_data{ text-align: center; padding: 1rem;}
    .get_more {
        padding: 1rem;
        text-align: center;
    }
    .slide-down-enter-active, .slide-down-leave-active {
        transition: .4s all ease;
        opacity: 0.5;
        transform: translate3d(0, 5em, 0);
    }
    .slide-down-enter, .slide-down-leave {
        opacity: 1;
        transform: translate3d(0, 5em, 0);
    }
    .list_box li {
        display: block;
        padding: 1rem;
        border-bottom: 1px solid #e5e5e5;
        margin-bottom: 1rem;
        background-color: white;
    }

    .list_box li a {
        color: #bbbbbb;
    }

    .list_item {
        display: flex;
    }

    .img_box {
        flex: 1;
    }

    .img_box img {
        width: 100%;
    }

    .ticket_msg {
        flex: 4;
        padding-left: 1rem;
        color: #cccccc;
    }

    .ticket_msg .title {
        font-size: 1.4rem;
        color: #000000;
    }

    .ticket_msg p {
        line-height: 1.4rem;
    }
</style>

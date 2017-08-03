<template>
    <div id="app">
        <!--<keep-alive><router-view></router-view></keep-alive>-->
        <!--<transition name="slide-down"><router-view></router-view></transition>-->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    a{ text-decoration: none;}
    @media screen and (min-width:320px){html{font-size:10px;}}
    @media screen and (min-width:540px){html{font-size:21px;}}
    @media screen and (min-width:740px){html{font-size:28px;}}

    p{ padding: 0; margin: 0;}

    .slide-down-enter-active, .slide-down-leave-active {
        transition: .4s all ease;
        opacity: 0.5;
        transform: translate3d(0, 5em, 0);
    }
    .slide-down-enter, .slide-down-leave {
        opacity: 1;
        transform: translate3d(0, 5em, 0);
    }
</style>

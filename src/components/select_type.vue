<template>
    <div class="type_page">
        <p v-show="listLoading" class="loading">
            <mt-spinner color="#26a2ff" type="fading-circle"></mt-spinner>
        </p>
        <ul class="type_list">
            <li v-for="item in typeData">
                <router-link :to="{ name: 'discover',params: { type: item.TYPE_ID }}">
                    <img :src="item.S_IMAGE">
                    <span>{{item.NAME}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                listLoading: true,
                typeData: []
            }
        },
        created(){
            //  this.$indicator.open('加载中...');
            this.getBanner();
        },
        methods: {
            getBanner(){
                var url = 'yjt/goodstypelist';
                this.$http.get(url).then((res) => {
                    this.listLoading = false;//隐藏loading
                    this.typeData = res.data;
                }).catch((err) => {
                });
            }
        }
    }
</script>
<style lang="less">
    .type_page {
        .type_list li {
            width: 16%;
            min-height: 5rem;
            display: block;
            text-align: center;
            margin: 1rem 0;
        }
        .type_list li a{color:#696969; display:block;}
        .type_list li img {
            width: 100%;
        }
    }
</style>
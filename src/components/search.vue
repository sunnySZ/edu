<template>
	<div class="search_page">
		<mt-header fixed>
			<router-link to="/" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
			<router-link to="/search" slot="left">
				<input class="info" type="text" placeholder="搜索商品活动或游玩地" v-model="val">
			</router-link>
			<mt-button slot="right" @click="handleSearch">搜索</mt-button>
		</mt-header>
	</div>
</template>
<script>

  export default{
      data(){
          return{
              val:''
          }
      },
	  methods:{
          handleSearch(){
              console.log(this.val)
			  if(this.val!==''){
                  console.log('请求数据')
			  }else{
			      console.log('请输入搜索内容')
			  }
		  }
	  }

  }
</script>
<style lang="less">
	.search_page{

	}
</style>
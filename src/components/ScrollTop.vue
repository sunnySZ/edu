<template>
	<div class="scroll-top" @click="top"></div>
</template>
<script>
  export default {
  		name:'scroll-top',
	    mounted() {
	        var self = this;
	        window.onscroll=function(){
		        	var height = document.documentElement.clientHeight || document.body.clientHeight;
	        		if(self.scrollTop >= height){
	      				self.$el.style.display = "block";
	        		}else{
	        			self.$el.style.display = "none";
	        		}
	            if(!self.flag){
	                clearInterval(self.timer);
	            }
	            self.flag = false;
	            self.scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
	        };
	    },
	    props:{
	        spend:{
	            type:Number,
	            default:20
	        }
	    },
	    data() {
	      return {
	          flag:true,
	          timer:null,
	          scrollTop:null,
	      }
	    },
	    methods:{
	        top() {
            clearInterval(this.timer);
            var self = this;
            this.timer=setInterval(function(){
                var now=self.scrollTop;
                var speed=(0-now)/10;
                speed=speed>0?Math.ceil(speed):Math.floor(speed);
                if(self.scrollTop==0){
                    clearInterval(self.timer);
                }
                self.flag = true;
                document.documentElement.scrollTop = self.scrollTop + speed;
                document.body.scrollTop = self.scrollTop + speed;
            }, this.spend);
	        }
	    }
	};
</script>
<style>
	.scroll-top{
		position: fixed;
		bottom:7rem;
		right:2rem;
		display:none;
		width:4rem;
		height:4rem;
		border-radius: 2rem;
		background:rgba(255,255,255,0.7) url("../assets/icon1.png") no-repeat;
		background-size: cover;
		background-position: 0 80%;
		border:1px solid #cccccc;
		box-sizing: border-box;
		box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
	}
</style>
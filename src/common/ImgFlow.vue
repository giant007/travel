<template>
<div class="tab" ref="tab">
	<div class="tab_title">{{title}}</div>
	<div class="tab_content" ref="tabcontent">
		<div class="tab_item" v-for="(item, index) in imgList" :key="index" ref="tabitem">
			<img :src="item.img" :alt="index"/>
			<span>{{item.title}}</span>
		</div>
		
	</div>
</div> 
</template>
<script>
import BetterScroll from 'better-scroll'

export default {
	name: 'CitySearch',
	props: {
		imgList: Array,
		title: String
	},
	data () {
		return {

		}
	},
	created () {
		this.$nextTick(()=>{
		this.initTabScroll();
		});//必须等dom元素挂载完下一帧才能渠道$refs
	},
	
	methods: {
		goSpecial(index){
		console.log('jump to index:'+index);
		},
		initTabScroll(){
			console.log(this.imgList);
			let width= this.imgList.length * 2.5;//2.5与图片width对应
			this.$refs.tabcontent.style.width=width+'rem';
			console.log(width);
			this.$nextTick(()=>{
			if (!this.scroll) {
				this.scroll=new BetterScroll(this.$refs.tab, {
					startX:0,
					click:true,
					scrollX:true,
					scrollY:false,
					eventPassthrough:'vertical'
				})
				}else{
					this.scroll.refresh();
				}
			});
		}
	}

}
</script>

<style lang="stylus"  scoped>
	.tab
		display: inline-block;
		width: 100%;
		height: 3.5rem
		overflow: hidden;
	.tab_title
		text-align: 'left'
		font-weight :bold
		padding :.1rem
		display:inline-block
	.tab_content
		text-align: 'center';
		height: 3rem
	.tab_item
		display: inline-block;
		height: 3rem
		width: 2.5rem
		span
			font-size 0.2rem
			display:inline-block
			padding :.1rem
		img
			width: 2.5rem
			height: 2.5rem
	.icon
		display: inline-block;
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
		margin-left: 10px;
		margin-right: 10px;
	span
		font-size: 0.4rem;
</style>



<template>
	<div class="list-wrapper">
		<div class="header">
			<div class="iconfont icon-fanhui"></div>
			<p class="title">广州 - 北京</p>
		</div>
		<attend-item></attend-item>
	</div>
</template>

<script>
import AttendItem from 'dynamic/list/components/attendItem'
export default {
	name: 'OneCompare',
	components: {
		AttendItem
	}
}
</script>

<style lang="stylus" scoped>
	.header
		height: 1rem
		background: #fff
		position: relative
		.icon-fanhui
			position: absolute
			left: 0.28rem
			top: 0.32rem
			color: #000
			font-size: 0.48rem
			before { content: "\e601"; }
		.title
			font-size: .3rem
			color:#333
			text-align:center
			line-height: 1rem
			font-weight:bold
</style>

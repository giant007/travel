<template>
	<div class="calendar-wrapper">
		<div class="header">
			<div class="iconfont icon-fanhui"></div>
			<p class="title">广州 - 北京</p>
			<p class="result">共90条查询结果</p>
		</div>
		<ul class="menu">
			<li class="on">按时间段筛选
				<ul class="sub-menu">
					<li>00:01-10:00  上午</li>
					<li>00:01-10:00  上午</li>
					<li>00:01-10:00  上午</li>
					<li>00:01-10:00  上午</li>
				</ul>
			</li>
			<li>按航空公司筛选</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'SelectCalendar'
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
		.result
			color:#bbb
			font-size: .2rem
			text-align: center
			margin-top: -.2rem
			-webkit-transform: scale(calc(10 / 12))
			transform: scale(calc(10 / 12))
	.menu
		display: flex
		height: .6rem
		line-height: .6rem
		text-align:center
		li
			flex: 1
			color:#666
			font-size: .20rem
			position:relative
			&.on
				color: #48b28d
			.sub-menu
				position:absolute
				top:.63rem
				width: 100%
				left:0
				background:#fff
				z-index: 999
				box-shadow: 5px 5px 3px 0 rgba(0, 0, 0, .1)
				li
					line-height: .9rem
					height: .9rem
					border-bottom: 1px solid #f0f0f0
					margin: 0 .4rem
</style>

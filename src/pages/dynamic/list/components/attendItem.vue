<template>
	<div class="list-wrapper-content" ref="mainlist">
		<div class="list-main">
			<div class="plan">
				<div class="item">
					<h2>计划</h2>
					<ul class="plan-content">
						<li>
							<p class="p1">准点率</p>
							<p class="p2">100.00%</p>
						</li>
						<li>
							<p class="p1">飞行距离</p>
							<p class="p2">1876公里</p>
						</li>
						<li>
							<p class="p1">飞行时间</p>
							<p class="p2">157分钟</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="list-item">
				<div class="list-header">
					<div class="title">
						<img src="../../../../assets/images/ic_dongtai_qifei.png" alt="" class="air-logo" />
						<span>起飞:广州白云机场T1</span>
					</div>
					<div class="weather">多云转雷阵雨32-26℃</div>
				</div>
				<ul class="list-content-item">
					<li>
						<p class="p3">预计起飞</p>
						<p class="p4">08:00</p>
					</li>
					<li>
						<p class="p3">值机柜台</p>
						<p class="p4">C.D.E.F.G.J</p>
					</li>
					<li>
						<p class="p3">登机口</p>
						<p class="p4">B12</p>
					</li>
				</ul>
				<p class="preview">预计起飞时间仅供参考，登机时间不变</p>
			</div>
			<div class="list-item">
				<div class="list-header">
					<div class="title">
						<img src="../../../../assets/images/ic_dongtai_jiangluo.png" alt="" class="air-logo" />
						<span>到达:北京首都机场T1</span>
					</div>
					<div class="weather">多云转雷阵雨32-26℃</div>
				</div>
				<ul class="list-content-item">
					<li>
						<p class="p3">预计起飞</p>
						<p class="p4">08:00</p>
					</li>
					<li>
						<p class="p3">值机柜台</p>
						<p class="p4">C.D.E.F.G.J</p>
					</li>
					<li>
						<p class="p3">登机口</p>
						<p class="p4">B12</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="attend">
			<a href="#">关注航班</a>
		</div>
	</div>
</template>

<script>
import BetterScroll from 'better-scroll'
export default {
	name: 'OneItem',
	data () {
		return {
			click: {type: Boolean, default: true}
		}
	},
	mounted () {
		this.scroll = new BetterScroll(this.$refs.mainlist, {click: this.click})
	}
}
</script>

<style lang="stylus" scoped>
	.list-wrapper-content
		position: absolute
		top: 1rem
		right: 0
		bottom: 0
		left: 0
		overflow: hidden;
	.plan
		padding: 0.2rem
		border-top: 1px solid #eee
		.item
			background: #F3F8FF
			h2
				text-align: center
				height: .48rem
				line-height: .48rem
				background: #4A90E2
				color: #fff
				font-size: .28rem
				border-top-left-radius: 4px
				border-top-right-radius: 4px
			.plan-content
				height: 1.8rem
				line-height: 1.8rem
				display: flex
				li
					flex: 1
					text-align: center
					line-height: 1.2
					.p1
						color: #4A90E2
						font-size: .24rem
						margin-top: .6rem
					.p2
						color: #666
						font-size: .3rem
	.list-item
		padding-left: .3rem
		border-top: 4px solid #f2f2f2
		.list-header
			font-size: .2rem
			line-height: .9rem
			overflow:hidden
			border-bottom: 1px solid #f0f0f0
			.title
				float:left
				color:#333
				font-size: .24rem
				.air-logo
					width: .40rem
					height: .40rem
					margin-right: .1rem
			.weather
				float: right
				color: #bbb
				font-size: .24rem
				padding-right: .5rem
		.list-content-item
			margin-right: .3rem
			padding-bottom: .5rem
			padding-top: .5rem
			overflow:hidden
			position:relative
			display: flex
			li
				flex: 1
				text-align: center
				.p3
					color: #bbb
					font-size: .24rem
				.p4
					color: #666
					font-size: .3rem
					margin-top: .1rem
		.preview
			text-align: center
			font-size: .24rem
			padding-bottom: .2rem
			color: #E8465A
	.attend, .disattend
		position:fixed
		bottom:.15rem
		left:0
		width: 100%
		text-align: center
		a
			border-radius: 5px
			background: #48B28D
			border-radius: 2px
			font-size: .28rem
			color:#fff
			height: .8rem
			line-height: .8rem
			width: 6.9rem
			display: block
			margin: 0 auto
	.disattend
		a
			color: #fff
			background: #ddd
</style>

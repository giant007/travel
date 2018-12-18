<template>
	<div class="detail">
		<div class="header">
			<div class="iconfont icon-fanhui"></div>
			<p class="title">航班详情</p>
		</div>
		<div class="list-item">
			<div class="list-header">
				<div class="title">
					<span>2018-07-03 周二</span>
				</div>
				<p class="punctuality">广州 - 北京</p>
			</div>
			<div class="list-content">
				<div class="top">
					<span class="s-time">08:00</span>
					<span class="air-plane">首都航空JD5162</span>
					<img src="../../../assets/images/ic_flyto_2.png" alt="" class="fly_to" />
					<span class="air-time">准点率：90%</span>
					<span class="e-time">11:10 <em>+1天</em></span>
				</div>
				<div class="middle">
					<span class="s-location">广州白云国际机场</span>
					<span class="e-location">北京首都机场</span>
				</div>
			</div>
		</div>
		<div class="list-item">
			<div class="list-header">
				<div class="title">
					<span>预定站点</span>
				</div>
			</div>
			<div class="order-content">
				<ul class="order-list">
					<li>
						<span class="order-title">驴妈妈</span>
						<span class="order-info">
							<i>最低</i>
							<em>￥1000</em>
							<a href="#">预订</a>
						</span>
					</li>
					<li>
						<span class="order-title">驴妈妈</span>
						<span class="order-info">
							<i>最低</i>
							<em>￥1000</em>
							<a href="#">预订</a>
						</span>
					</li>
					<li>
						<span class="order-title">驴妈妈</span>
						<span class="order-info">
							<em>￥987</em>
							<a href="#">预订</a>
						</span>
					</li>
					<li>
						<span class="order-title">驴妈妈</span>
						<span class="order-info">
							<em>￥30000</em>
							<a href="#">预订</a>
						</span>
					</li>
				</ul>
			</div>
		</div>
		<ul class="go-order">
				<li>
					<span class="order-title">驴妈妈</span>
					<span class="order-info">
						<i>最低</i>
						<em>￥1000</em>
						<a href="#">立即预订</a>
					</span>
				</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'OneDetail'
}
</script>

<style lang="stylus" scoped>
	.detail
		position: fixed
		width: 100%
		height: 100%
		top: 0px
		background-color:#f0f0f0
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
	.list-item
		padding-left: .3rem
		border-top: 4px solid #f2f2f2
		background:#fff
		.list-header
			font-size: .2rem
			line-height: .9rem
			overflow:hidden
			border-bottom: 1px solid #f0f0f0
			.title
				float:left
				color:#333
				font-size: .24rem
				span
					border-left: .06rem solid #48B28D
					padding-left: .12rem
			.punctuality
				float:right
				margin-right: .3rem
		.list-content
			height: 1.5rem
			margin-right: .3rem
			.top
				position:relative
				margin-top: .3rem
				height: .8rem
				line-height: .8rem
				font-size: .4rem
				color:#333
				font-weight: bold
				overflow:hidden
				.s-time
					margin-left: .5rem
				.air-plane, .air-time
					position:absolute
					font-size: .2rem
					-webkit-transform: scale(calc(10 / 12))
					transform: scale(calc(10 / 12))
					color:#999
				.air-plane
					top: -.23rem
					left: 2.2rem
				.air-time
					top: .3rem
					left: 2.5rem
				.fly_to
					width: 2rem
					height: .1rem
					margin: 0 .5rem
				.e-time
					em
						color:#333
						font-size: .24rem
						font-weight: normal
				.price
					float:right
					color: #e8465a
			.middle
				color:#333
				font-size: .24rem
				height: .35rem
				line-height: .35rem
				position:relative
				.s-location, .e-location, .low-price
					position: absolute
					top: 0
				.s-location
					left: .3rem
				.e-location
					left: 4.5rem
				.low-price
					-webkit-transform: scale(calc(10 / 12))
					transform: scale(calc(10 / 12))
					font-size: .2rem
					border:1px solid #e8465a
					color: #e8465a
					padding: .05rem
					line-height: .25rem
					right: -.1rem
	ul
		li
			border-bottom: 1px solid #f0f0f0
			height: .96rem
			line-height: .96rem
			.order-title
				margin-left: .3rem
				color:#333
				font-size: .3rem
				font-weight:bold
			.order-info
				float:right
				margin-right: .3rem
				i, em
					color: #e8465a
				em
					font-size: .3rem
					margin: 0 .2rem 0 0
				i
					-webkit-transform: scale(calc(10 / 12))
					transform: scale(calc(10 / 12))
					font-size: .2rem
					border:1px solid #e8465a
					display:inline-block
					line-height:1
					padding: .05rem
				a
					height: .6rem
					line-height: .6rem
					width: 1.2rem
					color:#fff
					font-size: .28rem
					background: #48b28d
					border-radius: 2px
					text-align:center
					display:inline-block
	.go-order
		position:fixed
		bottom:0
		left:0
		width:100%
		background:#fff
		border-top:1px solid #f0f0f0
		height: 1.2rem
		line-height: 1.2rem
		li
			border:none
			height: 1.2rem
			line-height: 1.2rem
			.order-info
				a
					width: 2rem
					height: .8rem
					line-height: .8rem
				em
					font-weight:bold
					font-size: .4rem
</style>

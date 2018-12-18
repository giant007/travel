<template>
	<div class="detail">
		<div class="header">
			<div class="iconfont icon-fanhui"></div>
			<p class="title">酒店详情</p>
		</div>
		<div class="list-item">
			<div class="list-img">
				<div class="detail-img">
					<a href="#"><img src="../../../assets/images/pic-2.gif" alt="" /></a>
				</div>
			</div>
			<div class="list-content">
				<div class="content">
					<div class="hotel-info">
						<p class="p-title">广州南京路步行街颐和至尊酒店</p>
						<p class="p-info"><u>距市中心700米·人民广场</u></p>
						<p class="p-info"><a href="#">高档型</a><a href="#">商务出行</a></p>
						<p class="p-info"><b>4.7分</b><u>806条点评</u></p>
					</div>
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
	name: 'HotelDetail'
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
		.list-img
			.detail-img
				margin-left: -.3rem
				img
					width: 100%
		.list-content
			margin-right: .3rem
			.content
				padding: .2rem 0 0
				overflow:hidden
				.hotel-info
					float:left
					p
						line-height: .45rem
					.p-title
						color:#333
						font-size:.3rem
					.p-info
						b
							color: #4a90e2
							font-size: .36rem
							margin-right: .15rem
						u
							color:#bbb
							font-size: .24rem
						a
							webkit-transform: scale(calc(10 / 12))
							transform: scale(calc(10 / 12))
							border: 1px solid #4a90e2
							border-radius: 2px
							font-size: .2rem
							padding: 0 .05rem
							display:inline-block
							margin-left: -.05rem
						em
							float: right
							color: #e8465a
							font-size: .4rem
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

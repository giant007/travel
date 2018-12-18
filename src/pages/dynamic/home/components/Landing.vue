<template>
	<div class="tabs-main">
		<div class="tabs-item">
			<ul class="flight-city">
				<li><img src="../../../../assets/images/ic_dongtai_qifei.png" alt="" class="c-img" /><span>广州</span></li>
			</ul>
			<ul class="exchangeCity">
				<li><img src="../../../../assets/images/ic_dongtai_change.png" alt="" class="d-img" /></li>
			</ul>
			<ul class="flight-city">
				<li><img src="../../../../assets/images/ic_dongtai_jiangluo.png" alt="" class="c-img" /><span>北京</span></li>
			</ul>
			<ul class="select-date">
				<li class="start-date"><img src="../../../../assets/images/ic_dongtai_date.png" alt="" class="c-img" /><span class="s-date">2018年07月01日</span><span class="s-week">周日</span></li>
			</ul>
			<div class="price-submit">
				<input type="button" value="航班查询" class="price-btn" />
			</div>
		</div>
		<div class="s-history">
			<h2>常用航班</h2>
			<ul>
				<li>广州 - 北京<span>x</span></li>
				<li>广州 - 北京<span>x</span></li>
				<li>广州 - 北京<span>x</span></li>
				<li>广州 - 北京<span>x</span></li>
				<li>广州 - 北京<span>x</span></li>
				<li>广州 - 北京<span>x</span></li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Landing'
}
</script>

<style lang="stylus" scoped>
	.tabs-item
		padding: .4rem .3rem 0 .3rem
		position:relative
		.arrive-info, .select-city
			display: flex
		.arrive-info
			li
				flex: 1
				color:#bbb
				font-size: .12rem
			.a-start
				text-align:left
			.a-end
				text-align:right
		.select-city
			margin-top: .12rem
			height: .8rem
			li
				&.start-city, &.end-city
					flex: 1
					border-bottom: 1px solid #F0F0F0
					color:#333
					font-size: .3rem
				&.end-city
					text-align:right
				&.tab-img
					width: .6rem
					img
						width: .6rem
						height: .6rem
		.select-date, .flight-num, .flight-city
			display: flex
			border-bottom: 1px solid #F0F0F0
			height: 1.4rem
			line-height: 1.4rem
			li
				flex: 1
				.c-img
					width: .4rem
					height: .4rem
					margin-right: .4rem
				.flight-num-input
					width: 4rem
				.s-date
					color:#333
					font-size: .3rem
				.s-week
					color:#bbb
					font-size: .24rem
					margin-left: .08rem
		.flight-city
			width: 6.1rem
		.exchangeCity
			img
				position:absolute
				right:.2rem
				top:1.5rem
				width: .6rem
				height: .6rem
		.price-submit
			height: 1.8rem
			line-height: 1.8rem
			.price-btn
				background: #48B28D;
				border-radius: 4px;
				color:#fff
				text-align:center
				height: 1rem
				line-height: 1rem
				width: 100%
				font-size: .3rem
	.s-history
		h2
			background: #F5F5F5
			height: .6rem
			line-height: .6rem
			padding-left: .3rem
			color:#bbb
			font-size:.24rem
		ul
			li
				margin-top: 0.4rem
				display: inline-block
				width: 2rem
				font-size: 0.24rem
				color: #bbb
				text-align: center
				padding: 0 0.2rem
				white-space:nowrap
				span
					margin-left: .08rem
					color: #fff
					background: #dfdfdf
					width: 0.24rem
					height: 0.24rem
					display: inline-block
					font-size: .05rem
					line-height: .24rem
					border-radius: 100%
</style>

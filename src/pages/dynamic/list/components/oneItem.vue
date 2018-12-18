<template>
	<div class="list-wrapper-content" ref="mainlist">
		<div class="list-main">
			<div class="list-item">
				<div class="list-header">
					<div class="title">
						<img src="../../../../assets/images/air_logo.gif" alt="" class="air-logo" />
						<span>厦门航空MF1001</span>
					</div>
				</div>
				<div class="list-content">
					<div class="top">
						<span class="s-time">08:00</span>
						<img src="../../../../assets/images/ic_flyto_1.png" alt="" class="fly_to" />
						<span class="e-time">11:10</span>
					</div>
					<div class="middle">
						<span class="s-location">广州白云国际机场</span>
						<span class="e-location">北京首都机场</span>
					</div>
					<ul class="attend">
						<li>关注</li>
					</ul>
				</div>
			</div>

			<div class="list-item">
				<div class="list-header">
					<div class="title">
						<img src="../../../../assets/images/air_logo.gif" alt="" class="air-logo" />
						<span>厦门航空MF1001</span>
					</div>
				</div>
				<div class="list-content">
					<div class="top">
						<span class="s-time">08:00</span>
						<img src="../../../../assets/images/ic_flyto_1.png" alt="" class="fly_to" />
						<span class="e-time">11:10</span>
					</div>
					<div class="middle">
						<span class="s-location">广州白云国际机场</span>
						<span class="e-location">北京首都机场</span>
					</div>
					<ul class="attend">
						<li>关注</li>
					</ul>
				</div>
			</div>

			<div class="list-item">
				<div class="list-header">
					<div class="title">
						<img src="../../../../assets/images/air_logo.gif" alt="" class="air-logo" />
						<span>厦门航空MF1001</span>
					</div>
				</div>
				<div class="list-content">
					<div class="top">
						<span class="s-time">08:00</span>
						<img src="../../../../assets/images/ic_flyto_1.png" alt="" class="fly_to" />
						<span class="e-time">11:10</span>
					</div>
					<div class="middle">
						<span class="s-location">广州白云国际机场</span>
						<span class="e-location">北京首都机场</span>
					</div>
					<ul class="attend">
						<li>关注</li>
					</ul>
				</div>
			</div>

			<div class="list-item">
				<div class="list-header">
					<div class="title">
						<img src="../../../../assets/images/air_logo.gif" alt="" class="air-logo" />
						<span>厦门航空MF1001</span>
					</div>
				</div>
				<div class="list-content">
					<div class="top">
						<span class="s-time">08:00</span>
						<img src="../../../../assets/images/ic_flyto_1.png" alt="" class="fly_to" />
						<span class="e-time">11:10</span>
					</div>
					<div class="middle">
						<span class="s-location">广州白云国际机场</span>
						<span class="e-location">北京首都机场</span>
					</div>
					<ul class="attend">
						<li>关注</li>
					</ul>
				</div>
			</div>

			<div class="list-item">
				<div class="list-header">
					<div class="title">
						<img src="../../../../assets/images/air_logo.gif" alt="" class="air-logo" />
						<span>厦门航空MF1001</span>
					</div>
				</div>
				<div class="list-content">
					<div class="top">
						<span class="s-time">08:00</span>
						<img src="../../../../assets/images/ic_flyto_1.png" alt="" class="fly_to" />
						<span class="e-time">11:10</span>
					</div>
					<div class="middle">
						<span class="s-location">广州白云国际机场</span>
						<span class="e-location">北京首都机场</span>
					</div>
					<ul class="attend">
						<li>关注</li>
					</ul>
				</div>
			</div>

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
		top: 1.6rem
		right: 0
		bottom: 0
		left: 0
		overflow: hidden;
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
		.list-content
			margin-right: .3rem
			padding-bottom: .5rem
			position:relative
			.top
				margin-top: .3rem
				height: .5rem
				line-height: .5rem
				font-size: .4rem
				color:#333
				font-weight: bold
				overflow:hidden
				.s-time
					margin-left: .5rem
				.fly_to
					width: .64rem
					height: .1rem
					margin: 0 .5rem
				.e-time
					em
						color:#333
						font-size: .24rem
						font-weight: normal
			.middle
				color:#333
				font-size: .24rem
				height: .35rem
				line-height: .35rem
				position:relative
				.s-location, .e-location
					position: absolute
					top: 0
				.s-location
					left: .3rem
				.e-location
					left: 3.2rem
			.attend
				position:absolute
				top:.15rem
				right:0
				li
					background: #48B28D
					border-radius: 2px
					font-size: .28rem
					color:#fff
					text-align:center
					height: .6rem
					line-height: .6rem
					width: 1.2rem
</style>

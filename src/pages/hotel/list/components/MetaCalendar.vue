<template>
	<div class="condition-wrapper">
		<div class="header">
			<div>
			<router-link to="/hotel">
				<div class="iconfont icon-fanhui"></div>
			</router-link>
			<p class="title" @click="showCity">{{ default_start_city }}<i class="select-title"></i></p>
			</div>
		</div>
		<ul class="calendar-info">
			<li class="select-calendar" @click="handleDate">
				<em class="lowerprice">住{{ this.default_start_date | stripYear | stripWeek }}</em>
				<em>离{{ this.default_end_date | stripYear | stripWeek }}</em>
			</li>
			<li class="date-info" >
				<input class="search-input" type="text" @click="showSearchMeta" :placeholder="holder" @focus="emptyHold" v-model="searchValue"  />
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'SelectCalendar',
	props: {
		calendarPriceList: Array,
	},
	data () {
		return {
			cityUrl: this.$store.state.hotelPathUrl+"/hmeta/getHotCitys",
			holder: '搜索地标\地铁\景点',
			searchValue: ''
		}
	},
	created () {
		if(this.$store.state.searchValue&&this.$store.state.searchValue!=''){
			this.searchValue = this.$store.state.searchValue
		}
	},
	filters: {
		stripYear (value) {
			return value.substring(4).replace('年', '')
		},
		stripWeek (value) {
			return value.substring(0,(value.indexOf('日'))).replace('月','-').replace('日','-');
		}
	},
	methods: {
		emptyHold () {
			this.holder = ''
		},
		handleDate () {
			this.$emit('changeDate')
		},
		showCity () {
			this.$emit('showCity')
		},
		showSearchMeta () {
			this.$parent.showSearchMeta();
		},
		closeSearchMeta (item) {
			this.$parent.closeSearchMeta(item);
		},
		updateShowMetaValue (value) {
			this.searchValue = value
		}
	},
	computed: {
		...mapState(['default_start_city', 'default_end_city', 'default_start_date', 'default_end_date', 'default_select_day'])
	}
}
</script>

<style lang="stylus" scoped>
	.search-input
		background: #f5f5f5
		border-radius: 4px
		box-sizing: border-box
		width: 5.8rem
		border-radius: .06rem
		padding: 0.10rem 0
		color:#000
		font-size: .28rem
		text-indent: .74rem
	.select-title
		max-width: 7rem
		position: relative!important
		left: 0!important
		right: 0!important
		display: inline-block
		vertical-align: middle
		width: .65rem
	.select-title:after
		content: ""
		width: .25rem
		height: .25rem
		border-left: 2px solid #fff
		border-bottom: 2px solid #fff
		position: absolute
		top: 50%
		left: .25rem
		transition: all .3s ease-in-out
		-webkit-transform: translateY(-50%) rotate(-45deg)
		transform: translateY(-50%) rotate(-45deg)
	.condition-wrapper
		background: #48b28d
	.header
		height: 0.8rem
		position: relative
		.icon-fanhui
			position: absolute
			left: 0.28rem
			top: 0.32rem
			color: #fff
			font-size: 0.38rem
			before { content: "\e601"; }
		.title
			font-size: .3rem
			color:#fff
			text-align:center
			line-height: 1rem
	.calendar-info
		overflow:hidden
		height: .8rem
		text-align:center
		margin-top:.0rem
		margin-bottom:.1rem
		display:flex
		li
			text-align:left
			padding-left:.3rem
			&.date-info
				flex:1
				padding-top:.1rem
				padding-left 0rem
			&.total-day
				text-align:center
				line-height:.5rem
				position:relative
			&.return-info
				text-align:right
				padding-right:.3rem
			span
				display:inline-block
				font-size: .24rem
				color:#333
				&.day
					background: #eafff8
					border-radius: 1px
					width: .72rem
					height:.4rem
					display:inline-block
					position:relative
				&.line
					position:absolute
					width: 1.5rem
					border-bottom:1px solid #eafff8
					top: -.18rem
					left: .4rem
				&.start
					color:#bbb
					text-align:left
				&.reach
					color:#bbb
			.date
				top:-.3rem
				font-size: .18rem
				display: inline-block;
				-webkit-transform: scale(calc(9 / 12))
				transform: scale(calc(9 / 12))
			&.select-calendar
				border-left: 1px solid #ccc
				float:right
				width: 1.08rem
				em
					display:block
					line-height: .3rem
					color:#000
					font-weight:bold
					&.lowerprice
						margin-top: .1rem
</style>

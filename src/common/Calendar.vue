<template>
	<div class="calendar-wrapper">
		<div class="header">
			<div class="iconfont icon-fanhui" @click="onlyCloseCalendar" >&#xe63c;</div>
			<p class="title">日期选择</p>
		</div>
		<ul class="calendar-header">
			<li v-for="(item, index) in monthHeader" :key="index">{{ item }}</li>
		</ul>
		<div class="list" ref="mainlist">
			<div class="content">
				<section class="calendar-item" v-for="(item, index) in dateList" :key="index">
					<h2>{{ item.month }}</h2>
					<ul>
						<li :class="['calendar-day', {disable:it.disabled === true, begin:it.clsName === 'begin', end:it.clsName === 'end', active:it.clsName === 'active'}]" v-for="(it, idx) in item.result" :key="idx" @click="handleClickDate(it)">
							<em v-if="it.day != 0">{{ it.day }}</em>
							<em v-else>&nbsp;</em>
							<span v-if="it.price != 0">{{ it.price | currency }}</span>
						</li>
					</ul>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BetterScroll from 'better-scroll'
import axios from 'axios'
export default {
	name: 'Calendar',
	props: {
		tabType: {type:String,default:'flight'},
		isCalendarShow: Boolean,
		isHotelCalendarType: String,
		isType: String,
		isShowPrice: Boolean,
		flight: {default: 'flight'}
	},
	data () {
		return {
			dateList: [],
			tmpDateList: [],
			priceList: [],
			monthHeader: ['日', '一', '二', '三', '四', '五', '六'],
			year: '',
			month: '',
			day: '',
			click: {type: Boolean, default: true},
			isBegin: false,
			isEnd: false,
			beginValue: 0
		}
	},

	filters: {
		currency (value) {
			return value && ('¥ ' + value)
		}
	},

	watch: {
		isCalendarShow () {
			this.scroll.refresh()
		},
		tab_type () {
			this.dateList.forEach((it3) => {
				it3.result.forEach((it4) => {
					it4.clsName = ''
				})
			})
		},
		default_start_city_code () {
			this.getDateInfo()
		},
		default_end_city_code () {
			this.getDateInfo()
		}
	},

	methods: {
		getDateInfo () {
			if(this.tabType!="hotel"){
				axios.get('/api/freFlight/selectPriceCalendars', {
					params: {
						fromCityCode: this.default_start_city_code,
						toCityCode: this.default_end_city_code,
						type: 2
					}
				})
				.then(this.handleDate)
			}
		},

		handleDate (res) {
			res = res.data
			if (res.state === true && res.airFerightList) {
				this.dateList = []
				this.priceList = []
				this.tmpDateList = res.airFerightList
				this.createCalendar(this.year, this.month, this.day, res.airFerightList)

				this.handleLowestPriceDate(this.startDateValue)
				this.changePriceList(JSON.stringify(this.priceList))
			}
		},

		getFirstFromMonth (year, month) {
			let d = new Date()
			d.setFullYear(year)
			d.setMonth(month - 1)
			d.setDate(1)
			return d.getDay()
		},

		getDayInMonth (year, month) {
			let monthDay = [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
			return monthDay[month - 1]
		},

		isLeapYear (year) {
			return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
		},

		createCalendar (year, month, day, retData) {
			let firstDay, dayTotal, i, tmpYear, tmpMonth, curMonth, everyMonth, fullMonth
			tmpYear = year
			curMonth = month
			tmpMonth = month

			for (i = 0; i < 12; i++) {
				let obj = {}
				obj['result'] = []

				if (month > 12) {
					tmpYear = year + 1
					tmpMonth = month - 12
				} else {
					tmpMonth = month
				}

				firstDay = this.getFirstFromMonth(tmpYear, parseInt(tmpMonth, 10))
				dayTotal = this.getDayInMonth(tmpYear, parseInt(tmpMonth, 10))

				everyMonth = tmpYear + '年' + tmpMonth + '月'
				fullMonth = tmpYear + '-' + (tmpMonth < 10 ? '0' + tmpMonth : tmpMonth)
				obj['month'] = everyMonth

				dayTotal = dayTotal + firstDay

				for (let m = 0; m < 42; m++) {
					if (m >= firstDay && m < dayTotal) {
						let nWeek = m % 7
						let mDay = m - firstDay + 1
						let mDate = [tmpYear, tmpMonth < 10 ? '0' + tmpMonth : tmpMonth, mDay < 10 ? '0' + mDay : mDay].join('-')
						let isPrice = this.$_.findWhere(retData, {date: mDate})
						let everyDay = everyMonth + mDay + '日'
						let fullDay = fullMonth + '-' + (mDay < 10 ? '0' + mDay : mDay)
						if (isPrice) {
							if (mDay === day && tmpMonth === curMonth) {
								obj['result'].push({day: '今天', price: this.isShowPrice === false ? 0 : isPrice.price, disabled: false, week: nWeek, everyDay: everyDay, clsName: '', fullDay: fullDay})
							} else {
								obj['result'].push({day: mDay, price: this.isShowPrice === false ? 0 : isPrice.price, disabled: false, week: nWeek, everyDay: everyDay, clsName: '', fullDay: fullDay})
							}
						} else {
							if (mDay === day && tmpMonth === curMonth && this.isShowPrice === false) {
								obj['result'].push({day: '今天', price: 0, disabled: false, week: nWeek, everyDay: everyDay, clsName: '', fullDay: fullDay})
							} else if (mDay < day && tmpMonth === curMonth) {
								obj['result'].push({day: mDay, price: 0, disabled: true, week: nWeek, everyDay: everyDay, clsName: '', fullDay: fullDay})
							} else {
								obj['result'].push({day: mDay, price: 0, disabled: false, week: nWeek, everyDay: everyDay, clsName: '', fullDay: fullDay})
							}
						}
					} else {
						if (dayTotal > 35 || m < firstDay || m < 35) {
							obj['result'].push({day: 0})
						}
					}
				}

				month++

				this.dateList.push(obj)
			}
		},

		handleLowestPriceDate (fullDay) {
			let retDateArr = []
			let currentDay = this.getSpecialDate()

			for (let i = 3; i > 0; i--) {
				retDateArr.push(this.handleDateCompare(this.getSpecialDate(fullDay, -i), currentDay))
			}

			retDateArr.push(this.handleDateCompare(fullDay, currentDay))

			for (let i = 1; i < 3; i++) {
				retDateArr.push(this.handleDateCompare(this.getSpecialDate(fullDay, i), currentDay))
			}

			retDateArr.forEach((item) => {
				if (item !== '-') {
					let priceItem = this.$_.findWhere(this.tmpDateList, {'date': item})
					if (priceItem !== undefined) {
						this.priceList.push({
							'price': priceItem.price,
							'date': priceItem.date.split('-')[2],
							'week': this.handleWeek(new Date(priceItem.date).getDay()),
							'isSelect': priceItem.date === fullDay
						})
					}
				} else {
					this.priceList.push({
						'price': '-',
						'date': '-',
						'week': '-',
						'isSelect': false
					})
				}
			})
		},

		handleDateCompare (d1, d2) {
			if (this.diffDate(d1, d2) === false) {
				return '-'
			} else {
				return d1
			}
		},

		getSpecialDate (dt, sDay) {
			let d, year, month, day
			if (dt !== undefined) {
				d = new Date(dt)
			} else {
				d = new Date()
			}
			if (sDay !== undefined) {
				d.setDate(d.getDate() + sDay)
			}
			year = d.getFullYear()
			month = d.getMonth() + 1
			month = month < 10 ? '0' + month : month
			day = d.getDate()
			day = day < 10 ? '0' + day : day
			return year + '-' + month + '-' + day
		},
		onlyCloseCalendar () {
			this.$emit('onlyCloseCalendar')
		},
		handleClickDate (item) {
			if(item.disabled){
				return;
			}
			let currentDay = this.getSpecialDate()
			if (item.day === 0 || this.diffDate(item.fullDay, currentDay) === false)  return

			if (this.tab_type === 'single' && this.isHotelCalendarType !== 'home') {
				this.startDate = item.everyDay + ' ' + this.handleWeek(item.week)
				this.startDateValue = item.fullDay
				this.compareDate(item, 1)
				this.priceList = []
				this.handleLowestPriceDate(item.fullDay)

				if (this.isType === 'home') {
					this.$emit('closeCalendar', 'start')
				} else if (this.isType === 'list') {
					this.$emit('closeCalendar', this.priceList, item)
				}

				this.changePriceList(JSON.stringify(this.priceList))
			} else if (this.tab_type === 'return' || this.isHotelCalendarType === 'home') {
				if (this.beginValue === 0 || this.diffDate(this.beginValue, item.fullDay) || this.diffDate(this.beginValue, item.fullDay) === 0 || (this.isBegin === true && this.isEnd === true)) {
					this.beginValue = item.fullDay
					this.isBegin = true
					this.isEnd = false
					this.startDate = item.everyDay + ' ' + this.handleWeek(item.week)
					this.startDateValue = item.fullDay
					this.compareDate(item, 1)
				} else {
					this.isEnd = true
					this.endDate = item.everyDay + ' ' + this.handleWeek(item.week)
					this.endDateValue = item.fullDay
					this.compareDate(item, 2)

					let selDay = this.getDateDiff(this.startDateValue, this.endDateValue)

					if (this.isType === 'home') {
						this.$emit('closeCalendar', 'end', selDay)
					} else if (this.isType === 'multi') {
						this.$emit('closeCalendar', selDay)
					}
				}
			}
		},

		getDateDiff (startTime, endTime) {
			let sTime = new Date(startTime)
			let eTime = new Date(endTime)
			let num = 1000 * 3600 * 24
			return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(num))
		},

		diffDate (date1, date2) {
			let d1, d2
			if (date1 !== 0 && date1 !== undefined) {
				d1 = new Date(date1)
				d2 = new Date(date2)
				if (d1 instanceof Date && d2 instanceof Date) {
					return (d1 > d2) ? true : (d1 < d2) ? false : 0
				} else {
					throw new TypeError(d1 + '-' + d2)
				}
			}
		},

		compareDate (item, type) {
			if (type === 1) {
				this.dateList.forEach((it3) => {
					it3.result.forEach((it4) => {
						it4.clsName = ''
					})
				})
				this.dateList.forEach((it1) => {
					it1.result.forEach((it2) => {
						if (this.diffDate(it2.fullDay, item.fullDay) === 0) {
							it2.clsName = 'begin'
						}
					})
				})
			} else {
				this.dateList.forEach((it1) => {
					it1.result.forEach((it2) => {
						if (this.diffDate(it2.fullDay, this.beginValue) && this.diffDate(item.fullDay, it2.fullDay)) {
							it2.clsName = 'active'
						} else if (this.diffDate(it2.fullDay, this.beginValue) === 0) {
							it2.clsName = 'begin'
						}

						if (this.diffDate(it2.fullDay, item.fullDay) === 0) {
							it2.clsName = 'end'
						}
					})
				})
			}
		},

		...mapMutations(['changePriceList']),

		handleWeek (week) {
			let weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
			return weekDay[week]
		}
	},

	created () {
		let d = new Date()
		this.year = d.getFullYear()
		this.month = d.getMonth() + 1
		this.day = d.getDate()

		if (this.isShowPrice === false) {
				this.createCalendar(this.year, this.month, this.day, [])

				this.handleLowestPriceDate(this.startDateValue)
				this.changePriceList(JSON.stringify(this.priceList))
		} else {
			this.getDateInfo()
		}
	},

	computed: {
		startDate: {
			get () {
				return this.$store.state.default_start_date
			},
			set (newValue) {
				this.$store.state.default_start_date = newValue
			}
		},
		endDate: {
			get () {
				return this.$store.state.default_end_date
			},
			set (newValue) {
				this.$store.state.default_end_date = newValue
			}
		},
		startDateValue: {
			get () {
				return this.$store.state.default_start_date_value
			},
			set (newValue) {
				this.$store.state.default_start_date_value = newValue
			}
		},
		endDateValue: {
			get () {
				return this.$store.state.default_end_date_value
			},
			set (newValue) {
				this.$store.state.default_end_date_value = newValue
			}
		},
		...mapState(['tab_type', 'default_start_city_code', 'default_end_city_code'])
	},

	mounted () {
		this.scroll = new BetterScroll(this.$refs.mainlist, {click: this.click})
	}
}
</script>

<style lang="stylus" scoped>
	.calendar-wrapper
		position: absolute
		top: 0
		left: 0
		right: 0
		bottom: 0
		z-index: 2
		background: #fff
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
		.title
			font-size: .3rem
			color:#333
			text-align:center
			line-height: 1rem
			font-weight:bold
	.calendar-header
		overflow:hidden
		height: .5rem
		line-height: .5rem
		text-align:center
		li
			width: 14.28571%
			color:#bbb
			font-size: .24rem
			float:left
	.list
		position:absolute
		top:1.5rem
		right:0
		bottom:0
		left:0
		overflow:hidden
		.calendar-item
			width:100%
			h2
				width: 100%
				background:#f5f5f5
				color:#bbb
				text-align:center
				height: .6rem
				line-height: .6rem
				font-size: .24rem
			ul
				overflow:hidden
				li
					position: relative
					z-index:999
					float: left
					width: 14.28571%
					height: 1.08rem
					line-height: 1.08rem
					text-align:center
					border-bottom: 1px solid #f0f0f0
					&.active
						background: #eafff8
					&.begin, &.end
						background: #48b28d
						em, span
							color:#fff
					&.disable
						em
							color:#ccc
					em
						color: #333
						font-size: 0.36rem
						position: absolute
						left: 0
						width: 100%
						top: -.05rem
						z-index:1
					span
						z-index:1
						font-size: 0.2rem
						position: absolute
						bottom: -.28rem
						width: 100%
						left: 0
						color:#999
						-webkit-transform: scale(calc(10 / 12))
						transform: scale(calc(10 / 12))
</style>

<template>
	<div>
		<tab-nav :tabList="tabList" :tabType="tab_type" @changeTab="changeTab" v-show="isTabShow">
			<home-single :tabType="tab_type" @changeCity="showCity" @changeDate="showCalendar"></home-single>
		</tab-nav>
		<slide-animate>
			<home-city v-show="isCityShow" @closeCity="closeCity" :isCityShow="isCityShow"></home-city>
		</slide-animate>
		<slide-animate>
		<home-calendar v-show="isCalendarShow" @closeCalendar="closeCalendar" :isCalendarShow="isCalendarShow" :isType="isType" :isShowPrice="isShowPrice"></home-calendar>
		</slide-animate>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SlideAnimate from 'common/Animate'
import TabNav from 'common/TabNav'
import HomeSingle from 'flight/home/components/Single'
import HomeCity from 'common/city/City'
import HomeCalendar from 'common/Calendar'
export default {
	name: 'FlightHome',
	components: {
		TabNav,
		HomeSingle,
		SlideAnimate,
		HomeCity,
		HomeCalendar
	},
	data () {
		return {
			isCityShow: false,
			isShowPrice: true,
			isCalendarShow: false,
			isTabShow: true,
			isType: 'home',
			isCityType: '',
			tabList: [
				{
					type: 'single',
					name: '单程'
				},
				{
					type: 'return',
					name: '返程'
				}
			]
		}
	},
	computed: {
		...mapState(['tab_type', 'default_start_date', 'default_start_date_value', 'default_end_date', 'default_end_date_value'])
	},
	methods: {
		changeTab (tab) {
			this.changeCurTab(tab.type)
		},
		showCity (type) {
			this.isCityShow = true
			this.isTabShow = false
			this.isCityType = type
		},
		closeCity (item) {
			this.isCityShow = false
			this.isTabShow = true

			if (this.isCityType == 'start' && item != '') {
				this.changeStartCity(item.city_name_cn)
				this.changeStartCityCode(item.city_code)
			} else if (this.isCityType == 'end' & item != '') {
				this.changeEndCity(item.city_name_cn)
				this.changeEndCityCode(item.city_code)
			}
		},
		showCalendar (type) {
			this.isTabShow = false
			this.isCalendarShow = true
		},
		closeCalendar (type, day) {
			this.isTabShow = true
			this.isCalendarShow = false

			if (type == 'start') {
				this.changeStartDate(this.default_start_date)
				this.changeStartDateValue(this.default_start_date_value)
			} else if (type == 'end') {
				this.changeStartDate(this.default_start_date)
				this.changeStartDateValue(this.default_start_date_value)
				this.changeEndDate(this.default_end_date)
				this.changeEndDateValue(this.default_end_date_value)
				this.changeSelectDay(day)
			}
		},
		...mapMutations(['changeCurTab', 'changeStartCity', 'changeEndCity', 'changeStartCityCode', 'changeEndCityCode', 'changeStartDate', 'changeEndDate', 'changeStartDateValue', 'changeEndDateValue', 'changeSelectDay'])
	}
}
</script>

<style lang="stylus" scoped>
</style>

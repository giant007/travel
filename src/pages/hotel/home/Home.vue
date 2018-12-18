<template>
	<div class="tabs-main">
		<tip-header ref="tip"></tip-header>
		<div class="tabs-item" v-show="isHomeShow">
			<ul class="select-city">
				<li class="start-city" @click="startCity">
					<b class="destination">国内</b>
					<span class="place">{{ this.default_start_city }}</span>
				</li>
				<li class="end-city" @click="$refs.tip.loadLocalCityInfo()">
					<img class="location-img" src="../../../assets/images/ic_bijia_locate.png" alt="" /><span class="location">我的位置</span>
				</li>
			</ul>
			<ul class="arrive-info">
				<li class="a-start">入住</li>
				<li class="a-end">离店</li>
			</ul>
			<ul class="select-date">
				<li class="start-date" @click="handleDate('start')">
					<span class="s-date">{{ this.default_start_date | date }}</span><span class="s-week">{{ this.default_start_date | week }}</span>
				</li>
				<li class="tab-day">{{ this.default_select_day }}晚</li>
				<li class="end-date" @click="handleDate('end')">
					<span class="s-date">{{ this.default_end_date | date }}</span><span class="s-week">{{ this.default_end_date | week }}</span>
				</li>
			</ul>
			<div class="price-submit">
				<input type="button" value="开始比价" class="price-btn" @click="comparePrice" />
			</div>
		</div>
		<slide-animate>
			<home-city bizType="hotel" v-show="isCityShow" @closeCity="closeCity" :isCityShow="isCityShow"></home-city>
		</slide-animate>
		<slide-animate>
			<home-calendar v-show="isCalendarShow" @closeCalendar="closeCalendar"  @onlyCloseCalendar="onlyCloseCalendar" :isCalendarShow="isCalendarShow" :isType="isType" :isHotelCalendarType="isHotelCalendarType" :isShowPrice="isShowPrice"></home-calendar>
		</slide-animate>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import HomeCity from 'common/city/City'
import SlideAnimate from 'common/Animate'
import HomeCalendar from 'common/Calendar'
import TipHeader from 'common/TipHeader'
export default {
	name: 'HotelHome',
	components: {
		HomeCity,
		SlideAnimate,
		TipHeader,
		HomeCalendar
	},
	metaInfo (){
		return {
			title: "酒店预订,旅游攻略,上『佳乐比旅行』比价",
			meta: [
			{
				name: "robots",
				content: "index, follow"
			},
			{
				name: "keywords",
				content: "酒店预订,旅行攻略,酒店比价,酒店比价网,旅游酒店"
			},
			{
				name: "description",
				content: "佳乐比旅行是专门为旅行者打造的一款省时省力的机票酒店比价平台，她的特点为实时根据地标、景点、地铁站、医院等条件精准搜索全网渠道酒店"
			}]
		}
	},
	created () {
		//alert(this.default_start_city);
	},
	data () {
		return {
			isCityShow: false,
			isShowPrice: false,
			isCalendarShow: false,
			isHomeShow: true,
			isType: 'multi',
			isHotelCalendarType: 'home',
			isCityType: ''
		}
	},
	computed: {
		...mapState(['default_start_date', 'default_start_date_value', 'default_end_date', 'default_end_date_value', 'default_start_city', 'default_select_day'])
	},
	filters: {
		date (value) {
			return value.split(' ')[0]
		},
		week (value) {
			return value.split(' ')[1]
		}
	},
	methods: {
		closeCity (item) {
			this.isHomeShow = true
			this.isCityShow = false
			if(item==''){
				return ;
			}
			this.changeStartCity(item.city_name_cn)
			if(this.$route.fullPath.indexOf("hotel")!=-1){
				if(item.type=='subcity'){
					this.changeSearchId(item.id)
				}else{
					this.changeSearchId(item.representMetaId)
				}
				this.changeSearchValue('')
				this.changeHistoryNameIndex([])
				this.changeHighestPrice('')
				this.changeLowestPrice('')
				this.changePriceSort(-1)
			}
			this.changeStartCityCode(item.city_code)
		},
		onlyCloseCalendar () {
			this.isHomeShow = true
			this.isCalendarShow = false
			this.changeStartDate(this.default_start_date)
			this.changeStartDateValue(this.default_start_date_value)
			this.changeEndDate(this.default_end_date)
			this.changeEndDateValue(this.default_end_date_value)
			// this.$router.go(-1)
		},
		closeCalendar (day) {
			this.isHomeShow = true
			this.isCalendarShow = false
			this.changeStartDate(this.default_start_date)
			this.changeStartDateValue(this.default_start_date_value)
			this.changeEndDate(this.default_end_date)
			this.changeEndDateValue(this.default_end_date_value)
			this.changeSelectDay(day)
		},
		startCity () {
			this.isHomeShow = false
			this.isCityShow = true
		},
		handleDate (type) {
			this.isCalendarShow = true
			this.isHomeShow = false
		},
		comparePrice () {
			this.$router.push({
				path: '/hotel/compare?metaName='+this.default_start_city
			})
		},
		...mapMutations(['changePriceSort','changeHighestPrice','changeLowestPrice','changeHistoryNameIndex','changeSearchValue','changeSearchId','changeStartCity', 'changeStartCityCode', 'changeStartDate', 'changeEndDate', 'changeStartDateValue', 'changeEndDateValue', 'changeSelectDay'])
	},
	mounted () {
		this.changeSelectDay(1)
	},
}
</script>

<style lang="stylus" scoped>
	.tabs-item
		padding: .4rem .3rem 0 .3rem
		.arrive-info, .select-date
			display: flex
		.arrive-info
			margin-top: .5rem
			li
				flex: 1
				color:#bbb
				font-size: .12rem
			.a-start
				text-align:left
			.a-end
				text-align:right
		.select-date
			margin-top: .2rem
			height: .8rem
			display:flex
			li
				.s-date
					color:#333
					font-size: .3rem
				.s-week
					color:#bbb
					font-size: .24rem
					margin-left: .08rem
				&.start-date, &.end-date
					border-bottom: 1px solid #F0F0F0
					flex: 1
				&.end-date
					text-align:right
				&.tab-day
					width: .72rem
					text-align:center
					height: .4rem
					line-height: .4rem
					background: #eafff8
					border-radius: 1px
					color: #48b28d
					font-size: .22rem
					-webkit-transform: scale(calc(10 / 12))
					transform: scale(calc(10 / 12))
		.select-city
			display: flex
			border-bottom: 1px solid #F0F0F0
			height: 1.4rem
			line-height: 1.4rem
			li
				flex: 1
				position:relative
				&.start-city, &.end-city
					flex: 1
					color:#333
					font-size: .3rem
				&.end-city
					text-align:right
					.location
						color: #48b28d
						font-size: .24rem
						margin-left: .1rem
					.location-img
						width: .4rem
						height: .4rem
				&.start-city
					.destination
						position:absolute
						left:0
						top: -.5rem
						font-size: .24rem
						color: #bbb
		.price-submit
			background: #ffffff
			height: 1.8rem
			line-height: 1.8rem
			.price-btn
				background: #48B28D;
				border-radius: 4px;
				color:#ffffff
				text-align:center
				height: 1rem
				line-height: 1rem
				width: 100%
				font-size: .3rem
</style>

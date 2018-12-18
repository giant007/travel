<template>
<div>
    <div class="box" v-show="isShowList">
		<ul class="menu">
			<li class="menu-item">
				<div class="icon-content">
					<div class="iconfont icon-zhusu"></div>
				</div>
				<div class="item-text">酒店</div>
			</li>
			<li class="menu-item">
				<div class="icon-content">
					<div class="iconfont icon-feiji"></div>
				</div>
				<div class="item-text">机票</div>
			</li>
			<li @click="toGuideMenu" class="menu-item">
				<div class="icon-content">
					<div class="iconfont icon-jingdian"></div>
				</div>
				<div class="item-text" >城市攻略</div>
			</li>
			<li class="menu-item">
				<div class="icon-content">
					<div class="iconfont icon-youji"></div>
				</div>
				<div class="item-text">游记</div>
			</li>
		</ul>
		<div class="citybox" >
			<div  @click="showCity">
				<strong>{{ default_start_city }}  </strong><font class="qiehua">切换<i class="icon iconfont icon-tabxiala"></i></font>
			</div>
		</div>
		<div >
			<div class="boxtitle">
				
				<tab class="tab" active-color="#48b28d">
					<tab-item selected   @on-item-click="hotelTabClick()">酒店比价</tab-item>
					<tab-item @on-item-click="flightTabClick()">机票比价</tab-item>
				</tab>
			</div>
			<div v-show="isShowHotelTab" class="boxcontent">
				<ul class="calendar-info">
					<li class="select-calendar" @click="showCalendar">
						<em class="lowerprice">住{{ this.default_start_date | stripYear | stripWeek }}</em>
						<em>离{{ this.default_end_date | stripYear | stripWeek }}</em>
					</li>
					<li class="date-info" >
						<input class="search-input" type="text" @click="showSearchMeta" :placeholder="holder" @focus="emptyHold" @blur="blurHold" v-model="searchValue"  />
					</li>
					<li class="button-info"><button @click="toCompare">全网比价</button></li>
				</ul>
				
			</div>
		</div>
	</div>
		
</div> 
</template>

<script>

import { mapState, mapMutations } from 'vuex'


import merge from 'webpack-merge'
import { Tab, TabItem } from 'vux'


export default {
    components: {
        Tab,
    	TabItem
	},
	computed: {
		...mapState(['default_start_city', 'default_start_date', 'default_start_date_value', 'default_end_date', 'default_end_date_value', 'default_select_day'])
	},
    data() {
        return {
			searchValue: '',
			isHotelCalendarType: 'home',
			isType: 'multi',
            isSearchMetaShow: false,
			isCityShow: false,
			isShowPrice: false,
			isCalendarShow: false,
			isShowList: true,
			isShowHotelTab: true,
			isShowflightTab: false,
			cityUrl: this.$store.state.hotelPathUrl+"/hmeta/getHotCitys",
			holder: '搜索地标/地铁/景点',
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
		toGuideMenu(){
			this.$router.push({
				path: '/guide'
			})
		},
		toCompare(){
			this.$router.push({
				path: '/hotel/compare?metaName='+this.$store.state.default_start_city
			})
		},
		hotelTabClick (){
			this.isShowHotelTab = true
			this.isShowflightTab = false
		},
		flightTabClick (){
			this.isShowHotelTab = false
			this.isShowflightTab = true
		},
		blurHold (){
			if(this.holder == ''){
				this.holder = '搜索地标/地铁/景点'
			}
		},
		emptyHold () {
			this.holder = ''
		},
		showCity () {
			this.$parent.isHomeShow = false
			this.$parent.isCityShow = true
			this.isShowList = false
			this.$parent.isSearchMetaShow = false
			this.$parent.isCalendarShow = false
			
		},
		closeCity (item) {
			this.$parent.isHomeShow = true
			this.isShowList = true
			this.$parent.isCityShow = false
			this.$parent.isSearchMetaShow = false
			this.$parent.isCalendarShow = false
			this.selectCity(item)
		},
		selectCity(item){
			if (item != '') {
				if(item.city_name_cn==this.$store.state.default_start_city){
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
					this.closeHistoryNameIndex()
					this.changeHighestPrice('')
					this.changeLowestPrice('')
					this.changePriceSort(-1)
				}
				this.changeStartCityCode(item.city_code)
				
			}
		},
		showSearchMeta () {
			this.$parent.isHomeShow = false
			this.isShowList = false
			this.$parent.isCityShow = false
			this.$parent.isSearchMetaShow = true
			this.$parent.isCalendarShow = false
		},
		closeSearchMeta (item) {
			this.$parent.isCalendarShow = false
			this.$parent.isCityShow = false
			this.isShowList = true
			this.$parent.isHomeShow = true
			this.$parent.isSearchMetaShow = false
			this.selectMeta(item)

		},
		selectMeta(item){
				if (item != '') {
				this.changeSearchId(item.meta_code)
				this.changeSearchValue(item.meta_name_cn)
				//this.searchValue = this.$store.state.searchValue
				this.searchValue = item.meta_name_cn
				this.closeHistoryNameIndex()
				this.changeHighestPrice('')
				this.changeLowestPrice('')
				this.changePriceSort(-1)
			}
		},
		onlyCloseCalendar () {
			this.isShowList = true
			this.$parent.isHomeShow = true
			this.$parent.isCalendarShow = false
			this.changeStartDate(this.default_start_date)
			this.changeStartDateValue(this.default_start_date_value)
			this.changeEndDate(this.default_end_date)
			this.changeEndDateValue(this.default_end_date_value)
		},
		 showCalendar () {
			this.$parent.isHomeShow = false
			this.isShowList = false
			this.$parent.isCalendarShow = true
			this.$parent.isSearchMetaShow = false
		},
		closeCalendar (day) {
			this.isShowList = true
			this.$parent.isHomeShow = true
			this.$parent.isCalendarShow = false
			this.changeStartDate(this.default_start_date)
			this.changeStartDateValue(this.default_start_date_value)
			this.changeEndDate(this.default_end_date)
			this.changeEndDateValue(this.default_end_date_value)
			this.changeSelectDay(day)
		},
		closeHistoryNameIndex () {
			this.changeHistoryNameIndex([])
		},
		...mapMutations(['changePriceSort','changeHighestPrice','changeLowestPrice','changeHistoryNameIndex','changeSearchValue','changeSearchId','changeStartCity', 'changeStartCityCode', 'changeStartDate', 'changeEndDate', 'changeStartDateValue', 'changeEndDateValue', 'changeSelectDay'])
    }
}
</script>
<style lang="stylus" scoped>
	.box
		margin-top: .5rem
		width: 100%
		height: 5.6rem
		.citybox
			padding : 0.2rem
			strong
				font-size .6rem
				font-weight: bold
				padding-left: .2rem
				// vertical-align: middle
	.qiehua
		font-size .2rem
		border-radius:.1rem
		background-color :#ccc
	.menu
		display: inline-block
		height :2rem
		width : 100%
		text-align: center
		//padding-left: .5rem
		.menu-item
			height :1.5rem
			display:inline-block
			width : 1.5rem
			text-align : center
		.icon-content
			width :1.5rem
			padding-top: .1rem
		.item-text
			height:.3rem
			font-size:.3rem
			font-weight: bold
			width :1.5rem
			padding-top: .1rem
		.iconfont
			border-radius:50%
			font-size: 0.8rem
			text-align: center
			margin-top :0.01rem
			padding-top: 0.13rem;
			height : 1rem
			width : 1rem
			color: white
			display: inline-block
		.icon-zhusu
			background-color : #48b28d
		.icon-feiji
			background-color : #597cde
		.icon-jingdian
			background-color : #de6b59
		.icon-youji
			background-color : #9859de
	.tab
		width:50%
	.boxtitle
		margin-top: .3rem
		padding-left: .2rem
		font-weight :bold
		font-size :.3rem
	.boxcontent
		margin-top: .1rem
		display:inline
		button
			width: 1.2rem
			height: 1rem
			background-color:#48b28d
			font-size: 0.2rem
			height:0.63rem
			font-weight: bold
			border-radius: 4px
			//padding :.1rem
			// overflow: hidden
			// text-overflow:ellipsis
			// white-space: nowrap
	.search-input
		border-color:#48b28d
		border-width : .1rem
		border-style: solid
		background: #f5f5f5
		border-radius: 4px
		box-sizing: border-box
		width: 4.5rem
		border-radius: .06rem
		color:#000
		font-size: .28rem
		text-indent: .74rem
	.icon
		font-size .1rem
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
			&.button-info
				flex:1
				padding-top:.1rem
				padding-left .1rem
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

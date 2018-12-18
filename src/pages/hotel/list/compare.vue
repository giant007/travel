<template>
	<div>
		<tip-header></tip-header>
		<div class="list-wrapper" v-show="isShowList">
			<meta-calendar ref="metaCalendar" @changeDate="showCalendar" @showCity="showCity"></meta-calendar>
			<all-condition ref="condition"></all-condition>
			<show-item :dataList="dataList" :currPages="currPages" :channels="channels"></show-item>
		</div>
		<slide-animate>
			<home-city :bizType="tabType" ref="cityv" v-show="isCityShow" @closeCity="closeCity" :isCityShow="isCityShow" ></home-city>
		</slide-animate>
		<slide-animate>
			<home-calendar :tabType="tabType" v-show="isCalendarShow" @closeCalendar="closeCalendar" @onlyCloseCalendar="onlyCloseCalendar" :isCalendarShow="isCalendarShow" :isType="isType" :isHotelCalendarType="isHotelCalendarType"></home-calendar>
		</slide-animate>
		<slide-animate>
			<search-meta  ref="metav" v-show="isSearchMetaShow" @closeSearchMeta="closeSearchMeta" :isSearchMetaShow="isSearchMetaShow" :searchValue="searchValue"></search-meta>
		</slide-animate>
	</div>
</template>

<script>
import MetaCalendar from 'hotel/list/components/MetaCalendar'
import { mapState, mapMutations } from 'vuex'
import ShowItem from 'hotel/list/components/showItem'
import SlideAnimate from 'common/Animate'
import AllCondition from 'hotel/list/components/allCondition'
import HomeCalendar from 'common/Calendar'
import HomeCity from 'common/city/City'
import SearchMeta from 'common/city/components/SearchMeta'
import merge from 'webpack-merge'
import TipHeader from 'common/TipHeader'

import axios from 'axios'
export default {
	name: 'OneCompare',
	components: {
		MetaCalendar,
		SlideAnimate,
		ShowItem,
		AllCondition,
		HomeCalendar,
		HomeCity,
		SearchMeta,
		TipHeader,
		isLaunch: false
	},
	metaInfo (){
		return {
			title: "${metaName}旅游攻略_酒店预订_${metaName}一日游_机票酒店全网比价『佳乐比』",
			meta: [
			{
				name: "keywords",
				content: "${metaName}旅行攻略,${metaName}酒店预订,酒店比价,酒店比价网,旅游酒店"
			},
			{
				name: "description",
				content: "佳乐比旅行是专门为旅行者打造的一款省时省力的机票、酒店全网比价平台，她的特点为实时根据地标、景点、地铁站、医院等条件精准搜索渠道酒店"
			}]
		}
	},
	data () {
		return {
			tabType:"hotel",
			searchValue: '',
			isSearchMetaShow: false,
			isCityShow: false,
			isShowPrice: false,
			isCalendarShow: false,
			isHomeShow: true,
			isHotelCalendarType: 'home',
			isShowList: true,
			isType: 'multi',
			currPages: [],
			code: 0,
			total: 0,
			finish: false,
			timeout: 10000,
			findFristPage: undefined,
			dataList: [],
			channels: new Object(),
			channelsCount: 0,
			handleCompleteHotelCount: 0,
			maxHandleCompleteHotelCount: 10,
			cron: null,
			metaName: this.$store.state.default_start_city
		}
	},
	computed: {
		...mapState(['historyNameIndex','default_start_date', 'default_start_date_value', 'default_end_date', 'default_end_date_value'])
	},
	methods: {
		launch () {
			// var params = new URLSearchParams()
			// params.append('checkinTime',this.$route.query.checkinTime)
			// params.append('checkoutTime',this.$route.query.checkoutTime)
			// params.append('metaId',this.$route.query.metaId)
			// params.append('sort',1)
			// params.setTimeout(200)
			let params = {}
			params.checkinTime = this.$store.state.default_start_date_value
			params.checkoutTime = this.$store.state.default_end_date_value
			params.sort = 1
			if(this.$store.state.searchId&&this.$store.state.searchId!=-1){
				params.metaId = this.$store.state.searchId
			}else{
				return ;
			}
			axios.post(this.$store.state.hotelPathUrl + '/hsearch/launch', params).then((res)=>{
				//console.log(res)
			})
			
			this.findFristPage = setInterval(this.queryHotels,2000,1,this.dataList)
		},
		queryHotels (page,list,func) {
			// var params = new URLSearchParams()
			// params.append('checkinTime',this.$route.query.checkinTime)
			// params.append('checkoutTime',this.$route.query.checkoutTime)
			// params.append('metaId',this.$route.query.metaId)
			// params.append('page',page)
			// params.setTimeout(2000)
			let params = {}
			params.checkinTime = this.$store.state.default_start_date_value
			params.checkoutTime = this.$store.state.default_end_date_value
			if(this.$store.state.searchId&&this.$store.state.searchId!=-1){
				params.metaId = this.$store.state.searchId
			}else{
				return ;
			}

			if(this.$store.state.lowestPrice&&this.$store.state.lowestPrice!=-1){
				params.lowestPrice = this.$store.state.lowestPrice
			}
			if(this.$store.state.highestPrice&&this.$store.state.highestPrice!=-1){
				params.highestPrice = this.$store.state.highestPrice
			}
			if(this.$store.state.priceSort&&this.$store.state.priceSort!=-1){
				params.priceSort = this.$store.state.priceSort
			}
			params.page = page
			if(!this.isInArray(this.currPages,page)){
				axios.post(this.$store.state.hotelPathUrl + '/hsearch/queryHotels',params,{timeout:1000})
				.then((res)=>{
					this.handleQueryHotels(res,page,list)
					if(func){
						func(this,page)
					}
				})
			}
		},
		loadChannels (func,b){
			if(JSON.stringify(this.channels) == "{}"){
				axios.get(this.$store.state.hotelPathUrl + '/hmeta/getChannels')
				.then((res)=>{
					res.data.channels.forEach((item,index)=>{
					this.channelsCount++
					this.channels[item.channelCode] = item.channelName	
				})
				func(b)
			})
			}
		},
		handleQueryHotels (res,page,list){
			if (res.data && res.data.code == '1') {
				let data = res.data
				if(res.data.hotels!=undefined&&res.data.hotels.length != 0){
					if(page==1){
						clearInterval(this.findFristPage)
					}
					if(this.isInArray(this.currPages,page)){
							return
					}else{
						this.pushDataList(list,res,false)
						if(res.data.hotels&&res.data.hotels.length!=0){
							this.currPages.push(page)
						}
					}
				}
			}
		},
		pushDataList (dataList,res,isHistory) {
			let mapNameIndexHotel = new Object()
			for(let key in res.data.hotels) {
				let arrIt = res.data.hotels[key]
				let cPrices = null
				try{
				 cPrices = JSON.parse(arrIt.channelPrices)
				}catch(e){
					console.log(e)
				}
				let totalScore = 0,totalCommentCount = 0,cPricesLength = 0
				for(let key in cPrices){
					totalCommentCount = totalCommentCount + cPrices[key].commentCount
					cPrices[key].channelName = this.channels[cPrices[key].channel]
					let score = cPrices[key].score
					if(score&&score!=0&&score!=''){
						cPricesLength++
						totalScore = totalScore + parseFloat(score)
					}
				}
				if(cPricesLength!=0){
					arrIt.score = (totalScore / cPricesLength).toFixed(1)
				}
				arrIt.commentCount = totalCommentCount
				arrIt.cPrices = cPrices
				arrIt.isHistory = isHistory
				let indexArr = this.getNameIndexArr()
				if(!isHistory){
					if(this.isInArray(indexArr,arrIt.nameIndex)){
						continue;
					}
					dataList.push(arrIt)
					this.$refs.condition.closeProgressBar()
				}else{
					// if(!this.isInArray(indexArr)){
					mapNameIndexHotel[arrIt.nameIndex] = arrIt
					// }
				}
			}
			if(isHistory){
				let indexArr ;
				indexArr = this.getNameIndexArr()
					for(let i = indexArr.length-1;i>=0;i--){
						let nameIndex = indexArr[i]
						dataList.push(mapNameIndexHotel[nameIndex])
					}

			}
		},
		isInArray (arr,val) {
		　　var testStr=','+arr.join(",")+"," 
		　　return testStr.indexOf(","+val+",")!=-1 
		},
		showCalendar () {
			this.isShowList = false
			this.isCalendarShow = true
			this.isSearchMetaShow = false
		},
		showCity () {
			this.isHomeShow = false
			this.isCityShow = true
			this.isShowList = false
			this.isSearchMetaShow = false
			this.isCalendarShow = false
			
		},
		closeCity (item) {
			this.isHomeShow = true
			this.isShowList = true
			this.isCityShow = false
			this.isSearchMetaShow = false
			this.isCalendarShow = false
			this.selectCity(item)
			if(item!=''){
				this.toCityCompare()
				//this.$router.go(0)
			}
		},
		toCityCompare(){
			this.$router.replace({
				path: '/hotel/compare',
				query: {
				'metaName':this.$store.state.default_start_city
				}
			})
			window.location.reload()
			// this.$router.push({
			// 	path: '/hotel/compare?metaName='+this.$store.state.default_start_city
			// })
		},
		showSearchMeta () {
			this.isHomeShow = false
			this.isShowList = false
			this.isCityShow = false
			this.isSearchMetaShow = true
			this.isCalendarShow = false
		},
		closeSearchMeta (item) {
			this.isCalendarShow = false
			this.isCityShow = false
			this.isShowList = true
			this.isSearchMetaShow = false
			this.selectMeta(item)
			if (item != '') {
				this.toMetaCompare()
				//this.$router.go(0)
			}
		},
		onlyCloseCalendar () {
			this.isShowList = true
			this.isCalendarShow = false
			this.changeStartDate(this.default_start_date)
			this.changeStartDateValue(this.default_start_date_value)
			this.changeEndDate(this.default_end_date)
			this.changeEndDateValue(this.default_end_date_value)
		},
		closeCalendar (day) {
			this.isShowList = true
			this.isCalendarShow = false
			this.changeStartDate(this.default_start_date)
			this.changeStartDateValue(this.default_start_date_value)
			this.changeEndDate(this.default_end_date)
			this.changeEndDateValue(this.default_end_date_value)
			this.changeSelectDay(day)
			this.$router.push({
			query: merge(this.$route.query, {'flightDate': this.default_start_date_value, 'returnFlightDate': this.default_end_date_value})
			})
			window.location.reload()
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
		toMetaCompare(){
			this.$router.replace({
				path: '/hotel/compare',
				query: {
				'cityId': this.$store.state.default_start_city_code,
				'metaName': this.$store.state.searchValue
				}
			})
			window.location.reload()
			// this.$router.push({
			// 	path: '/hotel/compare?cityId='+this.$store.state.default_start_city_code+"&metaName="+this.$store.state.searchValue
			// })
		},
		selectMeta(item){
				if (item != '') {
				this.changeSearchId(item.meta_code)
				this.changeSearchValue(item.meta_name_cn)
				//this.searchValue = this.$store.state.searchValue
				this.searchValue = item.meta_name_cn
				this.$refs.metaCalendar.updateShowMetaValue(this.searchValue)
				this.closeHistoryNameIndex()
				this.changeHighestPrice('')
				this.changeLowestPrice('')
				this.changePriceSort(-1)
			}
		},
		pushHistoryNameIndex (nameIndex) {
			//alert(this.$store.state.historyNameIndex[0])
			let indexArr ;
			indexArr = this.getNameIndexArr()
			if(!this.isInArray(indexArr,nameIndex)){
				indexArr.push(nameIndex)
				this.changeHistoryNameIndex(indexArr)
			}
		},
		closeHistoryNameIndex () {
			this.changeHistoryNameIndex([])
		},
		getNameIndexArr () {
			let historyNameIndex = this.$store.state.historyNameIndex;
			if(typeof  historyNameIndex == "string"){
				historyNameIndex = historyNameIndex.split(",")
			}
			return historyNameIndex;
		},
		setTitle(callback,param1){
			let meta = []
			if(this.$route.query.metaName){
				if(document.title.startsWith("$")||document.title.startsWith("旅游攻略")){
					document.title = this.$route.query.metaName+"旅游攻略_酒店预订_"+this.$route.query.metaName+"一日游_酒店全网比价『佳乐比旅行』"
					if(this.$route.query.cityId==this.$store.state.default_start_city_code||this.$route.query.metaName==this.$store.state.default_start_city){
						callback(param1)
					}else{
						if(this.$route.query.cityId){
							this.$refs.metav.searchMeta(meta,this.$route.query.cityId,this.$route.query.metaName,this.selectMeta,callback,param1)
						}else{
							this.$refs.cityv.searchCity(meta,this.$route.query.metaName,this.selectCity,callback,param1)
						}
					}
				}else{
					if(this.$route.query.cityId){
						this.$refs.metav.searchMeta(meta,this.$route.query.cityId,this.$route.query.metaName,this.selectMeta,callback,param1)
					}else{
						this.$refs.cityv.searchCity(meta,this.$route.query.metaName,this.selectCity,callback,param1)
					}
				}
				let content = document.getElementsByTagName("meta")["keywords"].content
				if(content.startsWith("$")||content.startsWith("旅游攻略")){
					document.getElementsByTagName("meta")["keywords"].content = this.metaName+"旅行攻略,"+this.metaName+"酒店预订,酒店比价,酒店比价网,旅游酒店"
				}
			}else{
				callback(param1)
			}
		},
		queryHistoryNameIndex (func) {
			let params = new Object();
			params.nameIndexs = this.getNameIndexArr()
			if(params.nameIndexs.length==0){
				return ;
			}
			params.checkinTime = this.$store.state.default_start_date_value
			params.checkoutTime = this.$store.state.default_end_date_value
			if(this.$store.state.searchId&&this.$store.state.searchId!=-1){
				params.metaId = this.$store.state.searchId
			}else{
				return ;
			}
			axios.post(this.$store.state.hotelPathUrl + '/hsearch/searchDetailByNames', params)
				.then((res)=>{
					if(res&&res.data&&res.data.hotels.length!=0){
						this.pushDataList(this.dataList,res,true)
					}
					if(res&&res.data&&res.data.hotels.length==0){
						this.closeHistoryNameIndex()
					}
					this.queryHotels(1,this.dataList,func)
				})
		},
		handleCompleteHotelMsg () {
			if(this.handleCompleteHotelCount++>this.maxHandleCompleteHotelCount){
				if(this.cron){
					clearInterval(this.cron)
				}
				return
			}
			let params = new Object();
			params.checkinTime = this.$store.state.default_start_date_value
			params.checkoutTime = this.$store.state.default_end_date_value
			if(this.$store.state.searchId&&this.$store.state.searchId!=-1){
				params.metaId = this.$store.state.searchId
			}else{
				return ;
			}
			params.nameIndexs = [];
			let nameIndexI = new Object();
			for(let i = 0;i<this.dataList.length;i++){
				let hotel = this.dataList[i]
				if(this.dataList[i].hotelCount!=this.channelsCount){
					params.nameIndexs.push(hotel.nameIndex)
					nameIndexI[hotel.nameIndex] = i
				}
			}
			if(params.nameIndexs.length!=0){
				axios.post(this.$store.state.hotelPathUrl + '/hsearch/searchByNames', params)
				.then((res)=>{
					if(res.data.hotels){
						for(let hotelIndex in res.data.hotels){
							let arrIt = res.data.hotels[hotelIndex] 
							let currCprices = this.dataList[nameIndexI[arrIt.nameIndex]].cPrices
							let cPrices = JSON.parse(arrIt.channelPrices)
							let totalScore = 0,totalCommentCount = 0,cPricesLength = 0
							for(let key in cPrices){ 
								if(currCprices[key]){
									continue
								}else{
									cPrices[key].channelName = this.channels[cPrices[key].channel]
									currCprices[key] = cPrices[key]
								}
							}
							let hotelCount = 0
							for(let key in currCprices){
								totalCommentCount = totalCommentCount + currCprices[key].commentCount
								let score = currCprices[key].score
								hotelCount++
								if(score&&score!=0&&score!=''&&score!='0'){
									cPricesLength++
									totalScore = totalScore + parseFloat(score)
								}
								if(currCprices[key].price&&currCprices[key].price<this.dataList[nameIndexI[arrIt.nameIndex]].price){
									this.dataList[nameIndexI[arrIt.nameIndex]].price = currCprices[key].price
								} 
							}
							if(cPricesLength!=0){
								this.dataList[nameIndexI[arrIt.nameIndex]].score = (totalScore / cPricesLength).toFixed(1)
							}
							this.dataList[nameIndexI[arrIt.nameIndex]].hotelCount = hotelCount
							this.dataList[nameIndexI[arrIt.nameIndex]].commentCount = totalCommentCount
						}
					}
				})
			}
				
		},
		delayCcmpleteHotelMsg () {
			this.cron = setInterval(this.handleCompleteHotelMsg,4000)
		},
		completeHotelMsg () {
			setTimeout(this.delayCcmpleteHotelMsg(),3000)
		},
		...mapMutations(['changePriceSort','changeHighestPrice','changeLowestPrice','changeHistoryNameIndex','changeSearchValue','changeSearchId','changeStartCity', 'changeStartCityCode', 'changeStartDate', 'changeEndDate', 'changeStartDateValue', 'changeEndDateValue', 'changeSelectDay'])
	},
	activated () {
		let fun = function(b){
			let func = function(b){
				let func2 = function (b,currpage){
					if(b.dataList.length==0&&currpage==1&&!b.isLaunch){
						b.isLaunch = true
						b.launch()
					}
					b.completeHotelMsg()
				}
				if(b.getNameIndexArr().length!=0){
					b.queryHistoryNameIndex(func2)
				}else{
					b.queryHotels(1,b.dataList,func2)
				}
			}
			b.loadChannels(func,b)
		}
		if(this.$route.query.metaName&&this.$route.query.cityId){
			axios.get(this.$store.state.hotelPathUrl + '/hmeta/getMeta?metaId='+this.$route.query.cityId).then((res)=>{
				this.changeStartCity(res.data.name)
				this.changeStartCityCode(this.$route.query.cityId)
				this.setTitle(fun,this)
			})
		}else{
			this.setTitle(fun,this)
		}
	},
	deactivated () {
		this.$destroy(true)
	}
}
</script>

<style lang="stylus" scoped>
</style>

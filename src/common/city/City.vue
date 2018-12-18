<template>
	<div class="city-wrapper">
		<city-search :bizType="bizType" :cities="cities" @selectcity="selectChangeCity" ></city-search>
		<tab-nav :tabList="tabList" :bizType="bizType" @changeTab="changeTab">
			<city-list :cities="cities" :hot_cities="hot_cities" :history_cities="history_cities" :letter="letter" :tabType="tabType" @selectcity="selectChangeCity" :isCityShow="isCityShow"></city-list>
			<city-alphabet :cities="alphabets" @change="handleLetterChange" @selectcity="selectChangeCity"></city-alphabet>
		</tab-nav>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import TabNav from 'common/TabNav'
import CityList from 'common/city/components/List'
import CityAlphabet from 'common/city/components/Alphabet'
import CitySearch from 'common/city/components/Search'
export default {
	name: 'City',
	props: {
		isCityShow: Boolean,
		tabType: {type: String, default:'single'},
		bizType: {type: String,default: 'flight'}
	},
	components: {
		TabNav,
		CityList,
		CityAlphabet,
		CitySearch
	},
	data () {
		return {
			tabList: [
				{
					type: 'single',
					name: '国内'
				}//,
				// {
				// 	type: 'return',
				// 	name: '国际/港澳台'
				// }
			],
			cities: [],
			hot_cities: [],
			history_cities: [],
			retData: [],
			alphabets: [],
			letter: ''
		}
	},
	methods: {
		changeTab (tab) {
			this.tabType = tab.type
			if(this.bizType!='hotel'){
				if (this.tabType == 'single') {
					this.changeCity('domestic')
				} else {
					this.changeCity('internation')
				}
			}
		},
		getCity () {
			let cityUrl = '/api/flight/getCitys'
			if(this.bizType=="hotel"){
				cityUrl = this.$store.state.hotelPathUrl+'/hmeta/getHotCitys'
			}
			axios.get(cityUrl)
				.then(this.handleCity)
		},
		handleCity (res) {
			//lyq start
				if(this.bizType=="hotel"){
					res.state = true
					res.data.state = true
					res.data.domesticHot = []
					for(let key in res.data.citys){
						let newCity = new Object();
						let city = res.data.citys[key]
						newCity.area_code = ""
						newCity.area_name_cn = ""
						newCity.city_code = city.id
						newCity.city_name_cn = city.name
						newCity.city_name_en = city.enName
						newCity.representMetaId = city.representMetaId
						newCity.country_code = "CN"
						newCity.country_name_cn = "中国"
						newCity.country_name_en = "China"
						newCity.start_char = city.firstChar
						res.data.domesticHot.push(newCity)
					}
				}else{
					res = res.data
				}
			//lyq end
			if (res.state == true && res.data) {
				this.retData = res.data
				this.changeCity('domestic')
			}
		},
		searchCity (result,keyword,callback,callBack2,param1) {
			axios.get(this.$store.state.hotelPathUrl + '/hmeta/searchCity',{
    				params: {
						search: keyword
					}
				})
				.then((res)=>{	
					if(res&&res.data&&res.data.data){
						let data  = res.data.data
						let isCallBack = false
						for(let key in data){
							let newCity = new Object();
							let city = data[key]
							newCity.city_code = city.id
							newCity.city_name_cn = city.name
							newCity.representMetaId = city.representMetaId
							result.push(newCity);
							if(!isCallBack&&callback&&callBack2){
								isCallBack = true;
								callback(newCity)
								callBack2(param1)
							}
							
						}
					}
				})
		},
		changeCity (type) {
			this.cities = []
			this.hot_cities = []
			this.alphabets = []
			this.history_cities = []
			let tmpArr = []
			if (type == 'domestic') {
				this.cities = this.retData.domestic
				this.handleHotCity(this.retData.domesticHot)
				if (this.default_domestic_history_city != '') {
					tmpArr = JSON.parse(this.default_domestic_history_city)
				}
			} else {
				if(this.bizType!="hotel"){
					this.cities = this.retData.internation
					this.handleHotCity(this.retData.internationHot)
					if (this.default_internet_history_city != '') {
						tmpArr = JSON.parse(this.default_internet_history_city)
					}
				}
			}

			tmpArr.map((item) => {
				item && this.history_cities.push(item)
			})
			if(this.bizType!="hotel"){
				this.changeAlphabet()
			}
		},
		changeAlphabet () {
			let result = []
			this.cities.forEach((item) => {
				result.push(item)
			})
			result.unshift({start_char: '历史'})
			result.unshift({start_char: '热门'})
			this.alphabets = result
		},
		handleHotCity (hotCities) {
			//lyq start
			if(this.bizType=="hotel"){
				this.handleHotelHotCity(hotCities)
			}else{//lyq end
				for (let key in hotCities) {
					let hCities = hotCities[key]['cities']
					for (let sKey in hCities) {
						this.hot_cities.push(hCities[sKey])
					}
				}
			}
		},
		//lyq
		handleHotelHotCity (hotCities) {
			for (let key in hotCities) {
				this.hot_cities.push(hotCities[key])
			}
		}
		,
		handleLetterChange (letter) {
			switch (letter) {
				case '热门':
					letter = 'hot'
					break
				case '历史':
					letter = 'history'
					break
			}
			this.letter = letter
		},
		selectChangeCity (item) {
			this.$emit('closeCity', item)
		}
	},
	computed: {
		...mapState(['default_domestic_history_city']),
		...mapState(['default_internet_history_city'])
	},
	mounted () {
		this.getCity()
	}
}
</script>

<style lang="stylus" scoped>
	.city-wrapper
		position: absolute
		top: 0
		left: 0
		bottom: 0
		right: 0
		z-index: 2
		background: #fff
</style>

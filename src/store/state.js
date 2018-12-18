import { getCurDate, getNextDate, getCurDateValue, getNextDateValue } from '../utils/date'
import { isNumber } from 'util'

let defaultTabType = 'single'

let defaultStartCity = '广州'

let defaultEndCity = '北京'

let defaultStartCityCode = 'CAN'

let defaultEndCityCode = 'BJS'

let hotelPathUrl = 'http://m.jlbtrip.com/'
// let hotelPathUrl = 'http://127.0.0.1/'
let travelPathUrl = 'http://m.jlbtrip.com/'
let refferer = ''

// let hotelPathUrl = 'http://localhost/'

let defaultDomesticHistoryCity = ''

let defaultInternetHistoryCity = ''

let defaultStartDate = getCurDate()

let defaultEndDate = getNextDate()

let defaultStartDateValue = getCurDateValue()

let defaultEndDateValue = getNextDateValue()

let defaultPriceList = ''

let defaultSelectDay = ''

let priceSort = 0
let searchValue = ''
let searchId = 21227
let lowestPrice = -1
let highestPrice = -1

let historyNameIndex = []
let cityMetas = {
	'metro': '地铁',
	'scenic': '景点',
	'hospital': '医院',
	'location': '区域',
	'zone': '商区',
	'subcity': '行政区',
	'station': '车站',
	'university': '大学'
}
let metaTypes = {
	'city': '市',
	'metro': '地铁',
	'scenic': '景点',
	'hospital': '医院',
	'location': '区域',
	'zone': '商区',
	'subcity': '行政区',
	'station': '车站',
	'airport': '飞机场',
	'university': '大学'
}

let tipMetaId = 0
let tipMenuId = 0
let tipGuideId = 0
let tipMenuName = ''

try {
	if (localStorage.tipMetaId) {
		tipMetaId = localStorage.tipMetaId
	}
	if (localStorage.tipMenuId) {
		tipMenuId = localStorage.tipMenuId
	}
	if (localStorage.tipGuideId) {
		tipGuideId = localStorage.tipGuideId
	}
	if (localStorage.tipMenuName) {
		tipMenuName = localStorage.tipMenuName
	}

	if (localStorage.tab_type) {
		defaultTabType = localStorage.tab_type
	}

	if (localStorage.default_start_city) {
		defaultStartCity = localStorage.default_start_city
	}

	if (localStorage.default_end_city) {
		defaultEndCity = localStorage.default_end_city
	}

	if (localStorage.default_start_city_code) {
		defaultStartCityCode = localStorage.default_start_city_code
	}

	if (localStorage.default_end_city_code) {
		defaultEndCityCode = localStorage.default_end_city_code
	}

	if (localStorage.default_domestic_history_city) {
		defaultDomesticHistoryCity = localStorage.default_domestic_history_city
	}

	if (localStorage.default_internet_history_city) {
		defaultInternetHistoryCity = localStorage.default_internet_history_city
	}

	if (localStorage.default_start_date) {
		defaultStartDate = localStorage.default_start_date
	}

	if (localStorage.default_end_date) {
		defaultEndDate = localStorage.default_end_date
	}

	if (localStorage.default_start_date_value) {
		defaultStartDateValue = localStorage.default_start_date_value
	}

	if (localStorage.default_end_date_value) {
		defaultEndDateValue = localStorage.default_end_date_value
	}

	if (localStorage.default_price_list) {
		defaultPriceList = localStorage.default_price_list
	}

	if (localStorage.default_select_day) {
		defaultSelectDay = localStorage.default_select_day
	}
	if (localStorage.searchValue) {
		searchValue = localStorage.searchValue
	}
	if (localStorage.searchId) {
		searchId = localStorage.searchId
	}
	if (localStorage.cityMetas) {
		cityMetas = localStorage.cityMetas
	}
	if (localStorage.historyNameIndex) {
		historyNameIndex = localStorage.historyNameIndex
	}
	if (localStorage.priceSort) {
		priceSort = localStorage.priceSort
	}
	if (localStorage.lowestPrice) {
		lowestPrice = localStorage.lowestPrice
	}
	if (localStorage.highestPrice) {
		highestPrice = localStorage.highestPrice
	}
	if (localStorage.refferer) {
		refferer = localStorage.refferer
	}

	// lyq 酒店飞机切换
	if ((window.location.href.indexOf('hotel') !== -1 || window.location.href.indexOf('m.') !== -1) && isNaN(defaultStartCityCode)) {
		defaultStartCityCode = 452
		defaultStartCity = '广州'
		cityMetas = {
			'metro': '地铁',
			'scenic': '景点',
			'hospital': '医院',
			'location': '区域',
			'zone': '商区',
			'subcity': '行政区',
			'station': '车站',
			'university': '大学'
		}
	} else if ((window.location.href.indexOf('localhost') == -1 && window.location.href.indexOf('127.0.0.1') == -1) && (window.location.href.indexOf('www.jlbtrip.com') !== -1 || window.location.href.indexOf('flight.jlbtrip.com') !== -1) && !isNaN(defaultStartCityCode)) {
		defaultStartCityCode = 'CAN'
		defaultStartCity = '广州'
	}
} catch(e) {}

export default {
	tipMetaId: tipMetaId,
	tipMenuId: tipMenuId,
	tipGuideId: tipGuideId,
	tipMenuName: tipMenuName,
	tab_type: defaultTabType,
	default_start_city: defaultStartCity,
	default_end_city: defaultEndCity,
	default_start_city_code: defaultStartCityCode,
	default_end_city_code: defaultEndCityCode,
	default_domestic_history_city: defaultDomesticHistoryCity,
	default_internet_history_city: defaultInternetHistoryCity,
	default_start_date: defaultStartDate,
	default_end_date: defaultEndDate,
	default_start_date_value: defaultStartDateValue,
	default_end_date_value: defaultEndDateValue,
	default_price_list: defaultPriceList,
	default_select_day: defaultSelectDay,
	hotelPathUrl: hotelPathUrl,
	travelPathUrl: travelPathUrl,
	searchValue: searchValue,
	searchId: searchId,
	priceSort: priceSort,
	lowestPrice: lowestPrice,
	highestPrice: highestPrice,
	metaTypes: metaTypes,
	cityMetas: cityMetas,
	historyNameIndex: historyNameIndex,
	refferer: refferer
}
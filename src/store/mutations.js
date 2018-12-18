export default {
	changeCurTab (state, type) {
		state.tab_type = type
		try {
			localStorage.tab_type = type
		} catch (e) {
		}
	},

	changeStartCity (state, city) {
		state.default_start_city = city
		try {
			localStorage.default_start_city = city
		} catch (e) {
		}
	},

	changeEndCity (state, city) {
		state.default_end_city = city
		try {
			localStorage.default_end_city = city
		} catch (e) {
		}
	},

	changeStartCityCode (state, code) {
		state.default_start_city_code = code
		try {
			localStorage.default_start_city_code = code
		} catch (e) {
		}
	},

	changeEndCityCode (state, code) {
		state.default_end_city_code = code
		try {
			localStorage.default_end_city_code = code
		} catch (e) {
		}
	},

	changeDomesticHistoryCity (state, item) {
		state.default_domestic_history_city = item
		try {
				localStorage.default_domestic_history_city = item
		} catch (e) {
		}
	},

	changeInternetHistoryCity (state, item) {
		state.default_internet_history_city = item
		try {
				localStorage.default_internet_history_city = item
		} catch (e) {
		}
	},

	changeStartDate (state, date) {
		state.default_start_date = date
		try {
			localStorage.default_start_date = date
		} catch (e) {
		}
	},

	changeEndDate (state, date) {
		state.default_end_date = date
		try {
			localStorage.default_end_date = date
		} catch (e) {
		}
	},

	changeStartDateValue (state, date) {
		state.default_start_date_value = date
		try {
			localStorage.default_start_date_value = date
		} catch (e) {
		}
	},

	changeEndDateValue (state, date) {
		state.default_end_date_value = date
		try {
			localStorage.default_end_date_value = date
		} catch (e) {
		}
	},
	changeRefferer(state,refferer){
	//	let refferer = obj.refferer
		state.refferer = refferer
		try {
			localStorage.refferer = refferer
			
		} catch (e) {
		}
	},
	changePriceList (state, item) {
		state.default_price_list = item
		try {
			localStorage.default_price_list = item
		} catch (e) {
		}
	},

	changeSelectDay (state, day) {
		state.default_select_day = day
		try {
			localStorage.default_select_day = day
		} catch (e) {
		}
	},

	changeSearchValue (state, searchValue) {
		state.searchValue = searchValue
		try {
			localStorage.searchValue = searchValue
		} catch (e) {
		}
	},
	changeSearchId (state, searchId) {
		state.searchId = searchId
		try {
			localStorage.searchId = searchId
		} catch (e) {
		}
	},
	changePriceSort (state, priceSort) {
		state.priceSort = priceSort
		try {
			localStorage.priceSort = priceSort
		} catch (e) {
		}
	},
	changeLowestPrice (state, lowestPrice) {
		state.lowestPrice = lowestPrice
		try {
			localStorage.lowestPrice = lowestPrice
		} catch (e) {
		}
	},
	changeHighestPrice (state, highestPrice) {
		state.highestPrice = highestPrice
		try {
			localStorage.highestPrice = highestPrice
		} catch (e) {
		}
	},
	changeCityMetas (state, cityMetas) {
		state.cityMetas = cityMetas
		try {
			localStorage.cityMetas = cityMetas
		} catch (e) {
		}
	},
	changeHistoryNameIndex (state,historyNameIndex) {
	//	if(!(state.historyNameIndex)){
			state.historyNameIndex = historyNameIndex
	//	}
	//	state.historyNameIndex.push(nameIndex)
		try {
			//if(!(localStorage.historyNameIndex)){
				localStorage.historyNameIndex = historyNameIndex
		//	}
		//	localStorage.historyNameIndex.push(nameIndex)
		} catch (e) {
		}
	},
	changeTipMenuName (state, tipMenuName) {
		state.tipMenuName = tipMenuName
		try {
			tipMenuName.tipMenuName = tipMenuName
		} catch (e) {
		}
	},
	changeTipGuideId (state, tipGuideId) {
		state.tipGuideId = tipGuideId
		try {
			localStorage.tipGuideId = tipGuideId
		} catch (e) {
		}
	},
	changeTipMenuId (state, tipMenuId) {
		state.tipMenuId = tipMenuId
		try {
			localStorage.tipMenuId = tipMenuId
		} catch (e) {
		}
	},
	changeTipMetaId (state, tipMetaId) {
		state.tipMetaId = tipMetaId
		try {
			localStorage.tipMetaId = tipMetaId
		} catch (e) {
		}
	}
}

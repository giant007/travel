<template>
	<div class="search-wrapper">
		<div class="search">
			<div class="iconfont icon-fanhui" @click="goBack"></div>
			<input class="search-input" v-model="keyword" type="text" :placeholder="holder" @focus="emptyHold"/>
			<div class="iconfont icon-search"></div>
			<div v-if="hasKeyWord" class="iconfont icon-iconfontclose" @click="resetData"></div>
		</div>
		<div class="search-content" ref="search" v-show="keyword">
			<ul>
				<li class="search-item border-bottom" v-for="(item, index) of list" :key="index" @click="handleCity(item)">{{ item.city_name_cn }}</li>
				<li class="search-item border-bottom" v-show="hasList">没有找到匹配项目</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
import Bscroll from 'better-scroll'
export default {
	props: {
		bizType:{type:String,default:'flight'},
		cities: Array,
	},
	data () {
		return {
			keyword: '',
			list: [],
			timer: null,
			holder: '搜索目的地',
			click: { type: Boolean, default: true }
		}
	},
	methods: {
		emptyHold () {
			this.holder = ''
		},
		goBack () {
			this.$emit('selectcity', '')
		},
		handleCity (item) {
			this.$emit('selectcity', item)
		},
		...mapMutations(['changeStartCity']),
		...mapMutations(['changeEndCity']),
		resetData () {
			this.list = []
			this.keyword = ''
		},
		searchCity (result) {
			this.$parent.searchCity(result,this.keyword)
			// axios.get(this.$store.state.hotelPathUrl + '/hmeta/searchCity',{
    		// 		params: {
			// 			search: this.keyword
			// 		}
			// 	})
			// 	.then((res)=>{
					
			// 		if(res&&res.data&&res.data.data){
			// 			let data  = res.data.data
			// 			for(let key in data){
			// 				let newCity = new Object();
			// 				let city = data[key]
			// 				newCity.city_code = city.id
			// 				newCity.city_name_cn = city.name
			// 				newCity.representMetaId = city.representMetaId
			// 				result.push(newCity);
			// 			}
			// 		}
			// 	})
		}
	},
	computed: {
		hasList () {
			return !this.list.length
		},
		hasKeyWord () {
			return this.keyword
		}
	},
	watch: {
		keyword () {
			if (this.timer) {
				clearTimeout(this.timer)
			}
			if (!this.keyword) {
				this.list = []
				return
			}
			let vm = this
			this.timer = setTimeout(() => {
				const result = []
				//lyq start
			if(vm.bizType!="hotel"){
				for (let i in vm.cities) {
					vm.cities[i].cities.forEach((value) => {
						let cityNameEn = value.city_name_en.toLowerCase()
						if (cityNameEn.indexOf(vm.keyword) > -1 ||
							value.city_name_cn.indexOf(vm.keyword) > -1) {
							result.push(value)
						}
					})
				}
			}else{
				vm.searchCity(result);
			}
				this.list = result
			}, 100)
		}
	},
	mounted () {
		this.scroll = new Bscroll(this.$refs.search, {click: this.click})
	}
}
</script>

<style lang="stylus" scoped>
	::-webkit-input-placeholder
		color:#bbb
	.search-wrapper
		height: 1rem
		background: #48b28d
	.search
		height: 1rem
		
		position:relative
		.icon-fanhui
			position: absolute;
			left: .28rem;
			top: .32rem;
			color: #000;
			font-size: .48rem;
			before { content: "\e601"; }
		.icon-iconfontclose
			color: #dfdfdf
			position: absolute
			right: .5rem
			top: .35rem
		.search-input
			background: #f5f5f5
			border-radius: 4px
			box-sizing: border-box
			width: 6.3rem
			border-radius: .06rem
			padding: .15rem 0
			color:#000
			font-size: .28rem
			margin: .15rem 0 0 .9rem
			text-indent: .74rem
		.icon-search
			position:absolute
			left: 1.1rem
			top: 0.35rem
	.search-content
		z-index:1
		overflow:hidden
		position:absolute
		top: 1rem
		left:0
		right:0;
		bottom:0
		background:#eee
		.search-item
			line-height: 1rem
			padding-left: 0.3rem
			font-size: 0.28rem
			color: #333
			background:#fff
</style>

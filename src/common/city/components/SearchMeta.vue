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
				<li class="search-item border-bottom" v-for="(item, index) of metaList" :key="index" @click="handleMeta(item)">{{ item.meta_name_cn }}   <u>{{item.type}}</u></li>
				<li class="search-item border-bottom" v-show="hasList">没有找到匹配项目</li>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import Bscroll from 'better-scroll'
export default {
	name: 'SearchMeta',
	props: {
		
		isSearchMetaShow: null
	},
	data () {
		return {
			searchValue: '',
			metaList: [],
			timer: null,
			holder: '搜索关键字',
			keyword: '',
			click: { type: Boolean, default: true }
		}
	},
	methods: {
		emptyHold () {
			this.holder = ''
		},
		goBack () {
			this.$emit('closeSearchMeta', '')
		},
		handleMeta (item) {
			this.$emit('closeSearchMeta',item)
			this.searchValue = this.$store.state.searchValue
		},
		resetData () {
			this.metaList = []
			this.searchValue = ''
		},
		searchMeta (result,cityCode,keyword,callback,callBack2,param1) {
			if(cityCode == undefined){
				cityCode = this.$store.state.default_start_city_code
			}
			if(keyword == undefined){
				keyword = this.keyword
			}
			axios.get(this.$store.state.hotelPathUrl + '/hmeta/searchMeta',{
    				params: {
						cityId: parseInt(cityCode),
						search: keyword
					}
				})
				.then((res)=>{
					let isCallBack = false
					if(res&&res.data&&res.data.data){
						let data  = res.data.data
						let tmpMetaName = new Object()
						for(let key in data){
							let newMeta = new Object();
							let meta = data[key]
							newMeta.meta_code = meta.id
							newMeta.meta_name_cn = meta.name
							newMeta.type = meta.type
							let tmpKey = meta.name+"_"+meta.type
							if(tmpMetaName[tmpKey]){
								continue
							}else{
								tmpMetaName[tmpKey] = meta.id
								result.push(newMeta);
								if(!isCallBack&&callback&&callBack2){
									isCallBack = true
									callback(newMeta)
									callBack2(param1)
								}
							}
						}
					}
					
				})
		},
	},
	computed: {
		hasList () {
			return !this.metaList.length
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
				this.metaList = []
				return
			}
			this.timer = setTimeout(() => {
				const result = []
				this.searchMeta(result);
				this.metaList = result
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
			u
				margin-right: .15rem 
				float: right
				color: #e8465a
</style>

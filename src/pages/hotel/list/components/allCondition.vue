<template>
	<div class="condition">
		<ul class="filter-list">
			<li @click="selectCondition">筛选<span></span></li>
			<li @click="showSortList(-1)">价格排序<span></span>
			</li>
			<li  @click="showPriceRange(0)">价格范围
				<span></span>
			</li>
			<li v-if="hasHistory" @click="closeHistoryNameIndex">清空历史
			</li>	
		</ul>
		<progress-bar :isOk="isOkProgressBar" :step="stepProgressBar"></progress-bar>
		<ul class="sort-condition" v-show="isShowPriceRange">
			<li>
				<input v-model="lowestPrice" value="" type="text" class="price-input"/>&nbsp;-&nbsp;<input v-model="highestPrice" type="text" class="price-input"/>&nbsp;&nbsp;<button type="button" class="price-button" @click="showPriceRange(1)">&nbsp;确认&nbsp;</button>
			</li>
		</ul>
		<ul class="sort-condition" v-show="isShowSortList">
					<li @click="showSortList(1)">低-高</li>
					<li @click="showSortList(2)">高-低</li>
		</ul>
		<div class="filter-condition" v-show="isShowCondition">
			<ul class="filter-region">
				<li v-for="(metaType,index) in metaTypes" :class="metaType.cur" :key="index" @click='selectMetaType(metaTypes,index)'>{{metaType.meta_name_cn}}</li>
			</ul>
			<ul class="filter-info">
				<li v-for="(meta,index) in metas" :class="meta.cur" :key="index" @click="selectSecondMeta(meta,metas,index)">{{meta.meta_name_cn}}</li>
			</ul>
			<ul v-if="hasMetaChildren" class="filter-place">
				<li @click="selectSecondMeta(meta)">全线</li>
				<li  v-for="(meta,index) in metaChildren" :key="index" @click="selectSecondMeta(meta)">{{meta.meta_name_cn}}</li>
			</ul>
		</div>
	</div>

</template>

<script>
import axios from 'axios'
import ProgressBar from 'common/progress-bar'
export default {
	name: 'AllCondition',
	components: {
		ProgressBar
	},
	data () {
		return {
			isShowCondition: false,
			isShowSortList: false,
			isShowPriceRange: false,
			lowestPrice: "",
			highestPrice:  "",
			metas: [],
			metaTypes: [],
			metaChildren: [],
			hasMetaChildren: false,
			priceSort: -1,
			hasHistory: false,
			isOkProgressBar: false,
			stepProgressBar: 5
		}
	},
	created () {
		this.hasHistory = !(this.$parent.getNameIndexArr()==0)
	},
	methods: {
		closeProgressBar(){
			this.stepProgressBar = 100
			this.isOkProgressBar = true
		},
		closeCondition () {
			this.isShowCondition = false
			this.isShowSortList = false
			this.isShowPriceRange = false
		},
		closeHistoryNameIndex () {
			this.$parent.closeHistoryNameIndex()
			//this.$parent.$router.go(0)
			window.location.reload()
		},
		selectCondition () {
			this.isShowCondition = !this.isShowCondition
			this.isShowSortList = false
			this.isShowPriceRange = false
			if(this.isShowCondition){
				axios.get(this.$store.state.hotelPathUrl + '/hmeta/getCityTypes',{
					params: {
						cityId: parseInt(this.$store.state.default_start_city_code)
					}
				})
					.then((res)=>{
						if(res.data){
							let types = new Array
							let data = res.data
							this.metaTypes.length = 0
							for(let i=0;i<data.length;i++){
								let newType = new Object()
								if(i==0){
									newType.cur = 'cur'
								}else{
									newType.cur = ''
								}
								newType.meta_code = data[i]
								newType.meta_name_cn = this.$store.state.metaTypes[data[i]]
								this.metaTypes.push(newType)
							}
							//this.metaTypes = types
							//this.metas = selectMetaType(data,0)
							this.selectMetaType(this.metaTypes,0)
						}
					})
			}
		},
		showSortList (priceSort) {
			this.isShowSortList = !this.isShowSortList
			this.isShowCondition = false
			this.isShowPriceRange = false
			if(!this.isShowSortList&&priceSort&&priceSort!=-1){
				this.$parent.changePriceSort(priceSort)
				//this.$parent.$router.go(0)
				window.location.reload()
			}
		},
		showPriceRange (type) {
			this.isShowPriceRange = !this.isShowPriceRange
			this.isShowSortList = false
			this.isShowCondition = false
			if(!this.isShowPriceRange&&type==1){
				this.$parent.changeHighestPrice(this.highestPrice)
				this.$parent.changeLowestPrice(this.lowestPrice)
				// this.$parent.$router.go(0)
				window.location.reload()
			}
		},
		showMeta (type) {
			let params = new Object()
			params.cityId = this.$store.state.default_start_city_code
			params.type = type
			axios.post(this.$store.state.hotelPathUrl + '/hmeta/getMetas',params,{timeout:1000})
				.then((res)=>{
					if(res.data&&res.data.data){
						let data = res.data.data
						this.metas = this.handleShowMeta(data,type)
					}
				})
		},
		handleShowMeta (metas,type) {
			let newMetas = new Array();
			for(let i = 0;i<metas.length;i++){
				let newMeta = new Object();
				if(i==0){
					newMeta.cur = 'cur'
				}else{
					newMeta.cur = ''
				}
				newMeta.type = type
				newMeta.meta_code = metas[i].id
				newMeta.meta_name_cn = metas[i].name
				newMeta.children = metas[i].children
				newMetas.push(newMeta)
			}
			return newMetas
		},
		onlySelectMetaType (targetMetas,selectI) {
			let currMetaType = ''
			for(let i = 0;i<targetMetas.length;i++){
				if(i==selectI){
					targetMetas[i].cur = 'cur'
					currMetaType = targetMetas[i].meta_code
				}else{
					targetMetas[i].cur = ''
				}
			}
			return currMetaType
		},
		selectMetaType (targetMetas,selectI) {
			this.hasMetaChildren = false
			let currMetaType = this.onlySelectMetaType(targetMetas,selectI)
			this.showMeta(currMetaType)
		},
		selectSecondMeta (item,metas,index) {
			if(item.type=='metro'&&metas){
				this.onlySelectMetaType(metas,index)
				if(item.children&&item.children.length!=0){
					this.hasMetaChildren = true
					let metros = new Array();
					this.metaChildren = this.handleShowMeta(item.children)
				}
			}else{
				this.$parent.closeSearchMeta(item)
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
	.filter-list
		display: flex
		li
			flex: 1
			text-align: center
			height: .7rem
			line-height: .7rem
			font-size: .24rem
			color: #666
			span
				background-image: url(../../../../assets/images/ic_shuaixuan.png)
				background-size: 100% 100%
				width: .2rem
				height: .2rem
				display:inline-block

	.sort-condition
		text-align: center
		background: #fff
		position: fixed
		z-index: 999
		left: 0
		width: 100%
		height: 2
		border-top: 1px solid #eee
		li
			display: block;
			height: 1.2rem
			line-height: 1rem
			text-align:center
			border-bottom: 1px solid #eee
			font-size: .28rem
			&::-webkit-scrollbar
				-webkit-appearance: none
			&.cur
				color: #48b28d
				border-left:.08rem solid #48b28d
				background: #fff
			.price-input
				width: 2.3rem
				height: 1rem
				text-align: center
				background: #e9e9e9
				border-radius: 0.1rem
			.price-button
				height: 1rem
				text-align: center
				background: #e9e9e9
				border-radius: 0.1rem
	.filter-condition
		background: #fff
		position: fixed
		z-index: 999
		left: 0
		width: 100%
		height: 100%
		border-top: 1px solid #eee
		.filter-region
			width: 20%
			height: 100%
			background: #f6f6f6
			overflow-y: auto
			li
				display: block
				height: 1rem
				line-height: 1rem
				text-align:center
				border-bottom: 1px solid #eee
				font-size: .28rem
				&::-webkit-scrollbar
					-webkit-appearance: none
				&.cur
					color: #48b28d
					border-left:.08rem solid #48b28d
					background: #fff

		.filter-info
			position: absolute
			top: 0
			left: 1.5rem
			overflow-y: auto
			background: #fff
			bottom: 3rem
			width: 80%
			&::-webkit-scrollbar
				-webkit-appearance: none
			li
				font-size: .28rem
				height: 1.2rem
				left: 0.2rem
				line-height: 1.2rem
				text-align: left
				padding-left: 0.5rem
				&.cur
					color: #48b28d
		.filter-place
			position:absolute
			top: 0
			left: 4rem
			right: -.3rem
			overflow-y: auto
			bottom: 3rem
			&::-webkit-scrollbar
				-webkit-appearance: none
			li
				height: 1rem
				line-height: 1rem
				text-align: center
				border-bottom: 1px solid #eee
				border-left: 1px solid #eee
				&.cur
					border-left: none
					color: #48b28d
</style>

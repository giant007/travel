<template>

	<div class="list-wrapper-content" ref="mainlist">
		<div class="list-main">
			<div :class="['list-item',{history:item.isHistory}]" v-for="(item, index) in dataList" :key="index">
				<span v-show="item.isHistory" class="history-watermark">历史查询</span>
				<div class="list-content">
					<div class="content">
						<div class="hotel-img">
							<a href="#"><img v-bind:src="item.imgUrl" alt="" /></a>
						</div>
						<div class="hotel-info">
							<p class="p-title">{{item.hotelName}}</p>
							<p class="p-info"><b>{{item.score}}分</b><u>{{item.commentCount}}条点评</u></p>
							<p class="p-info"><u>{{item.description}}</u></p>
							<p class="p-info"><u>{{item.assets}}</u></p>
							<p class="p-info"><em><u>最低价：</u>￥{{item.price}}</em></p>
							<p class="p-info"><u>共搜索到报价：{{item.hotelCount}}个</u></p>
						</div>
					</div>
					<div class="bottom">
						<!-- <h2>
							<span class="total">共搜索到报价{{item.hotelCount}}个</span>
							 <span class="show" >展开查看<em></em></span> 
						</h2> -->
						<ul class="order-list">
							<li v-for="(channelPrice,index2) in item.cPrices" :key="index2">
								<span class="order-title">{{channelPrice.channelName}}</span>
								<span class="order-info">
									<i v-if="item.price==channelPrice.price">最低</i>
									<em>￥{{channelPrice.price}}</em>
									<div class="a_btn" @click="handleHotelChannel(item, channelPrice)">查看</div>
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BetterScroll from 'better-scroll'
export default {
	name: 'OneItem',

	props: {
		dataList: Array,
		channels: Object,
		currPages: {default: []}
	},
	data () {
		return {
			// click: {type: Boolean, default: true}
			options: {
				pullDownRefresh: {
					threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
					stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
				},
				pullUpLoad: {
					threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
				},
		//          pullDownRefresh: false, //关闭下拉
		//          pullUpLoad: false, // 关闭上拉
				click: true,
				probeType: 3,
				startY: 0,
				scrollbar: false
			}	
		}
	},
	created () {
	
		this.$nextTick(() => {
			this.scroll = new BetterScroll(this.$refs.mainlist, this.options)
			this.scroll.on('pullingUp', () => {
				let lastPage = this.currPages[this.currPages.length-1];
				lastPage = lastPage + 1;
				this.$parent.queryHotels(lastPage,this.dataList);
				this.pullingDownUp()
			})
		})
	},
	methods: {

		pullingDownUp () {
			this.scroll.finishPullDown()
			this.scroll.finishPullUp()
			this.scroll.refresh() //重新计算元素高度
		},
		handleHotelChannel(item, channelPrice){
			let day = this.dateDiff(item.checkoutTime, item.checkinTime)
			this.$parent.pushHistoryNameIndex(item.nameIndex)
			// this.$router.push({
			// 	path: '/hotel/hotelComplete',
			// 	query: {
			// 		checkinTime: item.checkinTime,
			// 		checkoutTime: item.checkoutTime,
			// 		hotelName: item.hotelName,
			// 		price: channelPrice.price,
			// 		day: day,
			// 		channelName: this.channels[channelPrice.channel],
			// 		detailUrl: channelPrice.detailUrl
			// 	}
			// })

			let newUrl = this.$router.resolve({
				path: '/hotel/hotelComplete',
				query: {
					checkinTime: item.checkinTime,
					checkoutTime: item.checkoutTime,
					hotelName: item.hotelName,
					price: channelPrice.price,
					day: day,
					channelName: this.channels[channelPrice.channel],
					detailUrl: channelPrice.detailUrl,
					jlb: true
				}
			})
		
// .show({
// 			"title": "提示",
// 			"content": "再按一次退出佳乐比",
// 			"cancel-text": "bye",
// 			"show-cancel-button": false,
// 			"show-confirm-button": false
// 		})
		//	cf.show("再按一次退出应用");
			//alert(this.$store.state.hotelPathUrl+newUrl.href)
			if(window.plus){
				//let webview = window.plus.webview.create(channelPrice.detailUrl, "hotelComplate", {},{preload:'跳转到第三方：'+this.channels[channelPrice.channel]});
				//webview.evalJS("plus.key.addEventListener('backbutton',function () { plus.webview.currentWebview().close(); })");
				//webview.show()
				plus.runtime.openURL( channelPrice.detailUrl );
			}else{
				window.open(newUrl.href,"_blank");
			}
		},
		dateDiff (sDate1, sDate2) {
			let aDate
			let oDate1
			let oDate2
			let iDays
			aDate = sDate1.split('-')
			oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
			aDate = sDate2.split('-')
			oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
			iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
			return iDays
		}
	}
}
</script>

<style lang="stylus" scoped>
	.history-watermark
		color: red
		position:absolute
		left: 2rem
		margin-top: 1rem
		transform:rotate(45deg)
	.history
		background-color: #dfdfdf;
	.list-wrapper-content
		position: absolute
		top: 2.4rem
		right: 0
		bottom: 0
		left: 0
		overflow: hidden;
	.list-item
		padding-left: .3rem
		border-top: 3px solid #dfdfdf
		padding-bottom: .2rem
		.list-content
			margin-right: .3rem
			.content
				padding: .2rem 0 0
				overflow:hidden
				.hotel-img
					float:left
					width: 2.2rem
					margin-right: .3rem
					img
						width: 1.7rem
						height: 1.7rem
				.hotel-info
					float:left
					width: 4.3rem
					p
						line-height: .35rem
						overflow: hidden
						white-space: nowrap
						text-overflow: ellipsis
					.p-title
						color:#333
						font-size:.3rem
						white-space: nowrap
						overflow: hidden
						text-overflow: ellipsis
						font-weight: bold
					.p-info
						b
							color: #4a90e2
							font-size: .1rem
							margin-right: .15rem
						u
							font-size: .15rem
							color: #000000
						a
							webkit-transform: scale(calc(10 / 12))
							transform: scale(calc(10 / 12))
							border: 1px solid #4a90e2
							border-radius: 2px
							font-size: .2rem
							padding: 0 .05rem
							display:inline-block
							margin-left: -.05rem
						em
							float: left
							color: #e8465a
							font-size: .3rem
							
			.bottom
				background: #f8f8f8
				border-radius: 4px
				margin-top: .0rem
				h2
					height: .6rem
					line-height: .6rem
					-webkit-transform: scale(calc(10 / 12))
					transform: scale(calc(10 / 12))
					font-size: .2rem
					.total
						margin-left: -.3rem
					.show
						float:right
						margin-right: -.3rem
				.order-list
					li
						border-top: 1px solid #f0f0f0
						height: .5rem
						line-height: .5rem
						.order-title
							margin-left: .3rem
							color:#333
							font-size: .2.5rem
							font-weight:bold
						.order-info
							float:right
							margin-right: .3rem
							i, em
								color: #e8465a
							em
								font-size: .3rem
								margin: 0 .2rem 0 0
							i
								-webkit-transform: scale(calc(10 / 12))
								transform: scale(calc(10 / 12))
								font-size: .2rem
								border:1px solid #e8465a
								display:inline-block
								line-height:1
								padding: .05rem
							.a_btn
								height: .5rem
								line-height: .5rem
								width: 1.2rem
								color:#fff
								font-size: .28rem
								background: #48b28d
								border-radius: 2px
								text-align:center
								display:inline-block
								cursor:pointer
</style>

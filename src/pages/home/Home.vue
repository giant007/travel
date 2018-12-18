<template>
	<div>
		<div v-show="isHomeShow">
			<tip-header ref="tip"></tip-header>
			<Swiper :list="list" :auto="true"></Swiper>
			<Hotel-Menu :searchValue="searchValue" ref="menu"></Hotel-Menu>
			<img-flow title="城市攻略" :imgList="list"></img-flow>
			<img-flow title="热门游记" :imgList="list"></img-flow>
		</div>
		<slide-animate>
			<home-city ref="cityv" :bizType="bizType" v-show="isCityShow" @closeCity="closeCity" :isCityShow="isCityShow" ></home-city>
		</slide-animate>
		<slide-animate>
			<home-calendar v-show="isCalendarShow" @closeCalendar="closeCalendar" @onlyCloseCalendar="onlyCloseCalendar" :isCalendarShow="isCalendarShow" :isType="isType" :isHotelCalendarType="isHotelCalendarType"></home-calendar>
		</slide-animate>
		<slide-animate>
			<search-meta  ref="metav" v-show="isSearchMetaShow" @closeSearchMeta="closeSearchMeta" :isSearchMetaShow="isSearchMetaShow" :searchValue="searchValue"></search-meta>
		</slide-animate>
	</div>
</template>

<script>
import TipHeader from 'common/TipHeader'
import ImgFlow from 'common/ImgFlow'
import SlideAnimate from 'common/Animate'
import HomeCalendar from 'common/Calendar'
import HomeCity from 'common/city/City'
import SearchMeta from 'common/city/components/SearchMeta'
import axios from 'axios'
import { Swiper }  from 'vux'
import HotelMenu from 'home/HotelMenu'
export default {
	name: 'Home',
	components: {
		SlideAnimate,
		TipHeader,
		Swiper,
		ImgFlow,
		HotelMenu,
		HomeCalendar,
		HomeCity,
		SearchMeta
	},
	data(){
		return {
			bizType:"hotel",
			searchValue: '',
			isHotelCalendarType: 'home',
			isType: 'multi',
			isSearchMetaShow: false,
			isCalendarShow: false,
			isCityShow: false,
			isHomeShow: true,
			list:[{
				url: 'javascript:',
				img: 'https://p2-q.mafengwo.net/s9/M00/28/DD/wKgBs1gHQ3mARR_9AAkxZ4kAfGA27.jpeg',
				title: '三亚椰梦长廊'
				},
				{
				url: 'javascript:',
				img: 'https://b4-q.mafengwo.net/s5/M00/FA/FE/wKgB3FH0xCCACL6zAADV3JP1RKs02.jpeg',
				title: '三亚椰梦长廊'
				},
				{
				url: 'javascript:',
				img: 'https://b1-q.mafengwo.net/s7/M00/1C/EF/wKgB6lUAxvCAQ27RABSEzhG4Z9w08.jpeg',
				title: '三亚椰梦长廊'
				},
				{
				url: 'javascript:',
				img: 'https://p2-q.mafengwo.net/s9/M00/28/DD/wKgBs1gHQ3mARR_9AAkxZ4kAfGA27.jpeg',
				title: '三亚椰梦长廊'
				},
				{
				url: 'javascript:',
				img: 'https://n2-q.mafengwo.net/s6/M00/41/83/wKgB4lLWS6mATbQ9AAJUe_UNeOQ78.jpeg',
				title: '三亚椰梦长廊'
				},
				{
				url: 'javascript:',
				img: 'https://n4-q.mafengwo.net/s5/M00/43/F5/wKgB21B63DXswiZiABD0Rs7RJeE42.jpeg?imageMogr2%2Fthumbnail%2F%21222x150r%2Fgravity%2FCenter%2Fcrop%2F%21222x150%2Fquality%2F100',
				title: '三亚椰梦长廊'
				},
				{
				url: 'javascript:',
				img: 'https://b2-q.mafengwo.net/s6/M00/05/CF/wKgB4lK65TKAHSgDAAKcRE3fAZc52.jpeg?imageMogr2%2Fthumbnail%2F%21222x150r%2Fgravity%2FCenter%2Fcrop%2F%21222x150%2Fquality%2F100',
				title: '三亚椰梦长廊'
				},
				{
				url: 'javascript:',
				img: 'https://p4-q.mafengwo.net/s9/M00/D3/BF/wKgBs1bqJJuABzQ6AAFqvS37t6k80.jpeg?imageMogr2%2Fthumbnail%2F%21215x140r%2Fgravity%2FCenter%2Fcrop%2F%21215x140%2Fquality%2F100',
				title: '三亚椰梦长廊'
				},
				{
				url: 'javascript:',
				img: 'https://n4-q.mafengwo.net/s10/M00/D8/8B/wKgBZ1lIl4OAdfB0AAHCPMPKets51.jpeg?imageMogr2%2Fthumbnail%2F%21215x140r%2Fgravity%2FCenter%2Fcrop%2F%21215x140%2Fquality%2F100',
				title: '三亚椰梦长廊'
				},
				{ 
				url: 'javascript:',
				img: 'https://p4-q.mafengwo.net/s7/M00/31/C6/wKgB6lQHs-CAASsRAANNjAyQ9AM03.jpeg?imageMogr2%2Fthumbnail%2F%21215x140r%2Fgravity%2FCenter%2Fcrop%2F%21215x140%2Fquality%2F100',
				title: '蜈支洲岛深潜'//,
				//fallbackImg: 'https://static.vux.li/demo/3.jpg'
			}]
		}
	},
	mounted () {
		this.$refs.tip.loadLocalCityInfo(true)
	},
	methods:{
		hiddeHome(){
			this.isHomeShow = false
		},
		showHome(){
			this.isHomeShow = true
		},
		closeCity(item){
			this.$refs.menu.closeCity(item)
		},
		closeCalendar(item){
			this.$refs.menu.closeCalendar(item)
		},
		closeSearchMeta(item){
			this.$refs.menu.closeSearchMeta(item)
		},
		onlyCloseCalendar(){
			this.$refs.menu.onlyCloseCalendar()
		}
	}
}

</script>

<style scoped>
</style>

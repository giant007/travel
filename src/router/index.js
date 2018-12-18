import Vue from 'vue'
import Router from 'vue-router'
import FlightHome from 'flight/home/Home'
import City from 'common/city/City'
import oneCompare from 'flight/list/oneCompare'
import oneDetail from 'flight/list/oneDetail'
import twoCompare from 'flight/list/twoCompare'
import twoDetail from 'flight/list/twoDetail'
import FlightComplete from 'flight/list/complete'
import Calendar from 'common/Calendar'
import TipHeader from 'common/TipHeader'
import DynamicHome from 'dynamic/home/Home'
import DynamicQuery from 'dynamic/list/Query'
import DynamicAttend from 'dynamic/list/Attend'
import HotelHome from 'hotel/home/Home'
import HotelComplete from 'hotel/list/hotelComplete'
import HotelCompare from 'hotel/list/compare'
import HotelDetail from 'hotel/list/detail'
import Home from 'home/Home'
import GuideMenu from 'trip/guide/guideMenu'
import GuideArticle from 'trip/guide/guideArticle'
import Poi from 'trip/poi/Poi'

Vue.use(Router)
 
export default new Router({
	mode: 'history',//后端处理，网页seo
//	mode: 'hash',
  routes: [
		{
			path: '/poi',
			name: 'Poi',
			component: Poi
		},
		{
			path: '/guide/article',
			name: 'GuideArticle',
			component: GuideArticle
		},
		{
			path: '/guide',
			name: 'GuideMenu',
			component: GuideMenu
		},
    {
		path: '/',
		name: 'Home',
		// component: Home
		redirect: '/hotel'
    },
    {
		path: '/flight',
		name: 'FlightHome',
		component: FlightHome
    },
    {
		path: '/city/:location',
		name: 'City',
		component: City
    },
    {
		path: '/calendar',
		name: 'Calendar',
		component: Calendar
    },
    {
		path: '/flight/oneflightcompare',
		name: 'oneCompare',
		component: oneCompare
    },
    {
		path: '/flight/oneflightdetail',
		name: 'oneDetail',
		component: oneDetail
    },
    {
		path: '/flight/twoflightcompare',
		name: 'twoCompare',
		component: twoCompare
    },
    {
		path: '/flight/complete',
		name: 'FlightComplete',
		component: FlightComplete
    },
    {
		path: '/flight/twoflightdetail',
		name: 'twoDetail',
		component: twoDetail
    },
    {
		path: '/dynamic',
		name: 'DynamicHome',
		component: DynamicHome
    },
    {
		path: '/query',
		name: 'DynamicQuery',
		component: DynamicQuery
    },
    {
		path: '/hotel',
		name: 'HotelHome',
		component: HotelHome
    },
    {
		path: '/hotel/hotelComplete',
		name: 'HotelComplete',
		component: HotelComplete
    },
    {
		path: '/hotel/compare',
		name: 'HotelCompare',
		component: HotelCompare
    },
    {
		path: '/hotel/detail',
		name: 'HotelDetail',
		component: HotelDetail
    },
    {
			path: '/tipheader',
			name: 'TipHeader',
			component: TipHeader
	},
	{
		path: '/attend',
		name: 'DynamicAttend',
		component: DynamicAttend
	}
  ]
})

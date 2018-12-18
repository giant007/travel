// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import underscore from 'vue-underscore'

import VueHtml5Plus from 'vue-html5plus';
import AMap from 'vue-amap';

import IScrollView from 'vue-iscroll-view'
/* Using these kinds of IScroll class for different cases. */
import IScroll from 'iscroll'
import {AlertPlugin,LoadingPlugin,ConfirmPlugin,ToastPlugin} from 'vux';

// import IScroll from 'iscroll/build/iscroll-infinite.js
// import IScroll from 'iscroll/build/iscroll-probe.js
// import IScroll from 'iscroll/build/iscroll-view.js
// import IScroll from 'iscroll/build/iscroll-zoom.js
// import IScroll from 'iscroll/build/iscroll-lite.js

import './utils/rem'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'
import 'styles/social/client.css';
import Share from 'vue-social-share'
Vue.use(Share)

Vue.config.productionTip = false
fastClick.attach(document.body)


Vue.use(AlertPlugin);
Vue.use(LoadingPlugin);
Vue.use(ConfirmPlugin);
Vue.use(ToastPlugin);

Vue.use(underscore)
Vue.use(IScrollView, IScroll)
Vue.use(VueHtml5Plus)
Vue.use(AMap)

  // 初始化vue-amap
AMap.initAMapApiLoader({
	// 高德key
	key: '141234d40ea23f01c52625bf6eb60b33',
	// 插件集合 （插件按需引入）
	plugin: ['AMap.Geolocation','AMap.PlaceSearch','AMap.CitySearch']
//	,
//	uiVersion: '1.0',// ui库版本，不配置不加载,
// 	 v: '1.4'
});
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>',
	render: h => h(App),
	// 添加mounted，不然不会执行预编译
	mounted () {
		document.dispatchEvent(new Event('render-event'))
	}
})
////
// Vue.directive('anchor',{
//	inserted : function(el,binding){
//		el.onclick = function(){
//		    document.documentElement.scrollTop = $('#anchor-'+binding.value).offset().top
//		//document.documentElement.scrollTop = this.$el.querySelector("#anchor"+index).scrollIntoView();
//		}
//	}
//	});
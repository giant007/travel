import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import MetaInfo from 'vue-meta-info'
Vue.use(Vuex)
Vue.use(MetaInfo)

export default new Vuex.Store({
	state: state,
	mutations: mutations
})

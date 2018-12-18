<template>
	<home-tabs :tabList="tabList" :tabIndex="tabIndex" @changeTab="changeTab">
		<keep-alive>
			<components :is="currentComponent"></components>
		</keep-alive>
	</home-tabs>
</template>

<script>
import HomeTabs from './components/Tabs'
import FlightNumber from './components/FlightNumber'
import Landing from './components/Landing'
export default {
	name: 'FlightHome',
	components: {
		HomeTabs,
		FlightNumber,
		Landing
	},
	data () {
		return {
			tabIndex: 0,
			currentComponent: 'FlightNumber',
			tabList: [
				{
					index: 0,
					name: '航班号',
					component: 'FlightNumber'
				},
				{
					index: 1,
					name: '起降地',
					component: 'Landing'
				}
			]
		}
	},
	methods: {
		changeTab (tab) {
			this.tabIndex = tab.index
			this.currentComponent = tab.component
		}
	}

}
</script>

<style lang="stylus" scoped>
</style>

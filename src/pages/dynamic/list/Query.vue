<template>
	<div class="list-wrapper">
		<drop-menu></drop-menu>
		<one-item></one-item>
	</div>
</template>

<script>
import DropMenu from 'dynamic/list/components/dropMenu'
import OneItem from 'dynamic/list/components/oneItem'
export default {
	name: 'OneCompare',
	components: {
		DropMenu,
		OneItem
	}
}
</script>

<style lang="stylus" scoped>
</style>

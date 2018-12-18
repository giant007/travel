<template>
<div id="app" class="app">
	<keep-alive>
		<router-view/>
	</keep-alive>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: "App",
  mounted(){
    let vm = this 
    this.$router.beforeEach((to, from, next) => {
              vm.$store.commit("changeRefferer",vm.$route.fullPath)

                // vm.$store.state.refferer = from.path
                // vm.$store.localStorage.refferer = from.path
                if(next){
                    next();
                }
                //next(to.path); 
                return ;
            })
  },
  methods: {
    
  }
};
</script>

<style lang="stylus" scoped>
  .app
    overflow-y:  auto;
    -webkit-overflow-scrolling: touch;
    height:100%
</style>

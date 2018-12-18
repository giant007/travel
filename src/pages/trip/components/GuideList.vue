<template>
<div class="guide-box">
    <ul class="menu">
        <li  v-for="(item, index) in menus" :key="index" class="menu-item">
            <div class="guide-title">       
                {{item.menuName}}
                </div>
            <ul class="guide-items">
                <li v-for="(item2, index2) in item.titles" :key="index2" @click="toArticle(item.metaId,item.menuId,item2.id,item.menuName)" class="guide-item">
                    <div>
                        {{item2.title}}
                    </div>
                </li>
            </ul>
        </li>
        
    </ul>
</div>
</template>
<script>

import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
    components: {
      
    },

    activated(){

    },
    data(){
        return {
            menus:Array
        }
    },
    methods:{
        test(){
            alert(0)
        },
        toArticle(metaId,menuId,articleId,menuName){
            this.$parent.toArticle(metaId,menuId,articleId,menuName)
        },
        getGuide(){
            axios.post(this.$store.state.travelPathUrl + 'travel/getGuideMenus?hmId='+this.$store.state.default_start_city_code,null,{timeout:5000})
				.then((res)=>{
                    if(res.data){
                        this.menus = res.data.menus
                    }
				})
        }

    }
}
</script>


<style lang="stylus" scoped>
    .guide-box
        background-color #e5eae5
    .menu
        border-width: .1rem
        padding: .5rem
    .menu-item
        padding:.1rem
        margin:.1rem
        border-bottom :0.02rem solid #48b28d
        border-radius :.1rem
    .guide-title
        // text-align: center
        font-weight: bold
        font-size: .5rem
        padding: .2rem;
    .guide-items
        text-align: center
    .guide-item
        display inline-block
        padding .3rem
        // border-bottom: .01rem solid;
        font-size : .35rem
        // width :30%
    .link
        color #000
        
        
</style>


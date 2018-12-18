<template>
    <div id="wrapper" class="wrapper" ref="mainlist">
        <tip-header ref="tip"></tip-header>
            <div class="header-box" >
                <router-link :to="{path:'/guide/article',query:{metaId:$store.state.tipMetaId,menuId:$store.state.tipMenuId,guideId:$store.state.tipGuideId,menuName:$store.state.tipMenuName}}">
                    <div class="iconfont icon-fanhui"></div>
                </router-link>
                <div v-html="poi.title" class="poidetail-title">
                </div>
            </div>
            <div id="jlbcontent" class="jlbcontent">
                <div v-show="poi.imageUrl" class="poidetail-img">
                    <img :src="poi.imageUrl">
                </div>
                <div v-show="poi.phone" style="padding-top: .2rem" class="poidetail-item">
                    <div v-show="poi.phone" class="itembox-title">电话</div>
                    <div class="itembox-content">{{poi.phone}}</div>
                </div>
                <div v-show="poi.address" class="poidetail-item">
                    <div class="itembox-title">地址</div>
                    <div class="itembox-content">{{poi.address}}</div>
                </div>
                <div v-show="poi.traffic" class="poidetail-item">
                    <div class="itembox-title">交通</div>
                    <div class="itembox-content">{{poi.traffic}}</div>
                </div>
                <div v-show="poi.ticket"  class="poidetail-item">
                    <div class="itembox-title">门票</div>
                    <div class="itembox-content">{{poi.ticket}}</div>
                </div>
                <div v-show="poi.openTimeing" class="poidetail-item">
                    <div class="itembox-title">开发时间</div>
                    <div class="itembox-content">{{poi.openTimeing}}</div>
                </div>
                <div v-show="poi.perCapitaCost" class="poidetail-item">
                    <div class="itembox-title">用时参考</div>
                    <div class="itembox-content">{{poi.perCapitaCost}}</div>
                </div>
                <div v-show="poi.website" class="poidetail-item">
                    <div class="itembox-title">网址</div>
                    <div  @click="openUrl(poi.website)" style="color:blue" class="itembox-content">{{poi.website}}</div>
                </div>
                <div v-show="poi.summary" class="poidetail-item">
                    <div class="itembox-title">简介</div>
                    <div class="itembox-content" v-html="poi.summary"></div>
                </div>
            </div>
    </div> 
</template>
<script>
import axios from 'axios'
import TipHeader from 'common/TipHeader'
export default {
    components:{
        TipHeader
    },
    data(){
        return {
            poi:{}
        }
    },
    activated(){
        this.findPoi()
    },
    methods:{
        findPoi(){
            if(this.$route.query.poiId){
                let url = this.$store.state.travelPathUrl + 'travel/findPoiById?poiId='+this.$route.query.poiId
                axios.post(url,null,{timeout:5000})
                    .then((res)=>{
                        if(res.data){
                            this.poi = res.data.poi
                        }
                    })
            }
        },
        openUrl(url){
            if(window.plus){
				//let webview = window.plus.webview.create(channelPrice.detailUrl, "hotelComplate", {},{preload:'跳转到第三方：'+this.channels[channelPrice.channel]});
				//webview.evalJS("plus.key.addEventListener('backbutton',function () { plus.webview.currentWebview().close(); })");
				//webview.show()
				plus.runtime.openURL(url);
			}else{
				window.open(url,"_blank");
			}
        }
    }
}
</script>


<style lang="stylus" scoped>
    .header-box
        position: fixed;
        height: .6rem;
        padding : 0.2rem
        background-color :#48b28d
        display inline-block
        width 100%
        z-index: 100;
        .icon-fanhui
            position: absolute
            left: 0.28rem
            top: 0.32rem
            color: #fff
            font-size: 0.38rem
    .wrapper
        width 100%
        height: 100%
        left: 0
        top: 0
        // background-color #e5eae5;
        overflow hidden
        .jlbcontent
            height: 100%;
            position: absolute
            //z-index 100
            top: 1rem;
            width 100%
            // overflow: hidden;
            line-height .5rem
            .jlbbox-item
                font-size .3rem
                padding .2rem
                // height 2rem
        .poidetail-title
            text-align center
            padding-top .2rem
            height 100%
            color #fff
            font-size .4rem
        .poidetail-img
            width 100%
            height 4rem
            img
                width 100%
                height 4rem
        .poidetail-item
            border-bottom: .05rem solid #cbc7c7;
            margin-bottom: .1rem;
        .itembox-title
            font-weight bold
            font-size .4rem
            padding-bottom: .1rem;
            .iconfont
                float: right;
        .itembox-content
            font-size .25rem
</style>

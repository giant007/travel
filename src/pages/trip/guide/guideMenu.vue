<template>
<div>
    <tip-header ref="tip"></tip-header>
    <div v-show="isHomeShow">
        <popup v-model="popupShow" >
            <share class="share" :config="config"></share>
            <div @click="onShare" class="cancel-button">取消</div>
        </popup>
        <ul class="topbox" >
            <li class="libox citybox"  @click="showCity">
                <strong>{{ default_start_city }}  </strong><font class="qiehua">切换<i class="icon iconfont icon-tabxiala"></i></font>
            </li>
            <li @click="onShare" class="libox iconfont icon-fenxiang">
            </li>
        </ul>
        <div class="listcontent">
            <guide-list ref="guideListRef"></guide-list> 
        </div>
    </div>
    <slide-animate>
        <home-city ref="cityv" bizType="hotel" v-show="isCityShow" @closeCity="closeCity" :isCityShow="isCityShow" ></home-city>
    </slide-animate>
</div>
</template>
<script>
import GuideList from 'trip/components/GuideList'
import TipHeader from 'common/TipHeader'
import HomeCity from 'common/city/City'
import SlideAnimate from 'common/Animate'
import { mapState, mapMutations } from 'vuex'

import axios from 'axios'
import { Popup } from 'vux'
export default {
   components:{
       GuideList,
       TipHeader,
       HomeCity,
       SlideAnimate,
       Popup
   },
   computed: {
        ...mapState(['default_start_city', 'default_start_date', 'default_start_date_value', 'default_end_date', 'default_end_date_value', 'default_select_day'])  
        },
   data(){
       return {
           popupShow: false,
           isHomeShow: true,
           isCityShow: false,
           config:{
                title: this.$store.state.default_start_city+"口袋攻略",
                 sites: ['qzone', 'qq', 'weibo', 'douban'], // 启用的站点,'wechat'
                // disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
                wechatQrcodeTitle: '微信扫一扫：分享', // 微信二维码提示文字
                wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'

           }
       }
   },
   mounted(){
        let searchId = this.$route.query.searchId;
        let cityCode = this.$route.query.cityCode;
        let cityName = this.$route.query.cityName;
        if(searchId&&cityCode&&cityName){
            this.changeSearchId(searchId)
            this.changeStartCityCode(cityCode)
            this.changeStartCity(cityName)
        }
       
      
       if((!this.$store.state.default_start_city_code)||isNaN(this.$store.state.default_start_city_code)){
           this.$refs.tip.loadLocalCityInfo(true)
       }else{
           this.tipHeadLoadCtiyCallBack()
       }
   },
   methods:{
        onShare(){
            this.popupShow = !this.popupShow
        },
        tipHeadLoadCtiyCallBack(){
            this.$refs.guideListRef.getGuide()
            this.$router.replace({
                path: '/guide',
                query:{
                    searchId: this.$store.state.searchId,
                    cityCode: this.$store.state.default_start_city_code,
                    cityName: this.$store.state.default_start_city,
                }
            })
           this.config.url = window.location.href
           this.config.title = this.$store.state.default_start_city+"口袋攻略"
           let socialShares = document.getElementsByClassName("social-share-icon");
           for(let i=0;i<socialShares.length;i++){
                socialShares[i].href=this.replaceParamVal(socialShares[i].href,"url",this.config.url)
                socialShares[i].href=this.replaceParamVal(socialShares[i].href,"href",this.config.url)
                socialShares[i].href=this.replaceParamVal(socialShares[i].href,"title",this.config.title)
                socialShares[i].href=this.replaceParamVal(socialShares[i].href,"name",this.config.title)
           }
        },
        replaceParamVal(oUrl,paramName,replaceWith) {
            var nUrl = oUrl.replace(eval('/(?<=[?&])'+paramName+'=([^&]*)/'),paramName+'='+encodeURIComponent(replaceWith));
        　　return  nUrl;
        },
       showCity () {
			this.isHomeShow = false
			this.isCityShow = true
		},
		closeCity (item) {
            this.isCityShow = false
			this.isHomeShow = true
			this.selectCity(item)
            if(item!=''){
                  this.tipHeadLoadCtiyCallBack()
                    //this.$router.go(0)
            }
        },
        toArticle(metaId,menuId,articleId,menuName){
			this.$router.push({
                path: '/guide/article',
                query: {metaId:metaId,menuId:menuId,guideId:articleId,menuName}
			})
		},
		toGuideMenu(){
			this.$router.replace({
				path: '/guide'
			})
			window.location.reload()
			// this.$router.push({
			// 	path: '/hotel/compare?metaName='+this.$store.state.default_start_city
			// })
		},
		selectCity(item){
			if (item != '') {
				if(item.city_name_cn==this.$store.state.default_start_city){
					return ;
				}
				this.changeStartCity(item.city_name_cn)
                if(item.representMetaId){
                    this.changeSearchId(item.representMetaId)
                }else{
                    this.changeSearchId(item.id)
                }
                this.changeSearchValue('')
                this.changeHistoryNameIndex([])
                this.changeHighestPrice('')
                this.changeLowestPrice('')
                this.changePriceSort(-1)
                this.changeStartCityCode(item.city_code)
                
			}
        },
        ...mapMutations(['changeHistoryNameIndex','changePriceSort','changeHighestPrice','changeLowestPrice','changeHistoryNameIndex','changeSearchValue','changeSearchId','changeStartCity', 'changeStartCityCode', 'changeStartDate', 'changeEndDate', 'changeStartDateValue', 'changeEndDateValue', 'changeSelectDay'])
   }
}
</script>

<style lang="stylus" scoped>
    .share
        height: 2rem;
        text-align: center;
        padding-top: 1.5rem;
    .listcontent
        width 100%
        top: 1rem;
        padding-bottom 1px
        position: absolute;
    .cancel-button
        border: 1px solid #afafd4;
        text-align: center;
        padding: .2rem;
        border-radius: 0.2rem;
    .topbox
        position: fixed;
        height: .7rem;
        padding : 0.2rem
        background-color :#48b28d
        display inline-block
        width 100%
        z-index: 100;
        color: #fff
        strong
            font-size .6rem
            font-weight: bold
            padding-left: .2rem
        .icon-fenxiang
            float right 
            padding-right .5rem
            font-size: .65rem;
    .libox
        display inline-block
	.qiehua
		font-size .2rem
		border-radius:.1rem
		background-color :#ccc
    .icon
        font-size .1rem
</style>



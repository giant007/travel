<template>
 <div ref="tipHead" v-show="tipShow" class="tip-wrapper" >
     <font>关注佳乐比旅行公众号，随时搜索全网机票酒店最低价</font>
     <img src="../assets/images/jlbtrip_weixin.jpg" alt="佳乐比旅行" />
 </div>
 
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
//import AMap from 'vue-amap';

export default {

    computed: {
		...mapState(['default_start_city'])
	},
    data(){
        return{
            tipShow:false
        }
    },
    created () {
        if(window.plus){
            this.plusReady();
		}else{
			document.addEventListener('plusready', this.plusReady, false);
		}
    },
    methods: {
        searchCity (cityname) {
			axios.get(this.$store.state.hotelPathUrl + '/hmeta/searchCity',{
    				params: {
						search: cityname
					}
				})
				.then((res)=>{	
					if(res&&res.data&&res.data.data){
						let data = res.data.data
						for(let key in data){
							let newCity = new Object();
							let city = data[key]
							this.changeStartCity(city.name)
                            this.changeStartCityCode(city.id)
                            if(this.$parent.tipHeadLoadCtiyCallBack){
                                this.$parent.tipHeadLoadCtiyCallBack();
                            }
							break;
						}
					}
				})
		},
		loadLocalCityInfo(bool) {
//			var citysearch = new AMap.CitySearch(); 
//			citysearch.getLocalCity(function(status, result){
//					if(status == 'complete' && result.info == 'OK'){ 
//						alert(22222)
//							if(result && result.city && result.bounds) { 
//								alert(33333)
//								var city = result.city; 
//				 				cityinfo.citybounds = result.bounds; 
//								cityinfo.cityname = city.replace("市","")
//                              vm.searchCity(cityinfo.cityname)
//							// $('#market option:contains("'+citycode +'")').attr('selected','selected'); 
//							//   toast("您当前所在城市：" + cityinfo + ",code:"+ cityinfo.replace("市","")); 
//							} 
//					}else{ 
//							//toast("您当前所在城市：" + result.info + ""); 
//					} 
//				}); 
			if(bool){ 
				setTimeout(this.loadLocalCity(),1000); 
			}else{
				this.loadLocalCity()
			}
        },
        loadLocalCity(){
        	let cityinfo = new Object()
			let vm = this
			//加载城市查询插件 
			AMap.service(["AMap.CitySearch"], function() {
//				alert(111212121)
					//实例化城市查询类 
				var citysearch = new AMap.CitySearch(); 
				//自动获取用户IP，返回当前城市 
				citysearch.getLocalCity(function(status, result){
					if(status == 'complete' && result.info == 'OK'){ 
//						alert(22222)
							if(result && result.city && result.bounds) { 
//								alert(33333)
								var city = result.city; 
								cityinfo.citybounds = result.bounds; 
								cityinfo.cityname = city.replace("市","")
                                vm.searchCity(cityinfo.cityname)
							// $('#market option:contains("'+citycode +'")').attr('selected','selected'); 
							//   toast("您当前所在城市：" + cityinfo + ",code:"+ cityinfo.replace("市","")); 
							} 
					}else{ 
							//toast("您当前所在城市：" + result.info + ""); 
					} 
				}); 
			}); 
     	},
        toRoute(url){
            this.$router.push(url)
        },
        plusReady () {
            
             var vm = this
                //首页返回键处理
            //处理逻辑：1秒内，连续两次按返回键，则退出应用；
            var first = null
            
            plus.key.addEventListener('backbutton', function() {
                if(vm.$route.query.isJlbBack){
                    if(vm.$route.query.isJlbBack==1){
                        vm.$router.replace("isJlbBack",2) ;
                        return 
                    }
                }
               
                if(vm.$route.name=='Home'){
                    //首次按键，提示‘再按一次退出应用’
                    if (!first) {
                        first = new Date().getTime();
                        // mui.toast('再按一次退出应用');
                        vm.$vux.toast.show({text:"再按一次退出佳乐比",type:"text",time:2000,width:"15.6em"})
                        setTimeout(function() {
                            if(first==null){
                                vm.$vux.toast.hide()
                            }
                            first = null;
                        }, 2100);
                    } else {
                        if (new Date().getTime() - first < 2000) {
                            plus.runtime.quit();
                        }
                    }
                }else{
                    if(vm.$store.state.refferer.indexOf("?")==-1){
                          vm.$store.commit("changeRefferer",vm.$store.state.refferer+"?isJlbBack=1")
                      }else if(vm.$store.state.refferer.indexOf("isJlbBack")!=-1){
                        vm.$store.commit("changeRefferer",vm.replaceParamVal(vm.$store.state.refferer,"isJlbBack",1))
                      }else{
                        vm.$store.commit("changeRefferer",vm.$store.state.refferer+"&isJlbBack=1")
                      }
                    vm.$router.go(-1)
                        //vm.toRoute("/guide")
                    // let path = vm.$route.path;
                    // if(path.length==1){
                    //     return ;
                    // }
                    // if(path.indexOf("/")==0){
                    //     path = path.substring(1,path.length-1)
                    // }
                    // let paths = path.split("/")
                    // if(paths.length==1){
                    //     vm.$router.push("/")
                    // }else if(paths.length>1){
                    //     //vm.$router.push("/")
                    //     // let newPath = ""
                    //     // for(let i=0;i<paths.length-1;i++){
                    //     //     newPath = newPath+"/"+paths[i]
                    //     // }
                    //    // vm.$router.replace(newPath)
                    //   //  vm.$router.query.isback = 
                      
                    // }
                }
            }, false);
        },
         replaceParamVal(oUrl,paramName,replaceWith) {
            var nUrl = oUrl.replace(eval('/(?<=[?&])'+paramName+'=([^&]*)/'),paramName+'='+encodeURIComponent(replaceWith));
        　　return  nUrl;
        },
        browserRedirect() {
            var sUserAgent= navigator.userAgent.toLowerCase();
            var bIsIpad= sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp= sUserAgent.match(/midp/i) == "midp";
            var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid= sUserAgent.match(/android/i) == "android";
            var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile";

            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
               this.$refs.tipHead.style.top = "3rem"
            } else {
                this.$refs.tipHead.style.top = 0
            }
        },
        ...mapMutations(['changeStartCity', 'changeStartCityCode'])
    },
    mounted() {
       let refer =  document.referrer
       let domain = document.domain
       if(domain.indexOf(".")){
           domain = domain.substring(".")
       }
       if(refer&&refer.indexOf(domain)==-1){
            this.tipShow = true
            this.browserRedirect()
        }
    }
}
</script>
<style  lang="stylus" scoped>
    .tip-wrapper
        position:fixed
        right:0
        top: 0rem
        background-color : #ffffff
        z-index:9999
        width :2.5rem
        height :3rem
        font
           font-weight: bold
        img
            width :2.5rem
            height :2.5rem
</style>
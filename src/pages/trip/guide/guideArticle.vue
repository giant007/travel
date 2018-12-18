<template>
    <div id="wrapper" class="wrapper" ref="mainlist">
        <tip-header ref="tip"></tip-header>
            <div class="header-box" >
                <router-link to="/guide">
                    <div class="iconfont icon-fanhui"></div>
                </router-link>
                <div v-html="title" class="article-title">
                </div>
            </div>
            <div id="jlbcontent" class="jlbcontent">
                <div :id="'part_guide_'+item.id"  class="jlbbox-item" v-for="(item, index) in guideArtcles" :key="index">
                    <div class="item-title" :id="'anchor-'+index" @click="selectTab(index)">
                        {{item.title}} <i v-show="!item.show" class="iconfont icon-xiala"></i>
                        <i v-show="item.show"  class="iconfont icon-shouqi"></i>
                    </div>
                    <div class="item-content" @click="updateGuideId(item.id)" v-html="item.content" v-show="item.show">
                        
                    </div>
                </div>
            </div>  

    </div> 
</template>
<script>
import BetterScroll from 'better-scroll'
import { setTimeout } from 'timers';
import axios from 'axios'
import TipHeader from 'common/TipHeader'
export default {
    components:{
        TipHeader
    },
    data(){
        return {
            title:"",
            guideArtcles : Array,
			options: {
				pullDownRefresh: {
					threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
					stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
				},
				pullUpLoad: {
					threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
				},
		//          pullDownRefresh: false, //关闭下拉
		//          pullUpLoad: false, // 关闭上拉
				click: true,
				probeType: 3
               
			}	
        }
    },
    // mounted (){
    //     alert(0)
    //     location.href = location.href+"#part_guide_"+this.$route.query.guideId
    // },
    activated(){
        let metaId = this.$route.query.metaId;
        let menuId = this.$route.query.menuId;
        let guideId = this.$route.query.guideId;
        this.findGuide(metaId,menuId,guideId);

        // this.$nextTick(()=>{
		// 	if (!this.scroll) {
		// 		this.scroll=new BetterScroll(this.$refs.mainlist, this.options)
                
        //     this.scroll.on('scroll', (pos) => {
        //             // console.log(pos.y,this.dropDown)
        //             //如果下拉超过50px 就显示下拉刷新的文字
        //             if(pos.y>50){
        //                 this.dropDown = true
        //             }else{
        //                 this.dropDown = false
        //             }
        //         })
        //         //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
        //         this.scroll.on('touchEnd', (pos) => {
        //             // 下拉动作
        //             if(pos.y > 50){
        //                 console.log("下拉刷新成功")
        //                 this.dropDown = false
        //             }
        //             //上拉加载 总高度>下拉的高度+10 触发加载更多
        //             if(this.scroll.maxScrollY>pos.y+10){
        //                 console.log("加载更多")
        //                 //使用refresh 方法 来更新scroll  解决无法滚动的问题
        //                 this.scroll.refresh()
        //             }
        //             // console.log(this.scroll.maxScrollY+"总距离----下拉的距离"+pos.y)
        //         })
        //         console.log(this.scroll.maxScrollY)

        //     console.log(this.scroll)
		// 		}else{
		// 			this.scroll.refresh();
		// 		}
		// 	});
    },
    methods:{
        offset(el) {
            var left = 0;
            var top = 0;

            while (el) {
                left -= el.offsetLeft;
                top -= el.offsetTop;
                el = el.offsetParent;
            }

            return {
                left: left,
                top: top
            };
        },
        updateGuideId(guideId){
        	this.$store.commit("changeTipGuideId",guideId)
        },
        findGuide(metaId,menuId,guideId){
            this.$store.commit("changeTipGuideId",guideId)
            this.$store.commit("changeTipMenuId",menuId)
            this.$store.commit("changeTipMetaId",metaId)

            let referer = encodeURIComponent(window.location.href)
           // this.$store.commit("changeRefferer",vm.$route.fullPath)
            let url = this.$store.state.travelPathUrl + 'travel/findGuide?metaId='+metaId+"&menuId="+menuId
            if(guideId){
                url = url + "&guideId="+guideId;
            }
            url = url + "&referer="+referer
            let vm = this;
            axios.post(url,null,{timeout:5000})
				.then((res)=>{
                    if(res.data){
                        if(this.$route.query.menuName){
                            vm.title = this.$route.query.menuName
                        }else{
                            vm.title = res.data.title
                        }
                        vm.$store.commit("changeTipMenuName",vm.title)
                        vm.guideArtcles = res.data.list
                    }
				})
        },
        selectTab(index,guideId){
            
           // for(let i=0;i<this.guideArtcles.length;i++){
              //  if(index==i){
                    this.guideArtcles[index].show = !this.guideArtcles[index].show;
                    if( this.guideArtcles[index].show){
                        if(this.$route.query.menuName){
                            this.title = this.$route.query.menuName
                        }else{
                            this.title = this.guideArtcles[index].title
                        }
                       // let el = this.$refs.mainlist.gete
                        // this.scroll.hasVerticalScroll = true
                        // this.scroll.refresh() //重新计算元素高度
                        // this.scroll.scrollToElement(document.querySelector("#anchor-"+index));
                        // this.scroll.startY = document.querySelector("#anchor-"+index).offsetTop
                        //location.href = location.href+"#anchor-"+index
                //    }
                    
                  // document.querySelector("#anchor-"+i).scrollIntoView(true);
                    // alert( document.querySelector("#anchor-"+i).offsetTop);
                     //alert( document.documentElement.scrollTop+"---"+document.querySelector("#anchor-"+i).offsetTop)
                    //document.querySelector("#anchor-"+i).offsetTop; 
                  //  location.href = "#offsetTop"+i;
                  //  this.$el.querySelector("#anchor-"+index).scrollIntoView();
              //  }else{
                    //  this.guideArtcles[i].show = false;
              //  }
            }else{
                if(!this.$route.query.menuName){
                        this.title = ''
                 }
            }
           // alert( document.documentElement.scrollTop+"---"+document.querySelector("#anchor-"+index).offsetTop)
            //document.querySelector("#anchor"+index).scrollIntoView();
        },
        scrollRefresh(index){
            this.scroll.refresh() //重新计算元素高度
            this.scroll.scrollToElement(document.querySelector("#anchor-"+index));
            this.scroll.startY = document.querySelector("#anchor-"+index).offsetTop
            
        }
        // ,
        // goAnchor(index){
        //     this.$el.querySelector("#anchor"+index).scrollIntoView();
        //    // document.body.scrollTop = document.querySelector("#anchor"+index).offsetTop;
        // }
    }
}
</script>



<style lang="stylus">
    .article-title
            text-align center
            padding-top .2rem
            height 100%
            color #fff
            font-size .4rem
    .header-box
        position: fixed;
        text-align center
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
        // position:relative
        width 100%
        height: 100%
        left: 0
        top: 0
        background-color #e5eae5;
        overflow hidden
        .jlbcontent
            //height: 100%;
            position: absolute
            //z-index 100
            top: 1rem;
            width 100%
            padding-bottom 1px
            line-height .5rem
            .jlbbox-item
                font-size .3rem
                padding .2rem
                // height 2rem
        .item-title
            font-weight bold
            font-size .4rem
            margin-bottom: .1rem;
            border-bottom: .05rem solid #cbc7c7;
            padding-bottom: .1rem;
            .iconfont
                float: right;
        .item-content
            font-size .3rem
        .poi-block
            width 100%
            color:#000
            padding-top: 0.2rem;
            // border-bottom: 1px solid #afafd4;
            padding-bottom: .2rem;
            /*padding-right: 9.2rem;*/
        .poi-title
            font-weight bold
            font-size .3rem
            color #48b28d
            padding-left: .2rem;
        .poi-img
            /*display inline-block*/
            width 100%
            img
                width 100%
                height 3rem
        .poi-more
            float: right;
            color: #b82b2f;
            font-size: .25rem;
        .poi-desc
            padding .1rem
        .jlbimg-title
            font-weight bold
            font-size .3rem
            color #48b28d
            padding-left: .2rem;
        .jlb-img
            img
                // height 4rem
                width 100%
            i
                font-size .2rem
                color: #595757;
        // .jlb-desc
        //     line-height .3rem
   
</style>

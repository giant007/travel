<template>
  <div class="lt-t js_top_panel">
        <!--Star 入离店时间-->
        <div class="lt-inout lt-flex">
            <div class="inout-search lt-flex star">
                <div class="inout lt-flex-v lt-r-border js_inoutday" data-ubt-key="c_hotel_inland_searchlist_calendar">
                    <div class="star">
                        <p>住&nbsp;09-11</p>
                        <p>离&nbsp;09-12</p>
                    </div>
                    <i class="font-g-arrow-down lt-color ml5"></i>
                </div>
                <div class="inout lt-flex-v lt-r-border js_numselect" style="display: none;">
                   <div class="star">
                       <p class="js_numselect_adult">成人&nbsp;1</p>
                       <p class="js_numselect_child">儿童&nbsp;0</p>
                   </div>
                   <i class="font-g-arrow-down lt-color ml5"></i>
                </div>
                <div class="js_kewordbar star">
                <div class="search-name lt-flex-v" id="ui-view-10" style=""> <i class="font-g-search lt-color2"></i> <input type="text" class="input-txt js_keywordbar_content" readonly="readonly" placeholder="关键字/位置/品牌/酒店名" data-ubt-key="c_hotel_searchlist_keyword_click"> <span class="sn-close js_keywordbar_clear" style="display: none;"><i class="font-g-close"></i></span> </div></div>
            </div>
            <div class="lt-map js_hotellistmap" data-ubt-key="c_hotel_inland_searchlist_map">地图</div>
            </div>
    <div class="js_login_guide_container"></div>
</div>  
</template>

<style lang="stylus" scoped>
.lt-t {
    position: relative;
    margin: 0;
    padding: 0;
    font-family: -apple-system,Helvetica,Hiragino Sans GB W3,Microsoft YaHei,arial,sans-serif;
    font-size: .7rem;
    line-height: 1.5;
}
.lt-t .lt-inout {
    width: 100%;
    padding: 0 .5rem .35rem;
}
.lt-inout {
    background-color: #4289ff;
    padding: .35rem 0;
    min-height: 2.2rem;
    box-sizing: border-box;
}
.lt-flex, .lt-flex-h {
    display: -webkit-box;
    display: flex;
}
.lt-inout .inout-search {
background-color: #fff;
border-radius: .15rem;
}
.star {
    -webkit-box-flex: 1;
    flex: 1;
}
</style>
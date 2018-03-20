<template>
  <div id="app">
    <view-box>
      <x-header 
        slot="header"
        class="header"
      >
        <span slot="overwrite-left">
          直播
        </span>
        <h1>网易</h1>
        <span slot="right">
          搜索
        </span>
      </x-header>
      
      <vux-scroller :lock-y="true">
        <div class="my-scroller-tab">
          <tab  active-color="red">
            <tabItem selected>
              热门
            </tabItem>
            <tabItem>
              军事
            </tabItem>
            <tabItem>
              体育
            </tabItem>
            <tabItem>
              时政
            </tabItem>
            <tabItem>
              美女
            </tabItem>
            <tabItem>
              汽车
            </tabItem>
          </tab>
        </div>
      </vux-scroller> 
      
      <scroller
        :on-refresh="refresh"
        :on-infinite="infinite"
        class="vue-scroller"
        ref = "vueScroller"
      >
        <swiper :aspect-ratio="0.5" loop :list="swiperList" v-model="swiperIndex">
        </swiper>
        <marquee class="my-marquee">
          <marquee-item v-for="item,index in marqueeList" :key = "index">{{item.title}}</marquee-item>
        </marquee>  
        <panel :list="panelList">
        </panel>
      </scroller>
      
      <tabbar slot="bottom">
        <tabbar-item>
          <img src="./assets/icon/icon_nav_button.png" slot="icon">
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item>
          <img src="./assets/icon/icon_nav_article.png" slot="icon">
          <span slot="label">推荐</span>
        </tabbar-item>
        <tabbar-item>
          <img src="./assets/icon/icon_nav_cell.png" slot="icon">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import {ViewBox,XHeader,Tabbar,TabbarItem,Tab,TabItem,Swiper,Scroller as vuxScroller,Marquee, MarqueeItem,Panel} from 'vux'


var refreshInfo = ['A','B01','B02','B03','B04','B05','B06','B07','B08','B09','B010']
var keyValue = 'A'
var key = 0
var start = 0
var end = start + 9
function refreshKey(){
  keyValue = refreshInfo[key]
  key++
  if(key > refreshInfo.length - 1){
    key = 0
  }
}

export default {
  name: 'App',
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Tab, 
    TabItem,
    Swiper,
    vuxScroller,
    Marquee, 
    MarqueeItem,
    Panel
  },
  created(){
    this.$jsonp('http://3g.163.com/touch/jsonp/sy/recommend/0-9.html').then((res)=>{
      
      // 轮播图数据
      this.swiperList = res.focus.filter((item)=>{
        return item.addata === null && item.picInfo[0]
      }).map((item)=>{
        return {
          img:item.picInfo[0].url,
          title:item.title,
          url:item.link
        }
      })
      
      // 滚动新闻数据
      this.marqueeList = res.live.filter((item)=>{
        return item.addata === null && item.picInfo[0]
      }).map((item)=>{
        return {title:item.title}
      })
      
      // 图文列表数据
      this.panelList = res.list.filter((item)=>{
        return item.addata === null && item.picInfo[0]
      }).map((item)=>{
        return {
          src:item.picInfo[0].url,
          title:item.title,
          url:item.link,
          desc:item.digest
        }
      })
      this.initDataFinished = true //初始数据加载完毕
    })
    
  },
  data(){
    return {
      swiperList:[],
      marqueeList:[],
      swiperIndex:0,
      panelList:[],
      initDataFinished:false
    }
  },
  methods: {
    refresh() { //下拉刷新
      refreshKey()
      this.$jsonp('http://3g.163.com/touch/jsonp/sy/recommend/0-9.html', {
          miss: '00',
          refresh: keyValue
      }).then((res)=>{
        this.panelList = res.list.filter((item)=>{
          return item.addata === null && item.picInfo[0]
        }).map((item)=>{
          return {
            src:item.picInfo[0].url,
            title:item.title,
            url:item.link,
            desc:item.digest
          }
        })
        this.$refs.vueScroller.finishPullToRefresh()
        this.$vux.toast.text(`更新了${this.panelList.length}条新闻`,'top')
      })
    },
    infinite(){ //上拉下载更多
      
      if(!this.initDataFinished){ //初始数据没加载完不加载更多
        this.$refs.vueScroller.finishInfinite()
        return 
      }
      
      this.$jsonp(`http://3g.163.com/touch/jsonp/sy/recommend/${start}-${end}.html`, {
          miss: '00',
          refresh: keyValue
      }).then((res)=>{
        var _this = this
        setTimeout(function(){
          _this.panelList = _this.panelList.concat(
            res.list.filter((item)=>{
              return item.addata === null && item.picInfo[0]
            }).map((item)=>{
              return {
                src:item.picInfo[0].url,
                title:item.title,
                url:item.link,
                desc:item.digest
              }
            })
          )
          _this.$refs.vueScroller.finishInfinite()
          start += 9
          end = start + 9
        },1000)
      })
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
#app {
  height: 100%;
  .header{
    position:absolute;
    left: 0;
    top: 0;
    z-index: 99;
    width: 100%;
    h1 {
      font-size: 22px
    }
  }
  .my-scroller-tab{
    width: 600px;
    margin-top: 46px;
  }
  .my-marquee{
    margin: 4px;
  }
  .vue-scroller{
    top:100px;
    .loading-layer{
      padding-bottom: 100px;
    }
    .weui-media-box__hd,.weui-media-box__thumb{
      width: 102px;
      height: 70px;
    }
    .weui-media-box__bd{
      height: 70px;
    }
  }
  
}


</style>

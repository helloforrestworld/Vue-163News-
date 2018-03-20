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
        <swiper loop :list="swiperList" v-model="swiperIndex">
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
import {mapState} from 'vuex'


var  refreshInfo =['A','B01','B02','B03','B04','B05','B06','B07','B08','B09']//接口参数
var  keyValue = 'A'//接口参数
var  key = 0 //接口索引
var  start = 0//接口索引
var  end = start + 9 //接口索阴

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
    this.$store.dispatch('getInitData')//首页数据初始化
  },
  data(){
    return {
      swiperIndex:0,//轮播图索引
      infiniteTimer:null
    }
  },
  computed:{
    ...mapState(['swiperList','marqueeList','panelList','initDataFinished'])
  },
  methods: {
    refreshKey(){
      keyValue = refreshInfo[key]
      key++
      if(key > refreshInfo.length - 1){
        key = 0
      }
    },
    refreshStart(){
      start += 9
      end = start + 9
    },
    refresh() { //下拉刷新
      
      this.$store.dispatch('pullRefresh',{refreshKey:this.refreshKey,keyValue})
      .then((n)=>{
        this.$refs.vueScroller.finishPullToRefresh()
        this.$vux.toast.text(`更新了${n}条新闻`,'top')
      })
      
    },
    infinite(){ //上拉下载更多
      if(!this.initDataFinished){ //初始数据没加载完不加载更多
        this.$refs.vueScroller.finishInfinite()
        return 
      }
      clearTimeout(this.infiniteTimer)
      this.infiniteTimer = setTimeout(()=>{
        this.$store.dispatch('pushLoadMore',{keyValue,refreshStart:this.refreshStart,start,end})
        .then((res)=>{
          this.$refs.vueScroller.finishInfinite()
          this.start += 9
        })
      },1000)
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

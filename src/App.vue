<template>
  <div id="app">
    <view-box>
      <x-header 
        slot="header"
      >
        <span slot="overwrite-left">
          直播
        </span>
        <h1>网易</h1>
        <span slot="right">
          搜索
        </span>
      </x-header>
      <scroller :lock-y="true">
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
      </scroller> 
      
      <swiper :aspect-ratio="0.5" loop :list="baseList" v-model="swiperIndex">
      </swiper>
      
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
import {ViewBox,XHeader,Tabbar,TabbarItem,Tab,TabItem,Swiper,Scroller } from 'vux'
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
    Scroller
  },
  data(){
    return {
      baseList:[{
         url: 'javascript:',
         img: 'https://static.vux.li/demo/1.jpg',
         title: '送你一朵fua'
        }, {
         url: 'javascript:',
         img: 'https://static.vux.li/demo/2.jpg',
         title: '送你一辆车'
        }, {
         url: 'javascript:',
         img: 'https://static.vux.li/demo/5.jpg',
         title: '送你一次旅行',
         fallbackImg: 'https://static.vux.li/demo/3.jpg'
        }
      ],
      swiperIndex:0
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
  h1 {
    font-size: 22px
  }
  .my-scroller-tab{
    width: 600px;
  }
}


</style>

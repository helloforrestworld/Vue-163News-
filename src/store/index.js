import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.Store({
  state:{
    marqueeList:[],//滚动新闻数据
    swiperList:[],//轮播图数据
    panelList:[],//新闻列表
    initDataFinished:false//数据初始化是否完成
  },
  mutations:{
    initSwiper(state,data){
      state.swiperList = data
    },
    initMarquee(state,data){
      state.marqueeList = data
    },
    initPanel(state,data){
      state.panelList = data
    },
    initFinsh(state){
      state.initDataFinished = true
    },
    loadMoreList(state,data){
      state.panelList = state.panelList.concat(data)
    }
  },
  actions:{
    getInitData({commit}){
      var swiperList,marqueeList,panelList
      Vue.jsonp('http://3g.163.com/touch/jsonp/sy/recommend/0-9.html').then((res)=>{
        
        // 轮播图数据
        swiperList = res.focus.filter((item)=>{
          return item.addata === null &&item.picInfo.length
        }).map((item)=>{
          return {
            img:item.picInfo[0].url,
            title:item.title,
            url:item.link
          }
        })
        commit('initSwiper',swiperList)
        
        // 滚动新闻数据
        marqueeList = res.live.filter((item)=>{
          return item.addata === null &&item.picInfo.length
        }).map((item)=>{
          return {title:item.title}
        })
        commit('initMarquee',marqueeList)
        
        // 图文列表数据
        panelList = res.list.filter((item)=>{
          return item.addata === null &&item.picInfo.length
        }).map((item)=>{
          return {
            src:item.picInfo[0].url,
            title:item.title,
            url:item.link,
            desc:item.digest
          }
        })
        commit('initPanel',panelList)
        commit('initFinsh')//初始数据加载完毕
      })
    },
    pullRefresh({commit},payload){
      payload.refreshKey()
      var panelList = []
      return Vue.jsonp('http://3g.163.com/touch/jsonp/sy/recommend/0-9.html', {
          miss: '00',
          refresh: payload.keyValue
      }).then((res)=>{
        
        panelList = res.list.filter((item)=>{
          return item.addata === null &&item.picInfo.length
        }).map((item)=>{
          return {
            src:item.picInfo[0].url,
            title:item.title,
            url:item.link,
            desc:item.digest
          }
        })
        commit('initPanel',panelList)
        
        return Promise.resolve(panelList.length)
        
      }).catch((err)=>{
        console.log(err)
      })
      
    },
    pushLoadMore({commit,state},payload){
      var panelListMore = []
      return Vue.jsonp(`http://3g.163.com/touch/jsonp/sy/recommend/${payload.start}-${payload.end}.html`, {
          miss: '00',
          refresh: payload.keyValue
      }).then((res)=>{
        panelListMore = res.list.filter((item)=>{
            return item.addata === null &&item.picInfo.length
          }).map((item)=>{
            return {
              src:item.picInfo[0].url,
              title:item.title,
              url:item.link,
              desc:item.digest
            }
        })
        commit('loadMoreList',panelListMore)
        payload.refreshStart()
        return Promise.resolve()
      }).catch((err)=>{
        console.log(err)
      })
      
    }
  }
})

export default store
# 网易新闻

标签（空格分隔）： 作业总结

---


###首页
![此处输入图片的描述][1]


###总结

>项目主要尝试使用vux,只完成了首页轮播图,滚动新闻,新闻列表,下拉刷新,上拉加载,数据均来自网易新闻接口
####vux使用
```
>1.配置: vux-loader less@2.73 less-loader '~vuex/src/styles/reset.less'
```
```
>2.vux组件：ViewBox,XHeader,Tabbar,TabbarItem,Tab,TabItem,Swiper,Scroller,Marquee, MarqueeItem,Panel
```
```
>3.ViewBox使用注意,设置html body 宽高100% overflow-x:hidden 
```
```
>4.ViewBox外层容器height:100%
```
>5.Scoller使用需要在里面包一层div
```
>6.Toast插件使用 : import {ToastPlugin} from 'vux' ; Vue.use(ToastPlugin) ; this.$vux.toast.text(`更新了${n}条新闻`,'top')
```
####vue-jsonp使用
```
>import VueJsonp from 'vue-jsonp' Vue.use(VueJsonp)
>Vue.jsonp()/ vm.$jsonp()
```
####vue-scroller使用
```
>import VueScroller from 'vue-scroller' Vue.use(VueScroller)
>Vue.use(VueScroller)
><scroller></scroller>
>实例获取 <scroller ref="theScorller"></scroller>
```


  [1]: https://ws1.sinaimg.cn/large/e8323205gy1fpjg9knoj3g20a60gqe82.jpg
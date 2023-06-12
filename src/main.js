import Vue from 'vue'
import App from './App.vue'
//引入仓库
import store from './store/index'
//三里联动组件（全局组件）
import TypeNav from '@/components/TypeNav'
import Pagination from '@/components/Pagination'
Vue.component(TypeNav.name,TypeNav)
Vue.component(Pagination.name,Pagination)

Vue.config.productionTip = false

//引入mockserve.js
import "@/mock/mockServe" 

//引入swiper样式
import 'swiper/css/swiper.css';

import VueLazyload from 'vue-lazyload'
import logo from "@/assets/logo.png"

Vue.use(VueLazyload,{
  loading: logo,

});
Vue.use(ElementUI);

//引入饿了么ui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//应用elem UI
Vue.use(ElementUI);


//引入路由！！！！容易忘
import router from '@/router'
import {reqCategoryList} from '@/api'
reqCategoryList();

  const Demo =  Vue.extend({})
  const d = new Demo()
  Vue.prototype.x = d



new Vue({
  render: h => h(App),

  //注册路由！！！！容易忘
  router , //!!在这里书写router 组件身上都拥有$router属性
  store //组件实例的身上会多了一个#store的属性
}).$mount('#app')

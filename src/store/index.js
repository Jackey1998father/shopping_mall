import Vue from 'vue'
import Vuex from 'vuex'
//需要use插件一次
Vue.use(Vuex)

//引入路由组件的小仓库 （这里将每个组件的仓库模块化！然后引入）
import home from '@/store/home/index'
import search from '@/store/search/index'
import detail from '@/store/detail/index'
import shopcart from '@/store/shopcart/index'
import user from '@/store/user/index'
import trade from '@/store/trade/index'
import orderInfo from '@/store/orderInfo/index'
import pay from '@/store/pay/index'
//对外暴露store类的实例
export default new Vuex.Store({
    //实现Vuex仓库模块式开发存储数据
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade,
        pay,
        orderInfo
    }



})
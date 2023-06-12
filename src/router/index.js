//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用插件(插件要use一下)
Vue.use(VueRouter)

//引入路由组件：
// import Home from "@/pages/Home/index.vue"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Search from "@/pages/Search"
import Detail from "@/pages/Detail"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"
import GroupOrder from "@/pages/Center/groupOder"
import MyOrder from "@/pages/Center/myOrder"
import store from "@/store/index"




//配置路由
let router = new VueRouter({
    routes: [
        //home
        {
            path: '/home',
            // component: Home,
            component: ()=>import("@/pages/Home/index.vue"), //路由懒加载。什么时候调用这个组件什么时候引入，好处：打包大小降低
            meta: { show: true, show1: true }
        },
        // Center
        {   
            name:"center",
            path: '/center',
            component: Center,
            meta: { show: true, show1: true },
            children:[
                {  name:"groupOrder",path:"/center/groupOrder",component: GroupOrder },
                {  name:"myOrder",path:"/center/myOrder",component: MyOrder  },
                {  path:"/center",redirect:"/center/myOrder" }
            ]
        },
        // PaySuccess
        {   
            name:"paysuccess",
            path: '/paysuccess',
            component: PaySuccess,
            meta: { show: true, show1: true }
        },
        // Pay
        {   
            name:"pay",
            path: '/pay',
            component: Pay,
            meta: { show: true, show1: true },
            beforeEnter:(to, from, next)=> {
                if(from.path == "/trade"){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
           
            path: '/trade',
            component: Trade,
            meta: { show: true, show1: true },
            beforeEnter:(to, from, next)=> {
                if(from.path == "/shopcart"){
                    next()
                }else{
                    next(false)
                }
            }
        },
        
        {
            name: "login",
            path: '/login',
            component: Login,

        },
        {
            path: '/register',
            component: Register
        },
        {
            name: "search",
            // path:'/search/:keyword',
            path: '/search/:keyword?',  //问好！！
            component: Search,
            meta: { show: true, show1: false },
            props: true
        },
        {
            name: "detail",
            path: "/detail/:skuid",
            component: Detail  //刚开始打开网页定位的是什么网址
        },
        {
            name: "addcartsuccess",
            path: "/addcartsuccess",
            component: AddCartSuccess,  //刚开始打开网页定位的是什么网址
            meta: { show: true }
        },
        {
            name: "shopcart",
            path: "/shopcart",
            component: ShopCart,  //刚开始打开网页定位的是什么网址
            meta: { show: true }
        },

        //重定向
        {
            path: "*",
            redirect: '/home'  //刚开始打开网页定位的是什么网址
        },



    ],
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})

//全局路由守卫
router.beforeEach(async (to, from, next) => {
    
    //登陆状态---->
    if (store.state.user.token) {
        //登陆状态如果去login页面····（免谈！！）
        // if (to.path == "/login") {
        //     next("/home")

        //     //登陆了如果去其他页面，要重新获取仓库中的用户信息，否则刷新过后用户信息不保存
        // } else 
        {
            //如果仓库有用户信息：
            if (store.state.user.userInfo.name) {
                console.log("仓库有用户信息", store.state.user.userInfo.name);
                next()
            //如果仓库没有用户信息：
            } else {
                console.log("仓库没有有用户信息，我要派发一个用户信息出来----> 但我依旧有token,因为本地存储了：", store.state.user.token);
                await store.dispatch("reqGetUserInfo")
                next()
            }
        }

    } else {
        //没登陆状态---->
        if(to.path == "/shopcart" || to.path == "/center/myOrder"||  to.path == "/pay"){
            alert("请加入会员登录！！！")
            next(`/login?redicter=${to.path}`)

        }else{
            next()
        }
        

    }





})

export default router
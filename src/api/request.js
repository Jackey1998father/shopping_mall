// 对于axios进行二次封装
import axios from "axios"
import store from '@/store'

//1,利用axios对象的方法create，去创建一个axios案例
//2，request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    baseURL:'/api',
    timeout:5000
})
//请求拦截器：在请求发送之前，请求拦截器可以检测到，发送之前并做一些事情
requests.interceptors.request.use((config)=>{
    if(store.state.detail.uuid_token){  
        config.headers.userTempId = store.state.detail.uuid_token  
    }
    if(store.state.user.token){
       
        config.headers.token = store.state.user.token
        
    }
    // config.headers.token = localStorage.getItem("token") || store.state.user.token
    return config    //config 配置对象里面 headers请求头很重要
})
requests.interceptors.response.use((res)=>{
    console.log(res.data);
   return res.data

   
},(error)=>{
    
    return Promise.reject(new Error("faile"));
})

export default requests
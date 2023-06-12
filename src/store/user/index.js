//search 模块的小仓库

import {reqGetCode,reqUserRegister,LoginEnter,reqLogout,reqGetUserInfo} from '@/api/index'
const state = {
    code:"",
    token:""||localStorage.getItem("token"),
    userInfo:{}
    
 }
const actions = {
   
    async reqGetCode(ministore, phone) {
        
        let result = await reqGetCode(phone)
        // console.log(result);
        if (result.code == 200) {
            ministore.commit("REQGETCODE", result.data)            
        } else {
            alert("mock服务器请求失败!!!")
        }
    },   
    async reqUserRegister(ministore,data) {
        let result = await reqUserRegister(data)
         console.log(result);
        if (result.code == 200) {
            return "ok"          
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // LoginEnter
    async LoginEnter(ministore,data) {
        let result = await LoginEnter(data)
         console.log(result);
        if (result.code == 200) {
            ministore.commit("LOGINENTER",result.data.token)
            localStorage.setItem("token",result.data.token)
                    
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    async reqGetUserInfo(ministore,value){

        
        let result = await reqGetUserInfo()
        // console.log(result);
        
        if(result.code == 200){
            ministore.commit("REQGETUSERINFO",result.data)
        }else{
            console.log(213);
        }

    },
    // reqLogout
    async reqLogout(ministore) {
        let result = await reqLogout()
        //  console.log("@@@@@",result);

        if (result.code == 200) {
            ministore.commit("REQLOGOUT")
            localStorage.removeItem("token")
                    
        } else {
            return Promise.reject(new Error("faile"))
        }
    },

}
const mutations = {
    REQGETUSERINFO(state,userInfo){
        state.userInfo = userInfo

    },
    REQGETCODE(state,code){
        console.log(code);
        state.code = code

    },
    LOGINENTER(state,token){
        state.token = token
    },
    REQLOGOUT(state){
        state.token = ""
        state.userInfo = {}
        

    }
   
}

const getters = {
    
}

export default {
    state,
    mutations,
    actions,
    getters,
}
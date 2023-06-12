//search 模块的小仓库

import {reqPayInfo,reqPayStatus} from '@/api/index'

const state = { 
    payInfo:{},
    PayStatusInfo:""
}
const actions = {

    // reqPayInfo
    async reqPayInfo(ministore,orderId) {
        let result = await reqPayInfo(orderId)
         console.log("获取支付信息123!!!",result);
        if (result.code == 200) {
            ministore.commit("REQPAYINFO", result.data)           
        } else {
            alert("mock服务器请求失败!!!!!!")
        }
    },
    // reqPayStatus
    async reqPayStatus(ministore,orderId) {
        let result = await reqPayStatus(orderId)
         console.log("获取用户是否支付信息!钱钱钱!!",result);
        if (result.code == 200) {
            ministore.commit("REQPAYSTATUS", result.message)           
        } 
    },

    

    
}
const mutations = {
    REQPAYINFO(state,payInfo){
        state.payInfo = payInfo
    }, 
    REQPAYSTATUS(state,PayStatusInfo){
        state.PayStatusInfo = PayStatusInfo
    }   
}

const getters = {
    totalFee(state){
        return state.payInfo.totalFee
    },
    orderId(state){
        return state.payInfo.orderId
    },
    // codeUrl
    codeUrl(state){
        return state.payInfo.codeUrl
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
}
//search 模块的小仓库

import {reqAddressList,reqTradeGoodsList,sendShopMessage} from '@/api/index'

const state = { 
    address:[],
    goods:{},
    orderId:""
}
const actions = {

    // reqAddressList
    async reqAddressList(ministore) {
        let result = await reqAddressList()
         console.log(result,"在这里获取了地址信息！！");
        if (result.code == 200) {
            ministore.commit("REQADDRESSLIST", result.data)           
        } else {
            alert("mock服务器请求失败!!!!!!")
        }
    },
    // reqTradeGoodsList
    async reqTradeGoodsList(ministore) {
        console.log(123);
        let result = await reqTradeGoodsList()
         console.log(result,"在这里获取商品列表！！");

        if (result.code == 200) {
            ministore.commit("REQTRADEGOODSLIST", result.data)           
        } else {
            alert("mock服务器请求失败!!!啊别删除啊!!")
        }
    },
    // sendShopMessage
    async sendShopMessage(ministore,{tradeNo,data}) {
        console.log(123,"====================================",data);
        let result = await sendShopMessage(tradeNo,data)
         console.log(result,"在这里获取商品列表！！");

        if (result.code == 200) {
            ministore.commit("SENDSHOPMESSAGE", result.data)           
        } else {
            alert("mock服务器请求失败!!!!!!")
        }
    },


    
}
const mutations = {
    REQADDRESSLIST(state,address){
        state.address = address
    },
    REQTRADEGOODSLIST(state,goods){
        state.goods = goods
    },
    SENDSHOPMESSAGE(state,orderId){
        state.orderId = orderId

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
//search 模块的小仓库

import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api/index'
import {getUUID} from "@/utils/uuid_token"

const state = { 
    goodInfo:{},
    uuid_token:getUUID()

}
const actions = {
    async reqGoodsInfo(ministore,params){
        let result = await reqGoodsInfo(params)
        // console.log(result);
        if(result.code == 200){
            ministore.commit("REQGOODSINFO",result.data)
        }else{
            alert("数据库请求失败!!!")
        }

    },
    async reqAddOrUpdateShopCart(ministore,{skuId,skuNum}){
        console.log(skuId,skuNum);
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)      
        if(result.code == 200){
            // ministore.commit("REQADDORUPDATESHOPCART",result.data)
            console.log(result);
            return 'ok'
        }else{
            // alert("数据库请求失败111111111!!!")
            return Promise.reject(new Error('faile')) //异步返回失败的标记！！
        }
    },


}
const mutations = {
    REQGOODSINFO(state,goodInfo){
        // console.log(goodInfo);
        state.goodInfo = goodInfo

    }

}

const getters = {
    categoryView(state){
        return state.goodInfo.categoryView ||{}
    },
    price(state){
        return state.goodInfo.price||{}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||{}
    },
    valuesSkuJson(state){
        return state.goodInfo.valuesSkuJson||{}
    },

   
   
}

export default {
    state,
    mutations,
    actions,
    getters,
}

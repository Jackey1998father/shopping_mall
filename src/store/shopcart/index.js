//search 模块的小仓库

import {reqCartList,deleGoods} from '@/api/index'

const state = { 
    cartList:[]
}
const actions = {



    async reqCartList(ministore) {
        // console.log("这是调用reqGetSearchInfo函数请求serch数据");
        let result = await reqCartList()
         console.log(result);
        if (result.code == 200) {
            ministore.commit("REQCARTLIST", result.data)           
        } else {
            alert("mock服务器请求失败!!!!!!")
        }
    },
    
    async deleGoods(ministore,skuId) {
        console.log("123",skuId);
        // console.log("这是调用reqGetSearchInfo函数请求serch数据");
        let result = await deleGoods(skuId)
         
        if (result.code == 200) {
            console.log(result);
            return "ok"           
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
}
const mutations = {
    REQCARTLIST(state,value){
        // console.log(value);   
        state.cartList  = value
    },
    
}

const getters = {
    cartList(){
        return state.cartList[0] || {}
    },
    
}

export default {
    state,
    mutations,
    actions,
    getters,
}

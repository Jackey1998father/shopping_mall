//search 模块的小仓库

import {reqGetSearchInfo} from '@/api/index'
const state = {searchList:{} }
const actions = {
    // sendRouteArr(ministore,arr){
    //     ministore.commit("SENDROUTEARR", arr)
    // },


    async reqGetSearchInfo(ministore, params) {
        

        // console.log("这是调用reqGetSearchInfo函数请求serch数据");
        let result = await reqGetSearchInfo(params)
        // console.log(result);
        if (result.code == 200) {
            ministore.commit("REQGETSEARCHINFO", result.data)
            
        } else {
            alert("mock服务器请求失败!!!")
        }

    },
}
const mutations = {
    // SENDROUTEARR(state,value){
    //     state.searchList = value

    // },
     
    REQGETSEARCHINFO(state,value){
        // console.log(value);
        state.searchList = value
    },

}

const getters = {
    goodsList(state){
        return state.searchList.goodsList ||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
}

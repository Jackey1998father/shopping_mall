//search 模块的小仓库

import {reqAuthPage} from '@/api/index'

const state = { 
    orderInfo:{}

}
const actions = {

// reqAuthPage
    async reqAuthPage(ministore,{page,limit}) {
        let result = await reqAuthPage(page,limit)
         console.log("获取买家订单信息!!!",result);

        if (result.code == 200) {
            ministore.commit("REQAUTHPAGE", result.data)           
        } else {
            alert("mock服务器请求失败!!!!!!")
        }
    },     
}
const mutations = {
    REQAUTHPAGE(state,orderInfo){
        state.orderInfo = orderInfo
    }, 
 
}

const getters = {
    records(state){
        return state.orderInfo.records
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}
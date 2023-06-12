import {reqCategoryList} from '@/api/index'
//home 模块的小仓库
import {reqGetBannerList} from '@/api/index'
import {reqGetFloorList} from '@/api/index'

const state={categoryList:[] ,reqGetBannerList:[] ,reqGetFloorList:[]}

const actions={ 
    //通过api里面的接口函数调用，向服务端发请求，获取服务器数据
    async categoryList(ministore,value){
        let result = await reqCategoryList()
        // console.log(result);
        if(result.code == 200){
            ministore.commit("CATEGRYLIST",result.data.slice(0,15))
        }else{
            alert("数据库请求失败!!!11")
        }

    },
    async reqGetBannerList(ministore,value){
        
        
        let result = await reqGetBannerList()
        // console.log(result);
        if(result.code == 200){
            ministore.commit("REQGETBANNERLIST",result.data)
        }else{
            alert("mock服务器请求失败!!!22")
        }

    },
    async reqGetFloorList(ministore,value){

        // console.log("@@@@");
        let result = await reqGetFloorList()
        // console.log(result);
        if(result.code == 200){
            ministore.commit("REQGETFLOORLIST",result.data)
        }else{
            alert("mock服务器请求失败!!!33")
        }

    },
    
    
   

}

const mutations={
    
    CATEGRYLIST(state,value){
        // console.log(value);
        state.categoryList = value

    },
    REQGETBANNERLIST(state,value){
        // console.log(value);
        state.reqGetBannerList = value

    },
    REQGETFLOORLIST(state,value){
       
        state.reqGetFloorList = value
        // console.log(value);
         
        // state.reqGetBannerList = value

    }
 }
const getters={ }

export default {
    state,
    mutations,
    actions,
    getters,
}

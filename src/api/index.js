// 当前模块：API进行统一管理
import axios from "axios"
import requests from "./request"  
// import store from '@/store'  


//三级联动的接口
export const reqCategoryList = () => {
    return axios({ url: '/api/product/getBaseCategoryList', method: 'get' })
        .then(response => {
            // 处理成功的响应数据
            
            return response.data;
        })
        .catch(error => {
            // 处理请求失败的情况
            throw error;
        });
};

export const reqGetBannerList = () => {
    return axios({ url: '/mock/banner', method: 'get' })
        .then(response => {
            // 处理成功的响应数据
            
            return response.data;
        })
        .catch(error => {
            // 处理请求失败的情况
            throw error;
        });
};


export const reqGetFloorList = () => {
    return axios({ url: '/mock/floor', method: 'get' })
        .then(response => {
            // 处理成功的响应数据
            
            return response.data;
        })
        .catch(error => {
            // 处理请求失败的情况
            throw error;
        });
};

export const reqGetSearchInfo = (params)=>{
    return axios({ url: '/api/list', method: 'post' ,data:params})
        .then(response => {
            // 处理成功的响应数据
            
            
            return response.data;
        })
        .catch(error => {
            // 处理请求失败的情况
            throw error;
        });

    
}
export const reqGoodsInfo = (params)=>{
    return axios({ url: `/api/item/${ params }`, method: 'get'})
        .then(response => {
            // 处理成功的响应数据     
            return response.data;
        })
        .catch(error => {
            // 处理请求失败的情况
            throw error;
        });

    
}
// export const reqAddOrUpdateShopCart = (skuId,skuNum) => {
//     return axios({ url: `/api/cart/addToCart/${ skuId }/${ skuNum }`, method: 'post' })
//         .then(response => {
//             // 处理成功的响应数据           
//             return response.data;
//         })
//         .catch(error => {
//             // 处理请求失败的情况
//             throw error;
//         });
// };
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`, method: 'post'})




// export const reqCartList = () => {
//     return axios({ url: `/api/cart/cartList`, method: 'get' })
//         .then(response => {
//             // 处理成功的响应数据               
//             return response.data;
//         })
//         .catch(error => {
//             // 处理请求失败的情况
//             throw error;
//         });
// };
export const reqCartList = () => requests({url:`/cart/cartList`, method: 'get'})

export const deleGoods = (skuId) => requests({url:`/cart/deleteCart/${skuId}`, method: 'delete'})
// export const deleGoods = (skuId)=>{
//     return axios({ url: `/api/cart/deleteCart/${skuId}`, method:'DELETE'})
//         .then(response => {
//             // 处理成功的响应数据     
//             return response.data;
//         })
//         .catch(error => {
//             // 处理请求失败的情况
//             throw error;
//         });

    
// }


//发请求

export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`, method: 'get'})
// export const reqUserRegister = (data) => requests({url:`/user/passport/register`, method: 'POST',data})


export const reqUserRegister = (data)=>{
    return axios({ url: `/api/user/passport/register`, method:'POST', data})
        .then(response => {
            // 处理成功的响应数据     
            return response.data;
        })
        .catch(error => {
            // 处理请求失败的情况
            throw error;
        });  
}

// /api/user/passport/login

export const LoginEnter = (data)=>{
    return axios({ url: `/api/user/passport/login`, method:'POST', data})
        .then(response => {
            // 处理成功的响应数据     
            return response.data;
        })
        .catch(error => {
            // 处理请求失败的情况
            throw error;
        });  
}
//登陆成功返回用户信息请求！！

export const reqGetUserInfo = () => requests({url:`/user/passport/auth/getUserInfo`, method: 'get'})

//退出登录
export const reqLogout = () => requests({url:`/user/passport/logout`, method: 'get'})
//  /api/user/userAddress/auth/findUserAddressList收件人信息
export const reqAddressList = () => requests({url:`/user/userAddress/auth/findUserAddressList`, method: 'get'})

//  /api/order/auth/trade获取：
export const reqTradeGoodsList = () => requests({url:`/order/auth/trade`, method: 'get'})
//  /api/order/auth/submitOrder?tradeNo={tradeNo}
export const sendShopMessage = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post',data})
// /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`, method: 'GET'})
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`, method: 'GET'})
// /api/order/auth/{page}/{limit}
export const reqAuthPage = (page,limit) => requests({url:`/order/auth/${page}/${limit}`, method: 'GET'})

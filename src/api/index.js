// api管理模块

// 1 导入封装好的axios
import requests from './requests'
import mockRequest from './mockRequest'

export const  reqCategoryList = () => requests({url:'/api/product/getBaseCategoryList', method:'get'})

// 获取轮播图数据
export const  reqBannerList = () => mockRequest({url:'/banner', method:'get'})

// 获取floor数据
export const reqFloorList = () => mockRequest({url: '/floor', method:'get'})

// 获取搜索模块数据 使用post方法 需要带参数
export const reqSearchInfo =  (params) => requests({url: '/api/list', method:'post', data:params})

// 获取商品详情数据
export const reqGoodsilInfo = (skuId) => requests({url: `/api/item/${skuId}`, method: 'get'})

// 添加商品至购物车
export const reqPostGoodCar = (skuId, skuNum) => requests({url: `/api/cart/addToCart/${skuId}/${skuNum}`, method: 'post'})

// 获取购物车数据
export const reqCartList = () => requests({url: '/api/cart/cartList', method:'get'})

// 删除购物车商品
export const reqDelCartList = (skuId) => requests({url: `/api/cart/deleteCart/${skuId}`, method: 'DELETE'})

// 修改商品选中状态
export const reqCheckCart = (skuId, isChecked) => requests({url: `/api/cart/checkCart/${skuId}/${isChecked}`, method: 'get'})

// 获取注册验证码
export const reqGetCode = (phone) => requests({url: `/api/user/passport/sendCode/${phone}`, method: 'get'})

// 注册用户
export const postNewUser = (data) => requests({url: `/api/user/passport/register`, method: 'post', data})

// 用户登录
export const postUserLogin = (data) => requests({url: '/api/user/passport/login', method: 'post', data})

// 自动登录
export const reqUserInfo = () => requests({url: '/api/user/passport/auth/getUserInfo', method:'get'});

// 退出登录
export const reqUserOut = () => requests({url: '/api/user/passport/logout', method:'get'})

// 获取用户地址信息
export const reqUserAddress = () => mockRequest({url: '/address', method: 'get'})

// 获取订单信息
export const reqTradeInfo = () => requests({url: '/api/order/auth/trade', method: 'get'})

// 提交订单
export const reqPostTrade = (tradeNo, data) => requests({url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data})

// 获取订单信息
export const reqOrderInfo = (id) => requests({url: `/api/payment/weixin/createNative/${id}`, method:'get'})

// 获取订单支付状态
export const reqPayStatus = (orderId) => requests({url: `/api/payment/weixin/queryPayStatus/${orderId}`, method: 'get'})

// 获取订单列表
export const reqOrderList = (page, limit) => requests({url: `/api/order/auth/${page}/${limit}`, method: 'get'})
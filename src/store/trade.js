// 获取请求服务函数
import {reqUserAddress, reqTradeInfo, reqPostTrade, reqOrderInfo} from '@/api'


const state = {
    address: [],
    goodsList: [],
    taderInfo: {},
    orderId: ''
}
const actions = {
    // 获取用户地址信息
    async getUserAddress(context) {
        let result = await reqUserAddress();
        if(result.code === 200) {
            context.commit('USERADDRESS', result.data);
        }
    },
    // 获取订单信息
    async getTrade(context) {
        let result = await reqTradeInfo()
        if (result.code === 200) {
            context.commit('GETTRADE', result.data);
        }
    },
    // 提交订单
    async postTrade({commit,state}, data) {
        let tradeNo = state.taderInfo.tradeNo
        let tradeObj = {
            consignee: data.consignee,
            consigneeTel: data.phoneNumber,
            deliveryAddress: data.address,
            paymentWay: 'ONLINE',
            orderComment:data.orderComment,
            orderDetailList: state.goodsList
        }
        let result = await reqPostTrade(tradeNo,tradeObj)
        if (result.code === 200) {
            commit('POSTTRADE', result.data)
            return 'ok'
        } 
        return new Promise.reject('fail')
    },
    async getOrderInfo(context, data) {
        let result = await reqOrderInfo(data)
        console.log(result);
    }
}
const mutations = {
    // 处理用户地址信息
    USERADDRESS(state, data) {
        state.address = data;
    },
    // 处理商品信息
    GETTRADE(state, data) {
        state.goodsList = data.detailArrayList
        state.taderInfo = data
    },
    // 保存订单信息
    POSTTRADE(state, data){
        state.orderId = data
    }
    
}
const getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}
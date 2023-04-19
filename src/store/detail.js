import {reqGoodsilInfo, reqPostGoodCar} from '@/api'


const state = {
    goodsInfo: {},

}
const actions = {
    // 获取商品信息
    async getGoodsInfo(context, skuId) {
        let result = await reqGoodsilInfo(skuId)
        if (result.code  === 200) {
            context.commit('GETGOODSINFO',result.data)
        }
    },
    // 将商品添加到购物车中
    async getPostGoodCar(context,data) {
        let result  = await reqPostGoodCar(data.skuId,data.skuNum)
        if (result.code === 200) {
            return result
        }
    }
}
const mutations = {
    GETGOODSINFO(state, data) {
        state.goodsInfo = data
    }
}
const getters = {
    categoryView() {
        return state.goodsInfo.categoryView || {}
    },
    skuInfo() {
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList() {
        return state.goodsInfo.spuSaleAttrList || []
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
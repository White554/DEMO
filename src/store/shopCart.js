import {reqCartList, reqDelCartList, reqCheckCart} from '@/api';
import {getUuid} from '@/utils/uuid_token';

let state = {
    uuid_token: getUuid(),
    shopCartList: []
}
let actions = {
    // 获取购物车列表
    async getShopCartList(context) {
        let result = await reqCartList();
        if (result.code === 200) {
            context.commit('GETCARTLIST', result.data[0]?.cartInfoList || []);
        }
    },
    // 删除某个商品
    async deleteCartList(context, skuId) {
        return await reqDelCartList(skuId);
    },
    // 改变某个商品状态
    async changeCart(context, data) {
        return await reqCheckCart(data.skuId, data.isChecked);
    },
    // 删除所有选中的商品
    removeAllCheckedCart(context) {
        var resultArr = []
        context.state.shopCartList.forEach(item => {
            let result = item.isChecked === 1 && context.dispatch('deleteCartList', item.skuId);
            resultArr.push(result)
        })
        return Promise.all(resultArr);
    },
    changeAllCartChecked(context, isChecked) {
        let resultArr = [];
        context.state.shopCartList.forEach(item => {
            resultArr.push(item.isChecked.toString() !== isChecked && context.dispatch('changeCart', {skuId: item.skuId, isChecked}));
        })
        return Promise.all(resultArr);
    }
}
let mutations = {
    GETCARTLIST(state, data) {
        state.shopCartList = data;
    }
}
let getters = {}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}
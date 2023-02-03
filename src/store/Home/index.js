// Home组件仓库
import {reqCategoryList} from '@/api'


const state = {
    categoryList: []
};
const actions = {
    async reqCategoryList(context) {
        // 异步操作 获取列表数据
        let res = await reqCategoryList();
        context.commit('CATEGORYLIST', res.data);
    }
};
const mutations = {
    CATEGORYLIST(state, data) {
        state.categoryList = data;
    }
};
const getters = {};


export default {
    state,
    actions,
    mutations,
    getters
}
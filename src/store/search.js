// search组件仓库
import {reqSearchInfo} from '@/api'


const state = {
    searchInfo: {}
};
const actions = {
    async postSearchInfo(context, params) {
        let res = await reqSearchInfo(params)
        if (res.code === 200) {
            context.commit('SEARCHLIST', res.data)
        }
    }
};
const mutations = {
    SEARCHLIST(state, data) {
        state.searchInfo = data
    }
}; 
const getters = {
    goodsList(state) {
        return state.searchInfo.goodsList || [];
    },
    trademarkList(state) {
        return state.searchInfo.trademarkList
    },
    attrsList(state) {
        return state.searchInfo.attrsList
    },
    // 当前页码
    pageNo(state) {
        return state.searchInfo?.pageNo || 0
    },
    // 一页显示的数量
    pageSize(state) {
        return state.searchInfo.pageSize || 0
    },
    // 数据总量
    total(state) {
        return state.searchInfo.total || 0
    },
    // 总页码数
    totalPages(state) {
        return state.searchInfo.totalPages || 0
    },
};

export default {
    namespaced :true,
    state,
    actions,
    mutations,
    getters
}
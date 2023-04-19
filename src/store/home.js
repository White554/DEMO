// Home组件仓库
import {reqCategoryList, reqBannerList, reqFloorList} from '@/api'


const state = {
    // 三级菜单数据
    categoryList: [],
    // 轮播图数据
    bannerList: [],
    // 楼层轮播图数据
    floorList: []
};
const actions = {
    async reqCategoryList(context) {
        // 异步操作 获取列表数据
        let res = await reqCategoryList();
        context.commit('CATEGORYLIST', res.data);
    },
    async getBannerList(context) {
        // 异步操作 获取列表数据
        let res = await reqBannerList();
        if (res.code === 200) {
            context.commit('BANNERLIST', res.data);
        }
    },
    async  getFloorList(context) {
        let res = await reqFloorList();
        if (res.code === 200) {
            context.commit('FLOORLIST',res.data)
        }
    }
};
const mutations = {
    CATEGORYLIST(state, data) {
        state.categoryList = data;
    },
    BANNERLIST(state, data) {
        state.bannerList = data
    },
    FLOORLIST(state, data) {
        state.floorList = data
    }
}; 
const getters = {};

export default {
    namespaced :true,
    state,
    actions,
    mutations,
    getters
}
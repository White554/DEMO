import Vue from 'vue'
import Vuex from 'vuex';

// 使用插件
Vue.use(Vuex);

// 导入小仓库 模块化开发
import homeStore from './Home'
import loginStore from './Login'

// 对外保留Store的一个实例
export default new Vuex.Store({
    // 使用小仓库模块
    modules: {
        homeStore,
        loginStore
    }
})
import {reqGetCode, postNewUser, postUserLogin, reqUserInfo, reqUserOut} from '@/api'
const state = {
    code: '',
    token: localStorage.getItem('token'),
    userInfo: {}
}
const actions = {
    // 获取验证码
    async getCOde(context, phone) {
       let result = await reqGetCode(phone);
       if (result.code === 200) {
        context.commit('GETCODE', result.data);
        return result.data;
       }
    },
    // 注册新用户
    async registerUser(context, data) {
        let result = await postNewUser(data);
        if (result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    // 用户登录
    async loginUser(context, data) {
        let result = await postUserLogin(data);
        if (result.code === 200) {  
            context.commit('LOGINUSER', result.data.token);
            // 本地存储token  防止刷新直接丢失
            localStorage.setItem('token', result.data.token);
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    // 获取用户信息
    async UserInfoGet(context) {
        let result = await reqUserInfo();
        if (result.code === 200) {
            context.commit('USERINFOGET', result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('fail')).then((result) => {} ,(result) => {})
        }
    },
    // 退出登录
    async logOut(context) {
        let result = await reqUserOut()
        if (result.code === 200) {
            context.commit('CLEAR')
            // 清除本地token
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    }
}
const mutations = {
    GETCODE(state, data) {    
        state.code = data
    },
    LOGINUSER(state, data) {
        state.token = data
    },
    USERINFOGET(state, data) {
        state.userInfo = data
    },
    CLEAR(state) {
        state.token = ''
        state.userInfo = ''
        localStorage.removeItem('token')
    }
}
const getters = {}
export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
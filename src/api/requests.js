// 导入axios
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入store模块
import store from '@/store'

// axios二次封装
// 1 create一个axios实例
var requests = axios.create({
    // 路径
    baseURL: 'http://gmall-h5-api.atguigu.cn',
    // 响应时间
    timeout: 5000,
})
// 2 请求拦截器
requests.interceptors.request.use((config) => {
    // 判断是否有游客id
    if (store.state.shopCartStore.uuid_token) {
        config.headers.userTempId = store.state.shopCartStore.uuid_token
    }
    // 进度条开始
    nprogress.start();
    // config包含Header 响应头 可配置
    if (store.state.userStore.token) {
        config.headers.token = store.state.userStore.token
    }
    return config;
})
// 3 响应拦截器  成功/失败的回调
requests.interceptors.response.use((res) => {
    nprogress.done();
    return res.data;
}, (error) => {
    // 中止Promise链
    return Promise.reject(new Error('fail'))
})

export default requests
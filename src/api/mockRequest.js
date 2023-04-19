// 导入axios
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// axios二次封装
// 1 create一个axios实例
var requests = axios.create({
    // 路径
    baseURL: '/mock',
    // 响应时间
    timeout: 5000,
})
// 2 请求拦截器
requests.interceptors.request.use((config) => {
    // 进度条开始
    nprogress.start();
    // config包含Header 响应头 可配置
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
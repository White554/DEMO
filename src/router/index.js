// 引入vue和vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用路由插件
Vue.use(VueRouter)

// 导入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

// 重写push|repplace方法 解决NavigationDuplicated警告  因为重复跳转到同一个地址导致的
let orginPush = VueRouter.prototype.push
let orginReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function(location,resolve,reject) {
    if (resolve  && reject) {
        orginPush.call(this, location, resolve, reject)
    } else {
        orginPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject) {
    if (resolve  && reject) {
        orginReplace.call(this, location, resolve, reject)
    } else {
        orginReplace.call(this, location, () => {}, () => {})
    }
}


// 配置路由
export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
            meta: {showFooter: true}
        },
        {
            path: '/search/:searchStr?',
            component: Search,
            meta: {showFooter: true},
            name: 'search',
            // 1 布尔值：只有params参数
            // props: true
            // 2 对象：额外增加参数
            // props: {a:11, b:234}
            // 函数形式 可以对params参数和query参数处理
            props: ($route) => ({searchStr: $route.params.searchStr + '---', k: $route.query.k + '---'})
        },
        {
            path: '/login',
            component: Login,
            meta: {showFooter: false}
        },
        {
            path: '/Register',
            component: Register,
            meta: {showFooter: false}
        },
        // 重定向
        {
            path: '*',
            redirect: '/home'
        }

    ]
})
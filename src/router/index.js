// 引入vue和vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入路由信息
import routes from './routes'

// 导入仓库token数据
import store from '@/store'

// 使用路由插件
Vue.use(VueRouter)


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

var route = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        // y == 0 代表回到最顶部
       return {y :0};
    }
})

// 路由前置守卫判断是否登录
route.beforeEach(async (to, from, next) => {
    // 派发获取用户信息
    
    // 使用token判断是否登录 以及是否再次跳转到登陆页
    let token = store.state.userStore.token
    if (to.fullPath === '/login' && token || to.fullPath === '/register' && token) {
        next(from.fullPath)
    } else if (to.fullPath === '/trade') {
        if (token) {
            next()
        } else {
            next('/login')
        }
    } else  {
        try {
           await store.dispatch('userStore/UserInfoGet');
        } catch (error) {
            await store.dispatch('userStore/logOut');
        }
        if (to.meta.needToken && !token) {
            next('/login?redirect=' + to.fullPath)
        }
        next()
    }
})

// 配置路由
export default route
import Vue from 'vue'
import App from './App.vue'

// 三级导航注册为全局组件  在多个地方使用
import TypeNav from '@/components/TypeNav' 
// component(组件名称， 组件)
Vue.component(TypeNav.name, TypeNav)

// 引入路由
import router from '@/router'

// 引入仓库（vuex)
import store from '@/store'

new Vue({
    render: h => h(App),
    // 注册路由
    router,
    // 注册仓库，组件身上会有一个$store方法
    store,
}).$mount('#app')

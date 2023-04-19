import Vue from 'vue';
import App from './App.vue';

// 三级导航注册为全局组件  在多个地方使用
import TypeNav from '@/components/TypeNav' ;
// component(组件名称， 组件)
Vue.component(TypeNav.name, TypeNav);

// 轮播图注册为全局组件  在多个地方使用
import Carousel from '@/components/Carousel' ;
// component(组件名称， 组件)
Vue.component(Carousel.name, Carousel);

// 分页器注册为全局组件  在多个地方使用
import Pagination from '@/components/Pagination' ;
// component(组件名称， 组件)
Vue.component(Pagination.name, Pagination);

// 引入elementui组件
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(MessageBox.name, MessageBox);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from '@/router';
// 引入仓库（vuex)  
import store from '@/store';

// 引入mocek模拟数据
import '@/mock/mockServe';

// 引入轮播图样式
import 'swiper/css/swiper.css';


// 引入懒加载插件
import VueLazyload  from 'vue-lazyload';
// 引入懒加载图片
import loadImg from '@/assets/logo.png';
// 注册懒加载插件
Vue.use(VueLazyload, {
    loading:loadImg
})


// 引入自定义插件
import VueUpper from '@/pulgin/upper' 
Vue.use(VueUpper, {
    name: 'upper'
})

new Vue({
    beforeCreate() {
        Vue.prototype.$bus = this
    },
    render: h => h(App),
    // 注册路由
    router,
    // 注册仓库，组件身上会有一个$store方法
    store,
    
}).$mount('#app');

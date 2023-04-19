// // 导入一级路由组件
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import addCartSuccess from '@/pages/AddCartSuccess'
// import shopCart from '@/pages/ShopCart'
// import trade from '@/pages/Trade'
// import pay from '@/pages/Pay'
// import paySuccess from '@/pages/PaySuccess'
// import center from '@/pages/Center'

// // 导入二级路由组件
// import myOrder from '@/pages/Center/MyOrder'
// import groupOrder from '@/pages/Center/GroupOrder'

// 对外暴露路由信息
export default [
    {
        path: '/home',
        // 路由懒加载，只有使用到的路由才会加载
        component: () => import('@/pages/Home'),
        meta: {showFooter: true}
    },
    {
        path: '/search/:keyword?',
        component: () => import('@/pages/Search'),
        meta: {showFooter: true},
        name: 'search',
        // 1 布尔值：只有params参数
        // props: true
        // 2 对象：额外增加参数
        // props: {a:11, b:234}
        // 函数形式 可以对params参数和query参数处理
        props: ($route) => ({keyword: $route.params.keyword + '---', k: $route.query.k + '---'})
    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: {showFooter: false}
    },
    {
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: {showFooter: false}
    },
    {
        path: '/detail/:skuid',
        component: () => import('@/pages/Detail'),
        meta: {showFooter: false}
    },
    {
        path: '/addCartSuccess',
        name: 'addCartSuccess', 
        component: () => import('@/pages/AddCartSuccess'),
        meta: {showFooter: true}
    },
    {
        path: '/shopCart',
        name: 'shopCart',
        component: () => import('@/pages/ShopCart'),
        meta: {showFooter: true, needToken: true}
    },
    {
        path: '/trade',
        name: 'trade',
        component: () => import('@/pages/Trade'),
        meta:{showFooter: true,  needToken: true},
        beforeEnter: (to, from, next) => {
            if (from.fullPath === '/shopCart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: () => import('@/pages/Pay'),
        meta:{showFooter: true,  needToken: true},
        beforeEnter: (to, from, next) => {
            if (from.fullPath === '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paySuccess',
        name: 'paySuccess',
        component: () => import('@/pages/PaySuccess'),
        meta:{showFooter: true,  needToken: true},
        beforeEnter: (to, from, next) => {
            if (from.fullPath === '/pay') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/center',
        name: 'center',
        component: () => import('@/pages/Center'),
        meta:{showFooter: true,  needToken: true},
        children: [
             {
                path: 'myorder',
                component: () => import('@/pages/Center/MyOrder'),
                meta:{showFooter: true,  needToken: true},
             },
             {
                path:'grouporder',
                component: () => import('@/pages/Center/GroupOrder'),
                meta:{showFooter: true,  needToken: true},
             },
            //  重定向
            {
                path: '/center',
                redirect: '/center/myorder',
                meta:{showFooter: true,  needToken: true},
            }
        ]
    },
    // 重定向
    {
        path: '/',
        redirect: '/home'
    }
]
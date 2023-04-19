<template>
    <div>
        <Header></Header>
        <!-- 路由组件出口 -->
        <router-view></router-view>
        <Footer v-show="$route.meta.showFooter"></Footer>
    </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'


import {reqCategoryList} from '@/api/'
reqCategoryList()

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 挂在完成通知store请求数据
    this.$store.dispatch("homeStore/reqCategoryList");
  }
}
</script>

<style>
</style>

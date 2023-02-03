<template>
    <div>
        <!-- 全局组件直接使用即可 -->
        <TypeNav/>
        <ListContainer/>
        <Recommand/>
        <Rank/>
        <Like/>
        <Floor/>
        <Floor/>
        <Brand/>
    </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommand from '@/pages/Home/Recommand'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'


// 引入mapState功能函数
import { mapState } from 'vuex'

export default {
    name: 'Home',
    components: {
        ListContainer,
        Recommand,
        Rank,
        Like,
        Floor,
        Brand
    },
    computed: {    },
    methods: {

    }
}
</script>

<style>

</style>
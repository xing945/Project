<template>
    <el-row class="top-bar">
        <el-col :span="10">
            <Geo />
        </el-col>
        <el-col :span="14">
            <MyNav />
        </el-col>
    </el-row>
</template>
<script>
import Geo from './Geo'
import MyNav from './MyNav'
export default {
    components:{
        Geo,
        MyNav
    }
}
</script>
<style lang="scss">
    @import '@/assets/css/header/topbar.scss';
</style>
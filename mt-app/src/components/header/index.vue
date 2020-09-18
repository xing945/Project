<template>
    <header class="header">
        <el-row>
            <TopBar />
        </el-row>
        <el-row>
            <SearchBar />
        </el-row>
    </header>
</template>
<script>
import TopBar from './TopBar'
import SearchBar from './SearchBar'
export default {
    components:{
        TopBar,
        SearchBar
    }
}
</script>
<style lang="scss">
    @import '@/assets/css/header/index.scss';
</style>
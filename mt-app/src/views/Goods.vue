<template>
    <div class="product">
        <el-row class="crumbs">
            <Crumbs />
        </el-row>
        <el-row>
            <el-col :span="19">
                <el-row>
                    <Categroy />
                </el-row>
                <el-row>
                    <List />
                </el-row>
            </el-col>
            <el-col :span="5">
                <Side />
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Crumbs from '@/components/products/Crumbs'
import Categroy from '@/components/products/Categroy'
import List from '@/components/products/List'
import Side from '@/components/products/Side'
export default {
    components:{
        Crumbs,
        Categroy,
        List,
        Side
    },
}
</script>
<style lang="scss">
    @import '@/assets/css/products/index.scss';
</style>
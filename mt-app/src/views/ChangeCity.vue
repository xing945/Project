<template>
    <div class="change-city">
        <el-row>
            <Province />
        </el-row>
        <el-row>
            <Hot title="热门城市" :list="hotList" />
        </el-row>
        <el-row>
            <Hot title="最近访问" :list="rencentList" />
        </el-row>
        <el-row>
            <Categroy />
        </el-row>
    </div>
</template>
<script>
import Province from '@/components/changecity/Province';
import Hot from '@/components/changecity/Hot'
import Categroy from '@/components/changecity/Categroy'
export default {
    components:{
        Province,
        Hot,
        Categroy
    },
    data(){
        return {
            hotList:[],
            rencentList:[],
        }
    },
    mounted(){
        this.axios.getHotCity().then(res=>{
            this.hotList = res.data.data;
        })
        this.axios.getRecentCity().then(res=>{
            this.rencentList = res.data.data;
        })
    }
}
</script>
<style lang="scss">
    @import '@/assets/css/changecity/province.scss';
</style>
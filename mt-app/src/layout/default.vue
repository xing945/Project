<template>
  <el-container class="layout-default">
    <el-header height="">
      <MyHeader />
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer height="">
      <MyFooter />
    </el-footer>
  </el-container>
</template>
<script>
import MyHeader from '@/components/header/index'
import MyFooter from '@/components/footer/index'
export default {
  components: {
    MyHeader,
    MyFooter,
  },
}
</script>
<style lang="scss">
@at-root .layout-default {
  .el-header {
    .header {
      width: 100%;
    }
  }
}
.el-header,
.el-footer,
.el-main {
  width: 1190px;
  margin: 0 auto;
  overflow: unset;
  padding: 0;
}
.el-header {
  background: #f8f8f8;
  color: #999;
  width: 100%;
  font-size: 12px;
  header {
    width: 1190px;
    margin: 0 auto;
  }
}

.layout-default {
  -webkit-font-smoothing: antialiased;
  font-family: '-apple-system', BlinkMacSystemFont, Roboto, 'Helvetica Neue',
    'MIcrosoft YaHei', sans-serif !important;
  background-color: #f8f8f8;
}
</style>
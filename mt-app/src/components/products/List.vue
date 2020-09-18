<template>
  <div class="products-list">
    <ul>
      <li v-for="(item,index) in nav"
          :key="index"
          :class="{'nav-active':item.active}">{{item.name}}</li>
    </ul>
    <el-row>
        <Item v-for="(item,index) in productList" :key="index" :meta="item" />
    </el-row>
  </div>
</template>
<script>
import Item from './Item'
export default {
  data() {
    return {
      nav: [
        {
          key: 's-default',
          name: '智能排序',
          active: true,
        },
        {
          key: 's-price',
          name: '价格最低',
          active: false,
        },
        {
          key: 's-score',
          name: '人气最高',
          active: false,
        },
        {
          key: 's-comment',
          name: '评价最高',
          active: false,
        },
      ],
      productList: [],
    }
  },
  mounted(){
      this.axios.getProductsList().then(res=>{
          this.productList = res.data.data;
      })
  },
  components:{
      Item
  }
}
</script>
<style lang="scss">
    @import '@/assets/css/products/list.scss';
</style>
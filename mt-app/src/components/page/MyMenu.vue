<template>
  <div class="menu">
    <dl class="nav"
        @mouseleave="menuLeave">
      <dt>全部分类</dt>
      <dd v-for="(item,index) in menuList"
          :key="index"
          @mouseenter="menuEnter(item)">
        <i :class="item.type"></i>
        {{ item.name }}
        <span class="iconfont icon-youjiantou"></span>
      </dd>
    </dl>
    <div class="detail"
         v-if="curDetail"
         @mouseenter="detailEnter"
         @mouseleave="detailLeave"
         >
      <template v-for="(item,index) in curDetail.items">
        <h4 :key="index">{{item.title}}</h4>
        <span v-for="(v,i) in item.items"
              :key="v + '_'+ i">{{v}}</span>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuList: [],
      curDetail: null,
    }
  },
  mounted() {
    this.axios.getMenuList().then((res) => {
      this.menuList = res.data.data
    })
  },
  methods: {
    menuEnter(item) {
      this.curDetail = item
    },
    menuLeave() {
      this.timer = setTimeout(() => {
        this.curDetail = null
      }, 200)
    },
    detailEnter(){
        clearTimeout(this.timer);
    },
    detailLeave(){
        this.curDetail = null;
    }
  },
}
</script>
<style lang="scss">
@import '@/assets/css/page/menu.scss';
</style>
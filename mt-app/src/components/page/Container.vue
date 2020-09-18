<template>
  <div class="container">
    <dl :class="nav.class"
        @mouseover="over">
      <dt>{{ nav.title }}</dt>
      <dd v-for="(item,index) in nav.list"
          :key="index"
          :class="{'active':kind === item.tab}"
          :data-type="item.tab">
        {{ item.text }}
      </dd>
    </dl>
    <ul class="ibody">
      <li v-for="(item,index) in resultsData[kind]"
          :key="index">
        <el-card :body-style="{ padding: '0px' }"
                 shadow="never">
          <img :src="item.image"
               class="image">
          <div class="cbody">
            <div class="title"
                 :title="item.title">{{item.title}}</div>
            <div class="sub-title"
                 :title="item.sub_title">{{item.sub_title}}</div>
            <div class="price-info">
              <span class="current-price-wrapper">
                <span class="price-symbol numfont">¥</span>
                <span class="current-price numfont">{{item.price}}</span>
              </span>
              <span class="sold bottom-right-info">{{item.address}}</span>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      kind: 'all',
      resultsData: {},
    }
  },
  props: ['nav'],
  methods: {
    over(e) {
      if (e.target.tagName !== 'DD') {
        return
      }
      this.kind = e.target.getAttribute('data-type')
    },
  },
  mounted() {
    this.axios.resultsByKeywords().then((res) => {
      this.resultsData = res.data.data
    })
  },
}
</script>
<style lang="scss">
@import '@/assets/css/page/container.scss';
</style>
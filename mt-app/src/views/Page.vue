<template>
  <div class="page">
    <el-row>
      <el-col :span="5">
        <MyMenu />
      </el-col>
      <el-col :span="19">
        <MyLife />
      </el-col>
    </el-row>
    <el-row :span="24">
      <Container :nav="iStyle" />
    </el-row>
    <el-row :span="24">
      <Container :nav="recomment" />
    </el-row>
  </div>
</template>
<script>
import MyMenu from '@/components/page/MyMenu'
import MyLife from '@/components/page/MyLife'
import Container from '@/components/page/Container'
export default {
  components: {
    MyMenu,
    MyLife,
    Container,
  },
  data() {
    return {
      iStyle: {
        class: 'istyle',
        title: '有格调',
        list: [
          {
            text: '全部',
            tab: 'all',
          },
          {
            text: '约会聚餐',
            tab: 'food',
          },
          {
            text: '丽人SPA',
            tab: 'spa',
          },
          {
            text: '电影演出',
            tab: 'movie',
          },
          {
            text: '品质出游',
            tab: 'travel',
          },
        ],
      },
      recomment: {
        class: 'youhui',
        title: '很优惠',
        list: [
          {
            text: '全部',
            tab: 'all',
          },
          {
            text: '美食',
            tab: 'food',
          },
          {
            text: '休闲',
            tab: 'xiuxian',
          },
        ],
      },
    }
  },
}
</script>
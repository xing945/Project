<template>
  <div class="slider">
    <el-carousel height="240px">
      <el-carousel-item v-for="item in imgList"
                        :key="item.img">
        <img :src="item.img"
             alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgList: [
        {
          url: '#xxx',
          img:
            'https://p1.meituan.net/travelcube/01d2ab1efac6e2b7adcfcdf57b8cb5481085686.png',
        },
        {
          url: '#ass',
          img:
            'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg',
        },
        {
          url: '#vc',
          img:
            'http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg',
        },
      ],
    }
  },
}
</script>
<style lang="scss">
    .slider {
      height: 240px;
      width: 550px;
      margin-top:20px;
      margin-left:-8px;
      img {
        height: 100%;
        width:100%;
      }
    }
</style>
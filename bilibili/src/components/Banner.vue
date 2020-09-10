<template>
  <div class="banner-box" v-if="bannerList.length">
    <ul
      class="banner-list"
      :style="bannerStyle"
      @transitionend="transitionendFn"
    >
      <li class="banner" v-for="banner in bannerList" :key="banner.id">
        <img :src="banner.poster" :alt="banner.title" class="poster" />
      </li>
    </ul>
    <ul class="index-list">
      <li
        class="index"
        :class="{
          active: index - 1 === bannerIndex % 3
        }"
        v-for="index in bannerList.length - 1"
        :key="index"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [],
      bannerWidth: 350,
      bannerStyle: {
        left: 0,
        transition: "left .3s"
      },
      bannerIndex: 0
    };
  },
  methods: {
    async getData() {
      const res = await this.axios.get("banner");
      let endEl = { ...res[0] };
      endEl.id = Math.floor(Math.random() * 100000);
      this.bannerList = [...res, endEl];
    },
    autoMove() {
      setTimeout(() => {
        if (this.bannerIndex === 0) {
          this.bannerStyle.transition = "left .3s";
        }
        this.bannerIndex++;
        this.bannerStyle.left = -this.bannerIndex * this.bannerWidth + "px";
      }, 1500);
    },
    transitionendFn() {
      if (this.bannerIndex === 3) {
        this.bannerIndex = 0;
        this.bannerStyle.left = 0;
        this.bannerStyle.transition = "none";
      }
      this.autoMove();
    }
  },
  mounted() {
    this.getData();
    this.autoMove();
  }
};
</script>

<style lang="less" scoped>
.banner-box {
  position: relative;
  top: 90px;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  height: 110px;
  border-radius: 6px;
  overflow: hidden;
  .banner-list {
    position: absolute;
    left: 0;
    width: calc(350px * 4);
    .banner {
      float: left;
      width: 350px;
      height: 110px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .index-list {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 3px;
    padding: 0 3px;
    height: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    border-radius: 5px;
    .index {
      width: 5px;
      height: 5px;
      margin: 0 3px;
      background-color: #fff;
      border-radius: 50%;
      &.active {
        background-color: #fb2977;
      }
    }
  }
}
</style>
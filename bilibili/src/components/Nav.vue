<template>
  <nav v-if="navList.length">
    <div
      :class="{
        'nav-box': navIndex === 1,
        'hide-nav-box': navIndex === 2,
        hide: navIndex === 2 && navFlag
      }"
      v-for="navIndex in 2"
      :key="navIndex"
    >
      <ul class="nav-list">
        <li
          class="nav"
          :class="{
            active: navActive === index,
            big: nav.title.length >= 3 && navIndex === 2
          }"
          v-for="(nav, index) in navList"
          :key="nav.id"
          @click="handleIndex(index)"
        >
          {{ nav.title }}
        </li>
      </ul>
      <div class="down" v-if="navIndex === 1" @click="handleClick">
        <svg width="16" height="32" viewBox="0 0 1024 1024">
          <path
            data-v-65af85a3=""
            d="M515.2 649.6L169.6 304c-12.8-12.8-32-12.8-44.8 0s-12.8 35.2 0 48l368 364.8c12.8 12.8 32 12.8 44.8 0l361.6-361.6c12.8-12.8 12.8-35.2 0-48s-32-12.8-44.8 0L515.2 649.6z"
            fill="#ccc"
          ></path>
        </svg>
      </div>
      <div class="up" v-else @click="handleClick">
        <svg width="16" height="32" viewBox="0 0 1024 1024">
          <path
            data-v-65af85a3=""
            d="M854.4 713.6c12.8 12.8 32 12.8 44.8 0s12.8-35.2 0-48L537.6 304c-12.8-12.8-32-12.8-44.8 0L124.8 672c-12.8 12.8-12.8 35.2 0 48s32 12.8 44.8 0l345.6-342.4 339.2 336z"
            fill="#ccc"
          ></path>
        </svg>
      </div>
    </div>
  </nav>
</template>
<style lang="less" scoped>
nav {
  .nav-box {
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    background-color: #fff;
    z-index: 1;
    .nav-list {
      width: 85%;
      white-space: nowrap;
      overflow-x: scroll;
      padding-left: 24px;
      &::-webkit-scrollbar {
        display: none;
      }
      .nav {
        display: inline-block;
        margin-right: 40px;
        height: 30px;
        line-height: 30px;
        color: #757575;
        font-size: 14px;
        border-bottom: 2px solid transparent;
        &.active {
          border-color: #fb7299;
          color: #fb7299;
        }
      }
    }
    .down {
      position: absolute;
      right: 13px;
      top: -3px;
    }
  }
  .hide-nav-box {
    position: fixed;
    left: 0;
    top: 54px;
    right: 0;
    padding-bottom: 20px;
    z-index: 2;
    background-color: #fff;
    transition: top 0.3s;
    &.hide {
      top: -117px;
    }
    .nav-list {
      .nav {
        display: inline-block;
        width: 32px;
        text-align: center;
        font-size: 14px;
        color: #757575;
        padding: 6px 0;
        margin: 0 14px 10px 14px;
        border-bottom: 2px solid transparent;
        &.active {
          border-color: #fb7299;
          color: #fb7299;
        }
        &.big {
          width: 46px;
          margin-left: 7px;
          margin-right: 7px;
        }
      }
    }
    .up {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      navList: [],
      navActive: 0,
      navFlag: true
    };
  },
  methods: {
    // 显示或隐藏
    handleClick() {
      this.navFlag = !this.navFlag;
    },
    // 点击active
    handleIndex(index) {
      this.navActive = index;
    }
  },
  mounted() {
    this.axios.get("nav").then(res => {
      this.navList = res;
    });
  }
};
</script>

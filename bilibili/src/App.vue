<template>
  <div id="app" @scroll="handleScroll">
    <!-- 头部 -->
    <Header />
    <!-- 导航区域 -->
    <Nav />
    <!-- 轮播图区域 -->
    <Banner />
    <!-- 视频内容区域 -->
    <Video ref="Video" />
    <!-- 脚部 -->
    <Footer />
  </div>
</template>
<script>
import Header from "./components/Header";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Video from "./components/Video";
import Footer from "./components/Footer";
export default {
  components: {
    Header,
    Nav,
    Banner,
    Video,
    Footer
  },
  methods: {
    handleScroll(e) {
      // 让子组件来监听父组件的事件
      this.$refs.Video.$emit("childMethod", e);
    }
  }
};
</script>
<style>
@import "./assets/reset.css";
:root,
body {
  height: 100%;
}
#app {
  height: 100%;
  overflow-y: scroll;
}
</style>

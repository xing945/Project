<template>
  <div class="geo">
    <div class="position">
      <i class="iconfont icon-weizhi"></i>
      {{ $store.state.position.name }}
      <router-link class="changeCity"
                   :to="{name:'changeCity'}">切换城市</router-link>
      [
      <a href=""
         v-for="(item,index) in nearCity"
         :key="index"> {{ item.name }} </a>
      ]
    </div>
    <div class="user"
         v-if="!$store.state.userName">
      <router-link class="login"
                   :to="{name:'login'}">立即登录</router-link>
      <router-link class="register"
                   :to="{name:'register'}">注册</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nearCity: [],
    }
  },
  mounted() {
    this.axios.getCurPosition().then((res) => {
      this.$store.dispatch('setPosition', res.data.data)
      this.nearCity = res.data.data.nearCity
    })
  },
  watch: {
    '$store.state.position': function () {
      this.nearCity = this.$store.state.position.nearCity
    },
  },
}
</script>
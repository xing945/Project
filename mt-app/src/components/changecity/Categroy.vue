<template>
  <div class="categroy">
    <dl class="categroy-nav">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="(item,index) in list"
          :key="index">
        {{ item }}
      </dd>
    </dl>
    <dl class="section"
        v-for="(item,index) in cityGroup"
        :key="index"
        :id="'city-' + index">
      <dt>{{index}}</dt>
      <dd>
        <span v-for="city in item"
              :key="city.id"
              @click="changeCity(city)">{{ city.name }}</span>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      cityGroup: {},
    }
  },
  mounted(){
      this.axios.getCityList().then(res=>{
          let obj = {};
          res.data.data.forEach((item) => {
                if(!obj[item.firstChar.toUpperCase()]){
                    obj[item.firstChar.toUpperCase()] = [];
                }
                obj[item.firstChar.toUpperCase()].push(item);
          });
          this.cityGroup = obj;
      })
  },
  methods: {
    changeCity(item) {
      this.$store.dispatch('setPosition', item)
      this.$router.push({ name: 'index' })
    },
  },
}
</script>
<style lang="scss">
    @import '@/assets/css/changecity/categroy.scss';
</style>
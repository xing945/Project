<template>
  <div>
    <span class="name">按省份选择:</span>
    <Select :list="provinceList"
            title="省份"
            className="province"
            :value="province"
            :showWrapperActive="provinceActive"
            @active_click="changeProvinceActive"
            @change="changeProvince" />
    <Select :showWrapperActive="cityActive"
            :list="cityList"
            title="城市"
            :value="city"
            className="city"
            :disabled="cityDisabled"
            @change="changeCity"
            @active_click="changeCityActive" />
    <span class="name search">直接搜索:</span>
    <el-select v-model="searchWord"
               filterable
               remote
               reserve-keyword
               placeholder="请输入城市中文或拼音"
               :remote-method="remoteMethod"
               :loading="loading">
      <el-option v-for="item in searchList"
                 :key="item"
                 :label="item"
                 :value="item"></el-option>
    </el-select>
  </div>
</template>
<script>
import Select from './Select'
export default {
  components: {
    Select,
  },
  data() {
    return {
      provinceActive: false,
      cityActive: false,
      provinceList: [],
      cityList: [],
      province: '省份',
      city: '城市',
      cityDisabled: true,
      searchList: ['哈尔滨', '佳木斯', '牡丹江', '鹤岗'],
      searchWord: '',
      loading: false,
    }
  },
  mounted() {
    this.axios.getProvinceList().then((res) => {
      this.provinceList = res.data.data.map((item) => {
        item.name = item.provinceName
        return item
      })
    })
  },
  methods: {
    changeProvinceActive(flag) {
      this.provinceActive = flag
      if (flag) {
        this.cityActive = false
      }
    },
    changeCityActive(flag) {
      this.cityActive = flag
      if (flag) {
        this.provinceActive = false
      }
    },
    changeProvince(item) {
      this.province = item.name
      this.cityList = item.cityInfoList
      this.cityDisabled = false
    },
    changeCity(item) {
      this.city = item.name
      this.$store.dispatch('setPosition', item)
      this.$router.push({ name: 'index' })
    },
    remoteMethod() {
      // 请求后端接口
      console.log(document.cookie, localStorage)
    },
  },
}
</script>
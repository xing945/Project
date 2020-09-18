<template>
  <div class="search-panel">
    <el-row class="search-bar">
      <el-col :span="3"
              class="left">
        <router-link :to="{name:'index'}">
            <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png"
             alt="">
        </router-link>
      </el-col>
      <el-col :span="5"
              class="center">
        <div class="wrapper">
          <el-input v-model="searchWord" placeholder="搜索商家或地点" @focus="focusFn" @blur="blurFn" @input="inputFn"></el-input>
          <el-button type="primary"
                     class="iconfont icon-sousuo1"></el-button>
          <dl class="searchList" v-if="isSearchList">
              <dd v-for="(item,index) in searchList" :key="index">
                  <router-link :to="{name:'goods',params:{name:item}}">{{item}}</router-link>
              </dd>
          </dl>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
    data(){
        return {
            searchList:[],
            searchWord: '',
            isFocus: false,
        }
    },
    computed:{
        isSearchList(){
            return this.searchWord && this.isFocus;
        }
    },
    methods:{
        focusFn(){
            this.isFocus = true;
        },
        blurFn(){
            setTimeout(()=>{
                this.isFocus = false;
            },200)
        },
        inputFn(){
            let val = this.searchWord;
            this.axios.getSearchList().then(res=>{
                this.searchList = res.data.data.list.filter((item)=>{
                    return item.includes(val);
                });
            })
        }
    },
    watch:{
        '$router.params.name':function(){
            this.searchWord = this.$route.params.name;
        }
    }
}
</script>
<style lang="scss">
@import '@/assets/css/header/searchbar.scss';
</style>
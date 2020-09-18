<template>
  <div :class="['choose-wrap',disabled ? 'disabled' : '']"
       v-document-click="documentClick">
    <div class="choose"
         @click="showContent">
      <span>{{value}}</span>
      <i class="el-icon-caret-bottom"></i>
      <div class="mt-content"
           :class="{'active':showWrapperActive}">
        <h2>{{title}}</h2>
        <div :class="['wrapper',className]">
          <div class="col"
               v-for="(item,index) in renderList"
               :key="index">
            <span v-for="(v,i) in item"
                  :key="i"
                  @click="changeValue(v)"
                  :class="{'mt-item':true,'active':v.name === value}">
              {{ v.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['showWrapperActive', 'list','value','title','className','disabled'],
  computed: {
    renderList() {
      let col = Math.ceil(this.list.length / 12)
      let resultList = []
      for (let i = 0; i < col; i++) {
        let data = this.list.slice(i * 12, i * 12 + 12)
        resultList.push(data)
      }
      return resultList
    },
  },
  methods: {
    showContent(e) {
      e.stopPropagation()
      if(!this.disabled){
          this.$emit('active_click', true)
      }
    },
    documentClick() {
      this.$emit('active_click', false)
    },
    changeValue(item){
        this.$emit('change',item);
    }
  },
}
</script>
<style lang="scss">
@import '@/assets/css/changecity/select.scss';
</style>
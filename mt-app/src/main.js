import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css';
import api from './server/index'

// 将api里面的方法挂到vue实例上
Vue.prototype.axios = api;
Vue.use(ElementUi);
Vue.config.productionTip = false

// 自定义指令
Vue.directive('document-click',{
    bind(el,binding,vnode){
        console.log(el,vnode);
        document.addEventListener('click',binding.value,false);
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

<template>
  <div class="register">
    <header>
      <div class="header">
        <a href="#"
           class="site-logo"></a>
        <div class="login">
          <span class="bold">已有美团账号？</span>
          <router-link :to="{naem: 'login'}">登录</router-link>
        </div>
      </div>
    </header>
    <div class="content">
      <el-form :model="registerForm"
               status-icon
               :rules="rules"
               ref="registerForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="用户名"
                      prop="userName">
          <el-input type="text"
                    v-model="registerForm.userName"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input type="password"
                    v-model="registerForm.password"
                    autocomplete="off"
                    @input="input"></el-input>
          <div class="pw-strength">
            <div :class="['bar', strengthClass]"></div>
            <div class="letter">
              <span>弱</span>
              <span>中</span>
              <span>强</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="确认密码"
                      prop="rePassword">
          <el-input type="password"
                    v-model="registerForm.rePassword"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="register-btn"
                     type="primary"
                     @click="submitForm('registerForm')">同意以下协议并注册</el-button>
        </el-form-item>
        <div class="term">
          <a class="f1"
             href="https://rules-center.meituan.com/rules-detail/4"
             target="_blank">《美团点评用户服务协议》</a>
          <a class="f1"
             href="https://rules-center.meituan.com/rules-detail/2"
             target="_blank">《美团点评隐私政策》</a>
        </div>
      </el-form>
    </div>
    <footer class="footer">
      <p class="copyright">
        ©<a class="f1"
           href="https://www.meituan.com">meituan.com</a>&nbsp;
        <a class="f1"
           target="_blank"
           href="http://www.miibeian.gov.cn/">京ICP证070791号</a>&nbsp;
        <span class="f1">京公网安备11010502025545号</span>
      </p>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (value.length < 4 || value.length > 16) {
        callback(new Error('用户名必须为4-16位的字母数字下划线组成'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.rePassword !== '') {
          this.$refs.registerForm.validateField('rePassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        userName: '',
        password: '',
        rePassword: '',
      },
      strengthClass: '',
      rules: {
        userName: [{ validator: validateUser, trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur' }],
        rePassword: [{ validator: validatePass2, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .register({
              params: this.registerForm,
            })
            .then((res) => {
              if (res.data.status == 'success') {
                alert('注册成功')
                this.$router.push({ name: 'login' })
              } else {
                alert(res.data.msg)
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    input() {
      let regStr = /(\w)+/g
      let regNum = /(\d)+/g
      let reg = /_/g
      let strongth =
        this.registerForm.password.match(reg) &&
        this.registerForm.password.match(regStr) &&
        this.registerForm.password.match(regNum)
      if (
        this.registerForm.password.length > 20 ||
        (this.registerForm.password.length > 6 && strongth)
      ) {
        this.strengthClass = 'strong'
      } else if (this.registerForm.password.length < 6) {
        this.strengthClass = 'week'
      } else if (!this.registerForm.password) {
        this.strengthClass = ''
      } else {
        this.strengthClass = 'normal'
      }
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/css/register/index.scss';
</style>
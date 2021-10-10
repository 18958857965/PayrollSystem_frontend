<template>
  <el-form
      ref="registerForm"
      :model="registerForm"
  >
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="registerForm.phone" placeholder="please input phone number"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-input  v-model="registerForm.code" placeholder="please input code"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="info" @click="getCode">获取验证码</el-button>
      <el-button type="primary" plain @click="submitRegister"
      >确认注册
      </el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      registerForm: {
        phone: '',
        code: 0
      },
    }
  },
  methods: {
    getCode() {
      if (this.registerForm.phone) {
        this.postRequest("/register", this.registerForm).then(resp => {
          if (resp.result===true) {
            this.$message('验证码已发送')
          }
        })
      }
    },
    submitRegister(){
      if(this.registerForm.phone&&this.registerForm.code!==0){
        this.postRequest("/register", this.registerForm).then(resp => {
          if (resp.result===true) {
            this.$message('注册成功,可以使用手机号登录 !')
          }
        })

      }
    }
  }


}
</script>

<style scoped>
.registerContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 140px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #aee7eb;
}

</style>
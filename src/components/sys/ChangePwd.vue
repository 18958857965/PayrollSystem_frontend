<template>
  <el-form>
    <el-form-item label="手机号" size="small">
      <el-input v-model="submitForm.phone" size="small" disabled></el-input>
    </el-form-item>
    <el-form-item label="验证码"  size="small">
      <el-input v-model="submitForm.code" size="small" ></el-input>
      <el-button @click="getCode">获取验证码</el-button>
    </el-form-item>
    <el-form-item label="新密码"  size="small">
      <el-input v-model="submitForm.newPwd" size="small" disabled></el-input>
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  name: "ChangePwd",
  data(){
    return{
      submitForm:{
        phone:'',
        code:'',
        newPwd:''
      }
    }

  },
  methods:{
    getCode() {
      if (this.submitForm.phone) {
        this.postRequest("/修改密码", this.submitForm).then(resp => {
          if (resp.result===true) {
            this.$message('验证码已发送')
          }
        })
      }
    },
    submitChange(){
      if(this.submitForm.phone&&this.submitForm.code!==0){
        this.postRequest("/修改密码", this.submitForm).then(resp => {
          if (resp.result===true) {
            this.$message('修改成功 !')
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
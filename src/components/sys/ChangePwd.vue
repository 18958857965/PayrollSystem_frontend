<template>
  <el-form>
    <el-form-item label="手机号" size="small">
      <el-input v-model="submitForm.phone" size="small" disabled></el-input>
    </el-form-item>
    <el-form-item label="验证码"  size="small">
      <el-input v-model="submitForm.code" size="small" style="width: 180px"></el-input>
      <el-button @click="getCode" style="float: right">获取验证码</el-button>
    </el-form-item>
    <el-form-item label="新密码"  size="small">
      <el-input v-model="submitForm.newPwd" size="small" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" plain @click="submitChange" size="small"
      >确认修改
      </el-button
      >

    </el-form-item>

  </el-form>
</template>

<script>
export default {
  name: "ChangePwd",
  data(){
    return{
      submitForm:{
        phone:this.$store.state.user.phone,
        code:'',
        newPwd:''
      }
    }
  },
  methods:{
    getCode() {
      if (this.submitForm.phone) {
        this.postRequest('/change', this.submitForm).then(resp => {
          if (resp.result===true) {
            this.$message('验证码已发送')
          }
        })
      }
    },
    submitChange(){
      if(this.submitForm.phone&&this.submitForm.code!==0){
        this.postRequest('/change?code='+this.submitForm.code+'&pwd='+this.submitForm.newPwd).then(resp => {
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
<template>
  <el-tabs :tab-position="tabPosition"  v-model="activeName">
    <el-tab-pane label="用户信息" name="UserInfo"><UserInfo></UserInfo></el-tab-pane>
    <el-tab-pane label="员工信息" name="EmployeeInfo"><EmployeeInfo></EmployeeInfo></el-tab-pane>
    <el-tab-pane label="修改密码" name="ChangePwd"><ChangePwd></ChangePwd></el-tab-pane>

  </el-tabs>


</template>

<script>
import UserInfo from "./UserInfo";
import EmployeeInfo from "./EmployeeInfo";
import ChangePwd from "./ChangePwd";
export default {

  name: "SelfSpace",
  components: {ChangePwd, EmployeeInfo, UserInfo},
  methods:{
    getCompany(){
      if(window.sessionStorage.getItem('company')){
        JSON.parse(window.sessionStorage.getItem('company'))

      }

    }

  },

  data() {
    return {
      tabPosition: 'left',//'top',
      activeName: 'UserInfo',
      company:'',
    }
  },
  mounted(){
    this.getCompany();


  }
}
</script>

<style scoped>

</style>
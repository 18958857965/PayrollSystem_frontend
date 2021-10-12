<template>
  <div>
    <div v-if="this.$store.state.company">
      <el-form :rules="rules"
               ref="employeeForm"
               :model="employeeForm"
      >
        <el-form-item label="员工id" size="small">
          <el-input v-model="employeeForm.id" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户id" size="small">
          <el-input v-model="employeeForm.uid" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="公司id" size="small">
          <el-input v-model="employeeForm.cid" size="small" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="员工称呼" prop="name" size="small">
          <el-input v-model="employeeForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="员工类型" prop="type" size="small">

          <el-select v-model="employeeForm.type" size="small" :disabled="true">
            <el-option label="小时工" value="0"></el-option>
            <el-option label="雇佣工" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="居住地址" size="small">
          <el-input v-model="employeeForm.location" size="small"></el-input>
        </el-form-item>
        <el-form-item label="社保号" size="small">
          <el-input v-model="employeeForm.socialCode" size="small"></el-input>
        </el-form-item>
        <el-form-item label="税" size="small">
          <el-input v-model="employeeForm.tax" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="其他扣除额" size="small">
          <el-input v-model="employeeForm.otherTax" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="薪资(每月)" size="small">
          <el-input v-model="employeeForm.salary" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item label="佣金率" prop="percent" size="small">
          <!--          <el-input v-model="employeeForm.percent" size="small" disabled></el-input>-->
          <el-select v-model="employeeForm.percent" size="small" disabled>
            <el-option label="无佣金" value=0></el-option>
            <el-option label="0.1" value=0.1></el-option>
            <el-option label="0.15" value=0.15></el-option>
            <el-option label="0.25" value=0.25></el-option>
            <el-option label="0.35" value=0.35></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工时限制" prop="lenLimit" size="small">
          <el-input v-model="employeeForm.lenLimit" size="small" disabled></el-input>
        </el-form-item>

        <el-form-item label="支付方式" prop="payType" size="small">
          <el-select v-model="employeeForm.payType" size="small">
            <el-option label="直接付款" value="0"></el-option>
            <el-option label="邮寄支票" value="1"></el-option>
            <el-option label="银行卡收款" value="2"></el-option>
          </el-select>


        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="updateEmployee" size="small">确认修改</el-button>
        </el-form-item>


      </el-form>
    </div>
    <div v-else>
      no employeeinfo
    </div>
  </div>
</template>

<script>
export default {
  name: "EmployeeInfo",
  methods: {
    updateEmployee() {


      this.postRequest('/employee/update?cid=' + this.$store.state.company.cid, this.employeeForm).then(resp => {
        if (resp) {
          this.$store.commit('initEmployee', this.employeeForm);
          this.$message({
            type: 'success',
            message: '修改成功!'
          });

        }
      })


    },


  },
  data() {
    return {
      etype:this.$store.state.employee.type,
      employeeForm: this.$store.state.employee,

      company: this.$store.state.company,

      rules: {
        uid: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
        ],
        tax: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
        ],
        location: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
        ],
        salary: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
        ],
        percent: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
        ],
        lenLimit: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
        ],

        payType: [
          {required: true, message: '请选择支付方式', trigger: 'change'}
        ],

      }
    }
  },
  mounted() {


  }
}
</script>

<style scoped>

</style>
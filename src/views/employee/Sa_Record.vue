<template>
  <el-tabs :tab-position="tabPosition" type="border-card" v-model="activeName">
    <el-tab-pane label="考勤记录" name="AttendanceRecord"><AttendanceRecord></AttendanceRecord></el-tab-pane>
    <el-tab-pane label="订单记录" name="OrderRecord"><OrderRecord></OrderRecord></el-tab-pane>

  </el-tabs>
</template>

<script>
import AttendanceRecord from "../../components/sys/AttendanceRecord";
import OrderRecord from "../../components/sys/OrderRecord";

export default {
  name: "Sa_Record",
  data() {
    return {
      tabPosition: 'bottom',//'top',
      activeName: 'AttendanceRecord',
    }
  },
  components:{
    AttendanceRecord,
    OrderRecord,

  }


}
</script>

<style scoped>

</style>
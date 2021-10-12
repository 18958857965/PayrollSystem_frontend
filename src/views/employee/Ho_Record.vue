<template>
  <el-tabs :tab-position="tabPosition" type="border-card" v-model="activeName">
    <el-tab-pane label="考勤记录" name="AttendanceRecord"><AttendanceRecord></AttendanceRecord></el-tab-pane>


  </el-tabs>
</template>

<script>

import AttendanceRecord from "../../components/sys/AttendanceRecord";


export default {
  name: "Ho_Record",
  components: {AttendanceRecord},
  data() {
    return {
      tabPosition: 'bottom',//'top',
      activeName: 'AttendanceRecord',
    }
  }
}
</script>

<style scoped>

</style>
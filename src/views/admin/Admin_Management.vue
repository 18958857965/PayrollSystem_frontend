<template>
  <div class="border" style="margin-top: 10px">

    <div>
      <el-select v-model="reportType" placeholder="请选择需要的报告类型" class="inputInfo">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>


      <el-select v-model="send.uid"  placeholder="请选择员工" class="inputInfo" style="margin-right: 100px"
                 size="small">
        <el-option
            v-for="item in employees"
            :key="item.uid"
            :label="item.name"
            :value="item.uid">
        </el-option>
      </el-select>

      <el-date-picker
          class="inputInfo"
          v-model="send.startTime"
          type="datetime"
          placeholder="选择开始日期时间"
          value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
      <span style="margin-left: 10px;margin-right: 10px">至</span>
      <el-date-picker
          class="inputInfo"
          v-model="send.endTime"
          type="datetime"
          placeholder="选择截止日期时间"
          value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>


    </div>


    <div>

      <img  :src="src" alt="">

    </div>
    <div>

      <el-row>
        <el-col :span="4">
          <div class="grid-content"></div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content"></div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content"></div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content"></div>
        </el-col>
        <el-col :span="5">
          <el-button round @click="renderReport">确认生成报告</el-button>
<!--          <el-button type="primary" icon="el-icon-download" circle @click="download"></el-button>
          <el-button type="success" icon="el-icon-share" circle @click="share"></el-button>-->
        </el-col>


      </el-row>

    </div>


  </div>
</template>
<script>

export default {

  name: "Admin_Management",
  data() {
    return {
      employees: [],
      src: '',
      //unfmtEmployeeId: [],
      send: {
        uid: '',


        startTime: '',
        endTime: '',
        pid: ''
      },


      //isRender:false,
      reportType: '',

      options: [
        {
          label: '工作小时数',
          value: 0
        },
        {
          label: '工资',
          value: 3,
        }
      ]
    }
  },
  mounted() {
    this.getEmployees();
  },
  methods: {
    getEmployees() {
      this.postRequest('/employee/getAll?cid=' + this.$store.state.company.cid).then(resp => {
            if (resp && resp.result.length && resp.result.length > 0) {
              this.employees = resp.result;
            }
          }
      )

    },
    renderReport() {


      if (this.send.startTime &&
          this.send.endTime &&
          this.reportType !== null &&
          this.send.uid
      ) {
        /*for(let i=0;i<this.unfmtEmployeeId.length;i++){
          this.send.uid.push(this.unfmtEmployeeId[i].value)
        }*/
        //let num='1231231';
        /*console.log('/report/drawOther?cid=' + this.$store.state.company.cid + '&code=' + this.reportType);
        console.log(this.send)*/
        this.postRequest('/report/drawOther?cid=' + this.$store.state.company.cid + '&code=' + this.reportType, this.send).then(resp => {

          if (resp) {
            this.src = resp.result;
          } else {
            this.$message.error('选择信息有误');

          }
        })


      } else {
        this.$message.error('请选择完整信息');

      }


    },
    download() {

    },
    share() {

    },
  }
}
</script>

<style scoped>
.inputInfo {
  margin: 3px 6px 3px 6px;
}

.border {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 10px 10px 10px;
  width: auto;
  height: 450px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}


</style>
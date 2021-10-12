<template>
  <div>
    <div>
      <el-button icon="el-icon-plus" type="primary" size="small" @click="showAdd">添加记录</el-button>

    </div>
    <div class="tableClass">
      <el-table
          max-height="350"
          size="small"
          border
          :data="ARData"
          stripe
          style="width: 100%">
        <template slot="empty">
          <img class="loading" src="../../assets/src=http___img.zcool.cn_community_01eca95b5edad7a801215c8f2e2bcc.gif&refer=http___img.zcool.gif" style="width: 300px">

        </template>

        <!--        <el-table-column
                    type="selection"
                    width="40">
                </el-table-column>-->
        <el-table-column
            fixed
            prop="time"
            label="签到时间"
            width="90">
        </el-table-column>
        <el-table-column
            v-if="false"
            prop="id"
            label="签到编号"
            width="90">
        </el-table-column>
        <el-table-column

            prop="cid"
            label="公司编号"
            width="90">
        </el-table-column>
        <el-table-column

            prop="employeeId"
            label="员工编号"
            width="90">
        </el-table-column>
        <el-table-column
            v-if="false"
            prop="pid"
            label="项目编号"
            width="90">
        </el-table-column>
        <el-table-column

            prop="pname"
            label="项目"
            width="90">
        </el-table-column>

        <el-table-column
            prop="len"
            label="时长"
            width="180">
        </el-table-column>

        <!--        <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>

                  </template>
                </el-table-column>-->
      </el-table>

    </div>


    <el-dialog
        title="添加记录"
        :visible.sync="AR_add"
        width="30%">
      <div>

        <div class="block">
          <el-date-picker
              class="updateAR"
              v-model="addAR[0].time"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="expireTimeOption">
          </el-date-picker>
        </div>
        <div></div>

        <el-tag class="tag">时间</el-tag>
        <el-input v-model="addAR[0].len" size="small" class="updateAR"></el-input>
        <div></div>

        <el-tag class="tag">项目id</el-tag>

        <el-select v-model="addAR[0].pid" @change="showProject" placeholder="请选择项目编号" filterable class="inputInfo"
                   style="margin-right: 100px" size="small" clearable>
          <el-option
              v-for="item in project"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          >

            <span style=" color: #8492a6; font-size: 13px">{{ item.name }}</span>
          </el-option>
        </el-select>
        <div></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="AR_add = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doAdd">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
export default {
  name: "AttendanceRecord",
  data() {


    return {

      expireTimeOption: {
        disabledDate(date) {
          //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return (
              date.getTime() > Date.now() ||
              date.getTime() < Date.now() - 1000 * 3600 * 24 * 10
          );
        }
      },

      AR_add: false,
      project: [],
      emp: [],
      addAR: [{
        pid: '',
        cid: this.$store.state.company.cid,
        employeeId: this.$store.state.employee.id,
        id: '',
        len: '',
        time: '',
      }],
      ARData: [],
    }
  },
  mounted() {
    this.getProject();
    this.initARTable();

  },
  methods: {
    showProject() {
      this.$notify.closeAll();
      this.postRequest('/project/get?cid=' + this.$store.state.company.cid + '&pid=' + this.addAR[0].pid).then(async (resp) => {
        if (resp) {
          let data = ['项目编号:' + resp.result.id,
            '项目名称:' + resp.result.name,
            '项目描述:' + resp.result.description];
          const h = this.$createElement;
          await this.$notify({
            title: '项目信息',
            message: h('i', null, data
            )
          });

        }
      })


    },
    getProject() {
      this.postRequest('/project/getAll?cid=' + this.$store.state.company.cid).then(resp => {
        if (resp && resp.result.length && resp.result.length > 0) {
          this.project = resp.result;

          /* for (var i = 0; i < this.project.length; i++) {
             let temp = {
               label: this.project[i].name,
               value: this.project[i].id,
               key: this.project[i].description

             }
             this.options.push(temp);

           }*/
        }
      })
    },
    showAdd() {
      this.AR_add = true;
    },
    doAdd() {
      if (this.addAR[0].time && this.addAR[0].len) {

        this.addAR[0].time = this.addAR[0].time + ' 00:00:00'
        this.postRequest('/sign/sign?cid=' + this.$store.state.company.cid, this.addAR).then(resp => {
          console.log(resp);
          if (resp) {
            this.initARTable();

            this.addAR[0].len = '';
            this.addAR[0].time = '';
            this.AR_add = false;
          }
        })
      } else {
        this.$message.error('添加失败,请输入完整的考勤信息 !');
      }
    },
    initARTable() {
      this.postRequest('/sign/sign?cid=' + this.$store.state.company.cid, this.emp).then(resp => {
            if (resp) {
              if (resp.result.length && resp.result.length > 0){
                for (let i = 0; i < resp.result.length; i++) {
                  resp.result[i].time = resp.result[i].time.substring(0, 10);

                  if (resp.result[i].pid) {
                    for(let j=0;j<this.project.length;j++){
                      if(this.project[j].id===resp.result[i].pid){
                        let pro = this.project[j];
                        this.$set(resp.result[i], "pname", pro.name);
                        break;
                      }
                    }
                  }
                }
                this.ARData = resp.result;
              }
            }
          }
      )
    }
  }
}
</script>

<style scoped>
.tableClass {
  margin-top: 12px;
}

.updateAR {
  width: 200px;
}

.tag {
  text-align: center;
  width: 70px;
  margin-right: 10px;

  margin-top: 6px;
}

.inputInfo {
  margin: 3px 6px 3px 6px;
}

</style>
<template>

  <div class="border">
    <div>
      <el-button icon="el-icon-plus" type="primary" size="small" @click="showAdd"
                 v-if="this.$store.state.employee.type==='2'">添加雇员
      </el-button>
    </div>
    <div class="tableClass">
      <el-table
          max-height="350"
          size="small"
          border
          :data="fmtStaffData"

          stripe
          style="width: 100%"
          >
        <template slot="empty">
          <img class="loading"
               src="../../assets/src=http___img.zcool.cn_community_01eca95b5edad7a801215c8f2e2bcc.gif&refer=http___img.zcool.gif"
               style="width: 300px">

        </template>
        <!--        <el-table-column
                    fixed
                    type="selection"


                    width="40" v-if="this.$store.state.employee.type==='2'">
                </el-table-column>-->
        <el-table-column
            prop="id"
            label="员工id"
            width="90">
        </el-table-column>
        <el-table-column
            prop="uid"
            label="用户id"
            width="90">
        </el-table-column>
        <el-table-column
            prop="name"
            label="员工姓名"
            width="90">
        </el-table-column>
        <el-table-column
            prop="type"
            label="员工类型"
            width="90">
        </el-table-column>
        <el-table-column
            prop="location"
            label="居住地"
            width="90">
        </el-table-column>
        <el-table-column
            prop="socialCode"
            label="社保号"
            width="90">
        </el-table-column>
        <el-table-column
            prop="tax"
            label="税"
            width="90">
        </el-table-column>
        <el-table-column
            prop="otherTax"
            label="其他扣除额"
            width="90">
        </el-table-column>
        <el-table-column
            prop="salary"
            label="薪资(每月)"
            width="90">
        </el-table-column>
        <el-table-column
            prop="percent"
            label="佣金率"
            width="90">
        </el-table-column>
        <el-table-column
            prop="lenLimit"
            label="工时限制"
            width="90">
        </el-table-column>
        <el-table-column
            prop="cid"
            label="公司id"
            width="90">
        </el-table-column>
        <el-table-column
            prop="payType"
            label="支付方式"
            width="90">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150" v-if="this.$store.state.employee.type==='2'">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
        title="添加雇员"
        :visible.sync="staff_add"
        width="30%">
      <div>

        <el-tag class="tag">用户id</el-tag>
        <el-input
            size="small"
            class="updateOR"
            v-model="addStaff.uid">
        </el-input>
        <div></div>
        <el-tag class="tag">员工称呼</el-tag>
        <el-input v-model="addStaff.name" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">员工类型</el-tag>
        <el-select v-model="addStaff.type" size="small">
          <el-option label="小时工" value="0"></el-option>
          <el-option label="雇佣工" value="1"></el-option>
          <el-option label="管理员" value="2"></el-option>
        </el-select>
        <div></div>
        <el-tag class="tag">居住地</el-tag>
        <el-input
            size="small"
            class="updateOR"
            v-model="addStaff.location">
        </el-input>

        <div></div>
        <el-tag class="tag">社保号</el-tag>
        <el-input v-model="addStaff.socialCode" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">税</el-tag>
        <el-input v-model="addStaff.tax" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">其他扣除额</el-tag>
        <el-input v-model="addStaff.otherTax" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">薪资(每月)</el-tag>
        <el-input v-model="addStaff.salary" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">佣金率</el-tag>
        <el-select v-model="addStaff.percent" size="small">
          <el-option label="无佣金" value=0></el-option>
          <el-option label="0.1" value=0.1></el-option>
          <el-option label="0.15" value=0.15></el-option>
          <el-option label="0.25" value=0.25></el-option>
          <el-option label="0.35" value=0.35></el-option>
        </el-select>
        <div></div>
        <el-tag class="tag">工时限制</el-tag>
        <el-input v-model="addStaff.lenLimit" size="small" class="updateOR"></el-input>
        <div></div>
        <!--        <el-tag class="tag">公司id</el-tag>
                <el-input v-model="addStaff.cid" size="small" class="updateOR"></el-input>
                <div></div>-->
        <el-tag class="tag">支付方式</el-tag>
        <el-select v-model="addStaff.payType" size="small">
          <el-option label="直接付款" value="0"></el-option>
          <el-option label="邮寄支票" value="1"></el-option>
          <el-option label="银行卡收款" value="2"></el-option>
        </el-select>
        <div></div>


      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="OR_add = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doAdd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="编辑雇员"
        :visible.sync="staff_update"
        width="30%">
      <div>

        <el-tag class="tag">用户id</el-tag>
        <el-input v-model="updateStaff.uid" size="small" class="updateOR" disabled></el-input>
        <div></div>
        <el-tag class="tag">员工id</el-tag>
        <el-input v-model="updateStaff.id" size="small" class="updateOR" disabled></el-input>
        <div></div>
        <el-tag class="tag">公司id</el-tag>
        <el-input v-model="updateStaff.cid" size="small" class="updateOR" disabled></el-input>
        <div></div>
        <el-tag class="tag">员工称呼</el-tag>
        <el-input v-model="updateStaff.name" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">员工类型</el-tag>
        <el-select v-model="updateStaff.type" size="small">
          <el-option label="小时工" value="0"></el-option>
          <el-option label="雇佣工" value="1"></el-option>
          <el-option label="管理员" value="2"></el-option>
        </el-select>
        <div></div>
        <el-tag class="tag">居住地</el-tag>
        <el-input
            size="small"
            class="updateOR"
            v-model="updateStaff.location">

        </el-input>

        <div></div>
        <el-tag class="tag">社保号</el-tag>
        <el-input v-model="updateStaff.socialCode" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">税</el-tag>
        <el-input v-model="updateStaff.tax" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">其他扣除额</el-tag>
        <el-input v-model="updateStaff.otherTax" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">薪资(每月)</el-tag>
        <el-input v-model="updateStaff.salary" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">佣金率</el-tag>
        <el-select v-model="updateStaff.percent" size="small">
          <el-option label="无佣金" value=0></el-option>
          <el-option label="0.1" value=0.1></el-option>
          <el-option label="0.15" value=0.15></el-option>
          <el-option label="0.25" value=0.25></el-option>
          <el-option label="0.35" value=0.35></el-option>
        </el-select>
        <div></div>
        <el-tag class="tag">工时限制</el-tag>
        <el-input v-model="updateStaff.lenLimit" size="small" class="updateOR"></el-input>
        <div></div>

        <el-tag class="tag">支付方式</el-tag>
        <el-select v-model="updateStaff.payType" size="small">
          <el-option label="直接付款" value="0"></el-option>
          <el-option label="邮寄支票" value="1"></el-option>
          <el-option label="银行卡收款" value="2"></el-option>
        </el-select>
        <div></div>


      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="OR_update = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
      </span>
    </el-dialog>



  </div>
</template>

<script>
export default {
  name: "Admin_Staffonfo",
  data() {
    return {
      clickRow: false,
      row: '',
      staff_add: false,
      staff_update: false,
      multipleSelection: [],
      staffData: [],
      fmtStaffData: [],
      addStaff: {
        cid: this.$store.state.company.cid,
        lenLimit: '',
        location: "",
        otherTax: '',
        payType: "",
        percent: '',
        salary: '',
        socialCode: "",
        tax: '',
        type: "",
        uid: '',
        name: ''
      },
      updateStaff: {
        cid: this.$store.state.company.cid,
        lenLimit: '',
        location: "",
        otherTax: '',
        payType: "",
        percent: '',
        salary: '',
        socialCode: "",
        tax: '',
        type: "",
        uid: '',
        name: ''
      },
      user: []
    }


  },
  methods: {

    showAdd() {
      this.staff_add = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleEdit(index, data) {
      console.log(data)
      if(data.type==='管理员'){
        this.$message.error(
          '不能操作管理员'
        );

      }else{
        Object.assign(this.updateStaff, data);
        this.staff_update = true;
      }

    },
    handleDelete(index, data) {
      if(data.type==='管理员'){
        this.$message.error(
            '不能操作管理员'
      );
      }else{

        this.$confirm('此操作将永久删除该雇员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest('/employee/delete?cid=' + data.cid + '&uid=' + data.uid).then(resp => {
            if (resp) {
              this.initStaffTable();
            }
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    },
    deleteMany() {

    },
    doAdd() {
      this.addStaff.cid = this.$store.state.company.cid;
      if (this.addStaff.uid &&
          this.addStaff.cid &&
          this.addStaff.payType !== null &&
          this.addStaff.tax &&
          this.addStaff.salary &&
          this.addStaff.percent &&
          this.addStaff.lenLimit &&
          this.addStaff.otherTax &&
          this.addStaff.location &&
          this.addStaff.type !== null &&
          this.addStaff.socialCode) {
        this.postRequest('/employee/create?cid=' + this.$store.state.company.cid, this.addStaff).then(async resp => {
          if (resp) {
            this.addStaff.uid = '';
            //this.addStaff.cid ='';
            this.addStaff.payType = '';
            this.addStaff.tax = '';
            this.addStaff.salary = '';
            this.addStaff.percent = '';
            this.addStaff.lenLimit = '';
            this.addStaff.otherTax = '';
            this.addStaff.location = '';
            this.addStaff.type = '';
            this.addStaff.socialCode = '';

            await this.initStaffTable();
            this.staff_add = false;

          }
        })

      } else {
        this.$message.error('添加失败,请输入完整的雇员信息 !');

      }

    },
    doUpdate() {
      this.postRequest('/employee/updateOther?cid=' + this.$store.state.company.cid + '&uid=' + this.updateStaff.uid, this.updateStaff).then(resp => {
        if (resp) {
          this.initStaffTable();
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.staff_update = false;

        }
      })


    },
    initStaffTable() {
      this.postRequest('/employee/getAll?cid=' + this.$store.state.company.cid).then(resp => {

        if (resp && resp.result.length && resp.result.length > 0) {
          this.staffData = resp.result;

          for (var i = 0; i < resp.result.length; i++) {


            if (resp.result[i].type === "0") {

              resp.result[i].type = "小时工"
            } else if (resp.result[i].type === "1") {

              resp.result[i].type = "雇佣工"
            } else if (resp.result[i].type === "2") {

              resp.result[i].type = "管理员"
            }


            if (resp.result[i].payType === "0") {
              resp.result[i].payType = "直接支付"

            } else if (resp.result[i].payType === "1") {
              resp.result[i].payType = "邮寄支票"
            } else if (resp.result[i].payType === "2") {
              resp.result[i].payType = "银行卡收款"
            }
          }
          this.fmtStaffData = resp.result;


        }
      })

    }
  },

  mounted() {
    this.initStaffTable();
  }
}
</script>

<style scoped>
.border {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 10px 10px 10px;
  width: auto;
  height: 450px;
}

.tableClass {
  margin-top: 12px;
}

.updateOR {
  width: 200px;
}

.tag {
  text-align: center;
  width: 70px;
  margin-right: 10px;

  margin-top: 6px;
}

.loading {
  width: 300px;
  position: absolute
}

</style>
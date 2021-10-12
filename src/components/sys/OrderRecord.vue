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
          :data="ORData"
          @selection-change="handleSelectionChange"
          stripe
          style="width: 100%">
        <template slot="empty">
          <img class="loading" src="../../assets/src=http___img.zcool.cn_community_01eca95b5edad7a801215c8f2e2bcc.gif&refer=http___img.zcool.gif"  alt="">
        </template>
<!--        <el-table-column
            fixed
            type="selection"
            width="40">
        </el-table-column>-->
        <el-table-column
            fixed
            prop="startTime"
            label="开始日期"
            width="120">
        </el-table-column>
        <el-table-column
            fixed
            prop="endTime"
            label="截止日期"
            width="120">
        </el-table-column>
        <el-table-column
            v-if="false"
            prop="id"
            label="订单编号"
            >
        </el-table-column>
        <el-table-column
            prop="guestName"
            label="客户姓名"
            width="120">
        </el-table-column>
        <el-table-column
            prop="guestPhone"
            label="联络方式"
            width="120">
        </el-table-column>
        <el-table-column
            prop="guestLocation"
            label="账单地址"
            width="200">
        </el-table-column>

        <el-table-column
            v-if="false"
            prop="goodId"
            label="产品编号"
            >
        </el-table-column>
        <el-table-column

            prop="gname"
            label="产品"
            width="120">
        </el-table-column>

        <el-table-column
            prop="price"
            label="金额"
            width="120">
        </el-table-column>

        <el-table-column label="操作" fixed="right" >
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
<!--            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>-->
          </template>
        </el-table-column>
      </el-table>

    </div>
<!--    <el-button type="danger" style="text-align: center;margin-top: 10px" size="small"
               :disabled="this.multipleSelection.length===0" @click="deleteMany">批量删除
    </el-button>-->
    <el-dialog
        title="编辑记录"
        :visible.sync="OR_update"
        width="30%">
      <div>
        <el-tag class="tag">订单编号</el-tag>
        <el-input v-model="updateOR.id" size="small" class="updateOR" :disabled="true"></el-input>
        <div></div>

        <div class="block" style="margin-bottom: 5px">

          <el-date-picker

              class="updateOR"
              v-model="updateOR.startTime"
              type="date"
              placeholder="选择开始日期"
              value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <div class="block">

          <el-date-picker

              class="updateOR"
              v-model="updateOR.endTime"
              type="date"
              placeholder="选择截止日期"
              value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div></div>
        <el-tag class="tag">顾客姓名</el-tag>
        <el-input v-model="updateOR.guestName" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">联络方式</el-tag>
        <el-input v-model="updateOR.guestPhone" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">订单地址</el-tag>
        <el-input v-model="updateOR.guestLocation" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">产品</el-tag>

        <el-select v-model="updateOR.goodId" placeholder="请选择商品" class="inputInfo" style="margin-right: 100px " filterable
                   size="small"  @change="showGoods2">
          <el-option
              v-for="item in goods"
              :key="item.id"
              :label="item.name"
              :value="item.id"
             >

            <span style="float: left; color: #8492a6; font-size: 13px" >{{ item.name }}</span>
          </el-option>
        </el-select>
        <div></div>
        <div></div>
        <el-tag class="tag">金额</el-tag>
        <el-input v-model="updateOR.price" size="small" class="updateOR"></el-input>
        <div></div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="OR_update = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="添加记录"
        :visible.sync="OR_add"
        width="30%">
      <div>


        <div class="block">

          <el-date-picker

              class="updateOR"
              v-model="addOR.startTime"
              type="date"
              placeholder="选择开始日期"
              value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div class="block">

          <el-date-picker

              class="updateOR"
              v-model="addOR.endTime"
              type="date"
              placeholder="选择截止日期"
              value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div></div>
        <el-tag class="tag">顾客姓名</el-tag>
        <el-input v-model="addOR.guestName" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">联络方式</el-tag>
        <el-input v-model="addOR.guestPhone" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">订单地址</el-tag>
        <el-input v-model="addOR.guestLocation" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">产品编号</el-tag>



        <el-select v-model="addOR.goodId" @change="showGoods" placeholder="请选择商品编号" class="inputInfo" style="margin-right: 100px"  filterable
                   size="small"
                   >
          <el-option
              v-for="item in goods"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              >

            <span style="float: left; color: #8492a6; font-size: 13px" >{{ item.name }}</span>
          </el-option>
        </el-select>
        <div></div>


        <el-tag class="tag">金额</el-tag>
        <el-input v-model="addOR.price" size="small" class="updateOR"></el-input>
        <div></div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="OR_add = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: "OrderRecord",
  data() {

    return {
      OR_update: false,
      OR_add: false,

      updateOR: {
        cid: this.$store.state.company.cid,
        employeeId: this.$store.state.employee.id,
        endTime: "",
        goodId: 0,
        guestLocation: "",
        guestName: "",
        guestPhone: "",
        id: 0,
        price: 0,
        startTime: ""

      },
      addOR: {
        cid: this.$store.state.company.cid,
        employeeId: this.$store.state.employee.id,
        endTime: "",
        goodId: '',
        guestLocation: "",
        guestName: "",
        guestPhone: "",
        //id: 0,
        price: '',
        startTime: ""

      },
      ORData: [],
      multipleSelection: [],
      goods: [],



    }
  },
  mounted() {
    this.getGoods();
    this.initORTable();



  },
  methods: {
    showGoods() {
      this.$notify.closeAll();

      this.postRequest('/goods/get?cid=' + this.$store.state.company.cid+'&goodsId='+this.addOR.goodId).then(async (resp)=>{
        if(resp){
         /* const loading =await this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
          });*/


          let data=['商品编号:' + resp.result.id ,
            '商品名称:' + resp.result.name ,
            '商品描述:' + resp.result.description];
          const h = this.$createElement;
          await this.$notify({
            title: '商品信息',
            message: h('i', null,data

            )
          });
          /*loading.close();*/

        }
      })


    },
    showGoods2() {
      this.$notify.closeAll();

      this.postRequest('/goods/get?cid=' + this.$store.state.company.cid+'&goodsId='+this.updateOR.goodId).then(async (resp)=>{
        if(resp){

          let data=['商品编号:' + resp.result.id ,
            '商品名称:' + resp.result.name ,
            '商品描述:' + resp.result.description];
          const h = this.$createElement;
          await this.$notify({
            title: '商品信息',
            message: h('i', null,data )
          });

        }
      })


    },
    getGoods() {
      this.postRequest('/goods/getAll?cid=' + this.$store.state.company.cid).then(resp => {
            if (resp && resp.result.length && resp.result.length > 0) {

              this.goods = resp.result;




            }
          }
      )

    },
    doUpdate() {

      this.updateOR.startTime+=' 00:00:00';
      this.updateOR.endTime+=' 00:00:00';
      this.postRequest('/order/update?cid=' + this.$store.state.company.cid, this.updateOR).then(resp => {
        if (resp) {
          this.initORTable();
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.OR_update = false;
        }
      })

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

    },
    showAdd() {
      this.OR_add = true;
    },
    doAdd() {
      if (this.addOR.guestLocation && this.addOR.employeeId && this.addOR.cid && this.addOR.endTime && this.addOR.startTime && this.addOR.goodId && this.addOR.guestName && this.addOR.guestPhone && this.addOR.price) {
        this.addOR.startTime+=' 00:00:00';
        this.addOR.endTime+=' 00:00:00';

        this.addOR.cid = this.$store.state.company.cid;
        this.addOR.employeeId = this.$store.state.employee.id;
        this.postRequest('/order/create?cid=' + this.$store.state.company.cid, this.addOR).then(resp => {
          if (resp) {
            //this.addOR.cid = '';
            this.addOR.endTime = '';
            //this.addOR.employeeId = '';
            this.addOR.goodId = '';
            this.addOR.guestLocation = "";
            this.addOR.guestName = "";
            this.addOR.guestPhone = "";
            //id: 0,
            this.addOR.price = '';
            this.addOR.startTime = "";
            this.initORTable();
            this.OR_add = false;
          }
        })
      } else {
        this.$message.error('添加失败,请输入完整的订单记录信息 !');

      }

    },
    handleEdit(index, data) {
      Object.assign(this.updateOR, data);
      this.OR_update = true;
    },
    /*handleDelete(index, data) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postRequest('/删除订单记录的接口' + data.id).then(resp => {
          if (resp) {
            this.initORTable();
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
    },*/
    initORTable() {
      this.postRequest('/order/getEmployee?cid=' + this.$store.state.company.cid).then(resp=> {
        if (resp) {
          if (resp.result.length && resp.result.length > 0) {
            for (let i = 0; i < resp.result.length; i++) {
              resp.result[i].startTime = resp.result[i].startTime.substring(0, 10);
              resp.result[i].endTime = resp.result[i].endTime.substring(0, 10);
              if (resp.result[i].goodId) {
                for(let j=0;j<this.goods.length;j++){
                  if(this.goods[j].id===resp.result[i].goodId){

                    let pro = this.goods[j];
                    this.$set(resp.result[i], "gname", pro.name);
                    break;
                  }
                }

              }
            }
            this.ORData = resp.result;

          }
        }
      })
    }
  }
}
</script>

<style scoped>
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

.inputInfo {
  margin: 3px 6px 3px 6px;
}

</style>
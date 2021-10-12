<template>
  <div class="border">
    <div>
      <el-button icon="el-icon-plus" type="primary" size="small" @click="showAdd"
                 v-if="this.$store.state.employee.type==='2'">添加商品
      </el-button>
    </div>
    <div class="tableClass">
      <el-table
          max-height="350"
          size="small"
          border
          :data="goodData"
          @selection-change="handleSelectionChange"
          stripe
          style="width: 100%">
        <template slot="empty">
          <img class="loading" src="../../assets/src=http___img.zcool.cn_community_01eca95b5edad7a801215c8f2e2bcc.gif&refer=http___img.zcool.gif" style="width: 300px">

        </template>
        <el-table-column
            fixed
            type="selection"
            width="40" v-if="this.$store.state.employee.type==='2'">
        </el-table-column>
        <el-table-column
            fixed
            prop="name"
            label="商品名称"
            width="120">
        </el-table-column>
        <el-table-column


            prop="id"
            label="商品编号"
            width="200">
        </el-table-column>
        <el-table-column


            prop="cid"
            label="公司编号"
            width="200">
        </el-table-column>

        <el-table-column

            prop="price"
            label="商品价格"
            width="120">
        </el-table-column>
        <el-table-column
            prop="description"
            label="商品描述"
            width="200">
        </el-table-column>
        <el-table-column
            fixed="right"
            prop="buy"
            label="出售数量"
            width="90">
        </el-table-column>
        <el-table-column
            fixed="right"
            prop="last"
            label="剩余数量"
            width="90">
        </el-table-column>


        <el-table-column label="操作" fixed="right"  v-if="this.$store.state.employee.type==='2'" >
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
    <el-button type="danger" style="text-align: center;margin-top: 10px" size="small"
               :disabled="this.multipleSelection.length===0" @click="deleteMany">批量删除
    </el-button>

    <el-dialog
        title="添加商品"
        :visible.sync="good_add"
        width="30%">
      <div>

        <el-tag class="tag">商品名称</el-tag>
        <el-input v-model="addGood.name" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">商品价格</el-tag>
        <el-input v-model="addGood.price" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">商品描述</el-tag>
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            size="small"
            v-model="addGood.description">
        </el-input>

        <div></div>
        <el-tag class="tag">出售数量</el-tag>
        <el-input v-model="addGood.buy" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">剩余数量</el-tag>
        <el-input v-model="addGood.last" size="small" class="updateOR"></el-input>
        <div></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="OR_add = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doAdd">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="编辑商品"
        :visible.sync="good_update"
        width="30%">
      <div>
        <el-tag class="tag">商品编号</el-tag>
        <el-input v-model="updateGood.id" size="small" class="updateOR" :disabled="true"></el-input>
        <div></div>
        <el-tag class="tag">公司编号</el-tag>
        <el-input v-model="updateGood.cid" size="small" class="updateOR"></el-input>
        <div></div>

        <el-tag class="tag">商品名称</el-tag>
        <el-input v-model="updateGood.name" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">商品价格</el-tag>
        <el-input v-model="updateGood.price" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">商品描述</el-tag>
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            size="small"
            v-model="updateGood.description">
        </el-input>

        <div></div>
        <el-tag class="tag">出售数量</el-tag>
        <el-input v-model="updateGood.buy" size="small" class="updateOR"></el-input>
        <div></div>
        <el-tag class="tag">剩余数量</el-tag>
        <el-input v-model="updateGood.last" size="small" class="updateOR"></el-input>
        <div></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="good_update = false">取 消</el-button>
        <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: "GoodInfo",
  data() {
    return {
      good_add: false,
      good_update: false,
      multipleSelection: [],
      goodData: [],
      addGood: {
        buy: '',
        cid: this.$store.state.company.cid,
        description: "",
        //"id: 0,
        last: '',
        name: "",
        price: ''
      },
      updateGood: {
        buy: '',
        cid: this.$store.state.company.cid,
        description: "",
        id: '',
        last: '',
        name: "",
        price: ''
      }
    }


  },
  methods: {
    initGoodTable() {
      this.postRequest('/goods/getAll?cid=' + this.$store.state.company.cid).then(resp => {
        if (resp&&resp.result.length&&resp.result.length>0) {
          this.goodData = resp.result;
        }
      })

    },
    handleEdit(index, data) {
      Object.assign(this.updateGood, data);
      this.good_update = true;

    },
    handleDelete(index, data) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postRequest('/goods/delete?cid='+data.cid+'&goodsId=' + data.id).then(resp => {
          if (resp) {
            this.initGoodTable();
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

    },
    showAdd() {
      this.good_add = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;

    },
    deleteMany() {
      this.$confirm('此操作将永久删除所选记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.multipleSelection.forEach(item => {
          this.postRequest('/goods/delete?cid='+item.cid+'&goodsId=' + item.id).then(resp => {
            if (resp) {
              this.initGoodTable();
            }
          })

        });

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

    },
    doAdd() {
      this.addGood.cid=this.$store.state.company.cid;
      if (this.addGood.buy &&
          this.addGood.price &&
          this.addGood.name &&
          this.addGood.cid &&
          this.addGood.last &&
          this.addGood.description) {
        this.postRequest('/goods/create?cid=' + this.$store.state.company.cid, this.addGood).then(async resp => {
          if (resp) {
            this.addGood.buy = '';
            this.addGood.price = '';
            this.addGood.name = '';
            //this.addGood.cid = '';
            this.addGood.last = '';
            this.addGood.description = '';

            await this.initGoodTable();
            this.good_add = false;

          }
        })

      } else {
        this.$message.error('添加失败,请输入完整的商品信息 !');

      }

    },
    doUpdate() {
      this.postRequest('/goods/update?cid=' + this.$store.state.company.cid, this.updateGood).then(resp => {
        if (resp) {
          this.initGoodTable();
          this.good_update = false;
        }
      })

    }

  },
  mounted() {
    this.initGoodTable();
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
.tag{
  text-align: center;
  width:70px;
  margin-right: 10px;

  margin-top:6px;
}



</style>
<template>
  <div class="border">
    <div>
      <el-button icon="el-icon-plus" type="primary" size="small" @click="showAdd"
                 v-if="this.$store.state.employee.type==='2'">添加项目
      </el-button>
    </div>
    <div class="tableClass">
      <el-table
          max-height="350"
          size="small"
          border
          :data="projectData"
          stripe
          style="width: 100%">
        <template slot="empty">
          <img src="../../assets/src=http___img.zcool.cn_community_01eca95b5edad7a801215c8f2e2bcc.gif&refer=http___img.zcool.gif" class="loading" style="width: 300px">

        </template>
        <el-table-column
            prop="id"
            label="项目编号"
            width="90">
        </el-table-column>
        <el-table-column
            prop="cid"
            label="公司编号"
            width="90">
        </el-table-column>
        <el-table-column
            fixed
            prop="name"
            label="项目名称"
            width="90">
        </el-table-column>
        <el-table-column
            prop="description"
            label="项目描述"
            width="90">
        </el-table-column>

      </el-table>

    </div>


    <el-dialog
        title="添加商品"
        :visible.sync="project_add"
        width="30%">
      <div>

        <el-tag class="tag">项目名称</el-tag>
        <el-input v-model="addProject.name" size="small" class="updateOR"></el-input>
        <div></div>

        <el-tag class="tag">项目描述</el-tag>
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            size="small"
            v-model="addProject.description">
        </el-input>


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
  name: "ProjectInfo",
  data() {
    return {
      project_add: false,


      projectData: [],
      addProject: {
        name: '',
        cid: this.$store.state.company.cid,
        description: "",
        //"id: 0,

      },

    }


  },
  methods: {
    initProjectTable() {

      this.postRequest('/project/getAll?cid=' + this.$store.state.company.cid).then(resp => {

        if (resp&&resp.result.length&&resp.result.length>0) {
          this.projectData = resp.result;
        }
      })

    },

    showAdd() {
      this.project_add = true;
    },

    doAdd() {
      this.addProject.cid=this.$store.state.company.cid;
      if (
          this.addProject.name &&
          this.addProject.cid &&
          this.addProject.description) {
        this.postRequest('/project/create?cid=' + this.$store.state.company.cid+'&description='+this.addProject.description+'&name='+this.addProject.name).then(resp => {
          if (resp) {

            this.addProject.name = '';
            //this.addProject.cid = '';

            this.addProject.description = '';

            this.initProjectTable();
            this.project_add=false;

          }
        })

      } else {
        this.$message.error('添加失败,请输入完整的商品信息 !');

      }

    },


  },
  mounted() {
    this.initProjectTable();
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

</style>
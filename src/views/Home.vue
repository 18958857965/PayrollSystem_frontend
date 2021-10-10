<!--普通用户主页  -->
<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">Header</div>
        <el-dropdown class="userInfo" @command="commandHandler">
                    <span class="el-dropdown-link">
                        <div class="">
                           尊敬的{{ this.$store.state.user.name }},您好

                        </div>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo"
            >个人中心
            </el-dropdown-item
            >
            <el-dropdown-item command="setting" v-if="this.$store.state.employee&&this.$store.state.employee.type==='2'"
            >申请消息
            </el-dropdown-item
            >
            <el-dropdown-item command="logout"
            >退出系统
            </el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px" v-if="this.$store.state.employee">
          <el-menu @select="menuClick" :default-openeds="['1']" unique-opened>
            <el-submenu index="1">
              <template slot="title"
              ><i class="el-icon-location"></i
              >员工操作菜单
              </template
              >
              <!-- 判断用户类型--->
              <el-menu-item v-if="this.$store.state.employee&&this.$store.state.employee.type==='0'" index="/ho_record">
                工作记录
              </el-menu-item>

              <el-menu-item v-if="this.$store.state.employee&&(this.$store.state.employee.type==='1'||this.$store.state.employee.type==='2')" index="/sa_record">
                工作记录
              </el-menu-item>
              <el-menu-item index="/em_report">员工报告</el-menu-item>
<!--              <el-menu-item index="/em_paymethod">付款方式</el-menu-item>-->

            </el-submenu>
            <el-submenu index="2" v-if="this.$store.state.employee&&this.$store.state.employee.type==='2'">
              <template slot="title"
              ><i class="el-icon-location"></i
              >管理员菜单
              </template
              >
              <el-menu-item index="/admin_staffinfo">员工信息</el-menu-item>
              <el-menu-item index="/admin_management">报告管理</el-menu-item>
              <el-menu-item index="/goodinfo">商品管理</el-menu-item>
              <el-menu-item index="/projectinfo">项目管理</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>

          </el-breadcrumb>
          <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
            <h3 style="text-align:center">广告出租 ! ! !</h3>
            <h4 style="text-align:center">广告出租 ! ! !</h4>
            <h5 style="text-align:center">广告出租 ! ! !</h5>
            <h6 style="text-align:center">广告出租 ! ! !</h6>

          </div>

          <router-view class="homeRouterView"/>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="个人空间"
               :visible.sync="selfSpace"
               width="50%"
               height="70%"
    class="selfSpaceDialog">

      <SelfSpace></SelfSpace>
<!--      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="selfSpace = false">取 消</el-button>
        <el-button size="small" type="primary" @click="selfSpace = false">确 定</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>


<script>
import SelfSpace from "../components/sys/SelfSpace";

export default {
  name: "Home",
  components: {SelfSpace},
  methods: {
    menuClick(index) {
      this.$router.push(index);
    },
    commandHandler(command) {
      if (command == "logout") {
        this.$confirm("此操作将注销登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
            .then(() => {
              this.postRequest('/logout');
              //清除用户信息
             // window.sessionStorage.removeItem('isLogin');
              this.$store.commit('initUser','');
              this.$store.commit('initEmployee','');
              this.$store.commit('initCompany','');
              this.$store.commit('initIsLogin','');
              if (window.sessionStorage.getItem('state')) {
                window.sessionStorage.removeItem('state');

              }


              this.$message({
                message: "成功退出登录 !",
                type: "success",
              });
              this.$router.replace("/");
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消操作",
              });
            });
      } else if (command == "userinfo") {
        this.selfSpace = true;

      }
    },



  },
  data() {
    return {
      selfSpace: false,
      user: JSON.parse(window.sessionStorage.getItem('user')),
      company: '',
      employee: '',

    };
  },
   mounted() {
    //this.user=JSON.parse(window.sessionStorage.getItem('user'));

    /*this.getCompany();
    if (this.company) {
      this.getEmployee();
      this.storeCid();
      this.storeUserType()
    }*/


  },
  computed: {
    routes() {
      //return this.$store.state.routes;
    },
  },
};
</script>


<style scoped>
.selfSpaceDialog{

}
.homeHeader {
  background: rgb(163, 247, 235);
  display: flex;
  align-items: center;
  align-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}

.homeHeader .userInfo {
  cursor: pointer;
}

.homeWelcome {
  text-align: center;
  font-size: 40px;
  font-family: 华文楷体;
  color: #409eff;
  padding-top: 50px;
}

.homeRouterView {
  margin-top: 10px;
}

</style>
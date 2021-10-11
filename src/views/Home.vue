<!--普通用户主页  -->
<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">工资单管理系统</div>
        <el-dropdown class="userInfo" @command="commandHandler" style=" float: right;margin-left: 1170px">
                    <span class="el-dropdown-link">
                        <div>
                               尊敬的   [{{ this.$store.state.user.name }}]  ,您好

                        </div>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">
              个人中心
            </el-dropdown-item>


            <el-dropdown-item command="logout">
              退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px" v-if="this.$store.state.employee">
          <el-menu @select="menuClick">
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

              <el-menu-item
                  v-if="this.$store.state.employee&&(this.$store.state.employee.type==='1'||this.$store.state.employee.type==='2')"
                  index="/sa_record">
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
              <el-menu-item index="/admin_management">管理报告</el-menu-item>
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
          <div v-if="this.$router.currentRoute.path=='/home'">
            <div style="float: left">
              <div class="left-wrap">
                <div class="calendar-wrap">
                  <el-calendar :first-day-of-week=7 style="width: 900px">
                    <!--                <template
                                        slot="dateCell"
                                        slot-scope="{date, data}">
                                      <p>
                                        {{ data.day.split('-').slice(2).join('-') }}<br />
                                      </p>
                                      &lt;!&ndash;标记&ndash;&gt;
                                      <div v-if="data.day=='2020-08-23'||data.day=='2020-08-19'" class="red budge"></div>
                                      <div v-if="data.day=='2020-08-09'||data.day=='2020-08-13'" class="green budge"></div>
                                      <div v-if="data.day=='2020-08-12'||data.day=='2020-08-22'" class="orange budge"></div>
                                    </template>-->
                  </el-calendar>
                </div>
              </div>
            </div>

            <div style="float: right;width: 300px;margin-top: 50px">
              <el-input
                  placeholder="欢迎使用Payroll System !"
                  v-model="emp">

              </el-input>
              <div style="margin-top: 70px">
                <span>备忘录</span>
                <el-divider></el-divider>
                <el-input
                    style="height: 200px"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    placeholder="请输入内容"
                    v-model="note">
                </el-input>
              </div>

            </div>
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
              this.$store.commit('initUser', '');
              this.$store.commit('initEmployee', '');
              this.$store.commit('initCompany', '');
              this.$store.commit('initIsLogin', '');
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
      emp: '',
      curDate: '',
      note: '',
      selfSpace: false,
      user: JSON.parse(window.sessionStorage.getItem('user')),
      company: '',
      employee: '',

    };
  },
  mounted() {
    if (window.localStorage.getItem('note')) {
      this.note = window.localStorage.getItem('note')


    } else {
      window.localStorage.setItem('note', this.note)
    }


  },
  computed: {
    routes() {
      //return this.$store.state.routes;
    },
  },
};
</script>


<style scoped>
.selfSpaceDialog {

}

.homeHeader {
  background: rgb(163, 247, 235);
  display: flex;
  align-items: center;
  align-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}

.homeHeader.userInfo {
  cursor: pointer;
}

/*.homeWelcome {
  text-align: center;
  font-size: 40px;
  font-family: 华文楷体;
  color: #409eff;
  padding-top: 50px;
}*/

.homeRouterView {
  margin-top: 10px;
}


.left-wrap /deep/ .el-calendar-table .el-calendar-day {
  padding: 22px;
  text-align: center;
  height: 80px;
}

.left-wrap /deep/ .el-backtop, .el-calendar-table td.is-today p {
  height: 30px;
  width: 30px;
  color: white;
  border-radius: 15px;
  line-height: 30px;
  margin: 0 auto;
  margin-top: -6px;
  background-image: linear-gradient(to right, #2160dc, #4880f0);
}


</style>
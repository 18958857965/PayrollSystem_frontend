<!-- 用户登录界面 -->
<template>
  <div>
    <el-tabs :tab-position="tabPosition"  v-model="activeName">
    <el-tab-pane label="手机登录" name="phone"><div>
      <el-form
          :rules="rules2"
          ref="loginFormPhone"
          :model="loginFormPhone"
          class="loginContainer2"
      >
        <h3 class="loginTitle">手机登录</h3>
        <el-form-item label="手机号" prop="phone">
          <el-input
              type="text"
              auto-complete="false"
              v-model="loginFormPhone.phone"
              placeholder="please input PhoneNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input

              auto-complete="false"
              v-model="loginFormPhone.code"
              placeholder="please input Code"

          ></el-input>

        </el-form-item>

        <el-form-item>
          <el-button type="info" @click="getCode">获取验证码</el-button>
          <el-button type="primary" plain @click="submitLoginPhone"
          >用户登录
          </el-button
          >
          <el-button type="success" plain @click="goToRegister"
          >用户注册
          </el-button
          >
        </el-form-item>
      </el-form>


    </div></el-tab-pane>
    <el-tab-pane label="账号登录" name="pwd"><div>
      <el-form
          :rules="rules"
          ref="loginForm"
          :model="loginForm"
          class="loginContainer"
      >
        <h3 class="loginTitle">账号登录</h3>
        <el-form-item label="用户账号" prop="uid">
          <el-input
              type="text"
              auto-complete="false"
              v-model="loginForm.uid"
              placeholder="please input username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="pwd">
          <el-input
              show-password
              auto-complete="false"
              v-model="loginForm.pwd"
              placeholder="please input password"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" plain @click="submitLogin"
          >用户登录
          </el-button
          >
          <el-button type="success" plain @click="goToRegister"
          >用户注册
          </el-button
          >
        </el-form-item>
      </el-form>


    </div></el-tab-pane>

    </el-tabs>
    <el-dialog title="用户注册"
               :visible.sync="isRegister"
               width="30%">

      <Register></Register>

    </el-dialog>


  </div>
</template>

<script>


import Register from "../components/sys/Register";

export default {

  name: "Login",
  components: {Register},
  data() {
    return {
      tabPosition: 'left',//'top',
      activeName: 'pwd',


      isRegister: false,
      loginForm: {
        uid: "",
        pwd: "",
        //usertype: "",
      },
      loginFormPhone: {
        phone: "",
        code: '',
        //usertype: "",
      },
      rules: {
        uid: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        pwd: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],

      },
      rules2: {
        phone: [
          {
            required: true,
            message: "电话不能为空",
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur",
          },
        ],

      },
    };
  },
  methods: {
    getCode(){
      if(this.loginFormPhone.phone){
        this.postRequest("/login", this.loginFormPhone).then(resp=>{
          if(resp.result===true){
            this.$message('验证码已发送')
          }
        })
      }
    },
    submitLoginPhone(){
      if(this.loginFormPhone.phone&&this.loginFormPhone.code!==0){
        this.postRequest("/login", this.loginFormPhone).then(async (resp) => {
          if (resp) {

            if (resp.result === true) {
              this.$store.commit('initIsLogin', '1');
              //window.sessionStorage.setItem('isLogin',1);

            }
            if (!this.$store.state.user && !this.$store.state.company) {
              await Promise.all([this.postRequest('/user/getInfo').then(respa => {
                if (respa) {

                  let data = respa.result;
                  this.$store.commit('initUser', data);
                }
              }),
                this.postRequest('/employee/getCompany').then(respb => {
                  if (respb) {

                    if (respb.result.length && respb.result.length > 0) {
                      let data = respb.result[0];
                      this.$store.commit('initCompany', data);
                      let cid = this.$store.state.company.cid;
                      this.postRequest('/employee/get?cid=' + cid).then(respc => {
                        if (respc) {
                          let datae = respc.result;
                          this.$store.commit('initEmployee', datae);
                        }
                      })
                    }
                  }
                })]);
            }
            let path = this.$route.query.redirect;
            if (!(path === "/" || path === undefined))
              this.$router.replace(path);
            else {
              /*if (!window.sessionStorage.getItem('employee')) {
                this.$router.replace("/userhome");
              } else {*/
              this.$router.replace("/home");
            }
          }

        }).catch((err) => {
          console.log(err)
        });
      }
      else {

        this.$message.error(
            "Login Failed ! Please fill the Phone number up !"
        );

      }


    },
    goToRegister() {
      this.isRegister = true
    },
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {


          this.postRequest("/login", this.loginForm).then(async (resp) => {
            if (resp) {

              if (resp.result === true) {

                this.$store.commit('initIsLogin', '1');
                //window.sessionStorage.setItem('isLogin',1);

              }
              if (!this.$store.state.user && !this.$store.state.company) {
                await Promise.all([this.postRequest('/user/getInfo').then(respa => {
                  if (respa) {

                    let data = respa.result;
                    this.$store.commit('initUser', data);
                  }
                }),
                  this.postRequest('/employee/getCompany').then(respb => {
                    if (respb) {

                      if (respb.result.length && respb.result.length > 0) {
                        let data = respb.result[0];
                        this.$store.commit('initCompany', data);


                        let cid = this.$store.state.company.cid;

                        this.postRequest('/employee/get?cid=' + cid).then(respc => {
                          if (respc) {
                            let datae = respc.result;
                            this.$store.commit('initEmployee', datae);


                          }
                        })

                      }
                    }
                  })]);
              }
              let path = this.$route.query.redirect;
              if (!(path === "/" || path === undefined))
                this.$router.replace(path);
              else {
                /*if (!window.sessionStorage.getItem('employee')) {
                  this.$router.replace("/userhome");
                } else {*/
                this.$router.replace("/home");
              }
            }

          }).catch((err) => {
            console.log(err)
          });

        } else {
          this.$message.error(
              "Login Failed ! Please fill the information up !"
          );
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 140px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #aee7eb;
}

.loginContainer2 {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 140px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #ebaed3;
}

.loginTitle {
  margin: 10px auto 10px auto;
  text-align: center;
  font-size: 25px;
}

.radioclass {

  margin: 0px auto 0px auto;

}
</style>
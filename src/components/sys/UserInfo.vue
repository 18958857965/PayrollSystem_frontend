<template>
  <div>
    <el-form :rules="rules"
             ref="userForm"
             :model="userForm"
    >
      <el-form-item label="用户编号" size="small">
        <el-input v-model="userForm.id" size="small" disabled></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="uid" size="small">
        <el-input v-model="userForm.uid" size="small" ></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone" size="small">
        <el-input v-model="userForm.phone" size="small" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="name" size="small">
        <el-input v-model="userForm.name" size="small" ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" size="small">
        <el-select v-model="userForm.sex" size="small">
          <el-option label="男" :value="true"></el-option>
          <el-option label="女" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="真实姓名" prop="trueName" size="small">
        <el-input v-model="userForm.trueName" size="small"></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="bornTime" size="small">

        <div class="block">

          <el-date-picker
              v-model="userForm.bornTime"
              type="date"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd"


          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="居住地" prop="location" size="small">
        <el-input v-model="userForm.location" size="small"></el-input>
      </el-form-item>
      <el-form-item label="注册时间" prop="registerTime" size="small">

        <div class="block">

          <el-date-picker
              :disabled="true"
              v-model="this.userForm.registerTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="个人签名" size="small">
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            size="small"
            v-model="userForm.sign">
        </el-input>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="updateUser" size="small"
        >确认修改
        </el-button
        >

      </el-form-item>


    </el-form>

  </div>
</template>

<script>
export default {
  name: "UserInfo",
  methods: {
    updateUser() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.userForm.bornTime+=" 00:00:00";

          this.postRequest('/user/setInfo', this.userForm).then(resp => {
            if (resp) {
              this.userForm.bornTime.substring(0,10);

              this.$store.commit('initUser', this.userForm);
              this.$message({
                type: 'success',
                message: '修改成功!'
              });

            }
          })


        }
      })
    },
  },
  data() {
    return {
      userForm: this.$store.state.user,
      rules: {
        trueName: [{
          required: true,
          message: "真实姓名不能为空",
          trigger: "blur",

        }],
        bornTime: [{
          required: true,
          message: "生日不能为空",
          trigger: "blur",

        }],

        location: [{
          required: true,
          message: "昵称不能为空",
          trigger: "blur",

        }],
        name: [{
          required: true,
          message: "昵称不能为空",
          trigger: "blur",

        }],
        uid: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],

      },
    }
  }
}
</script>

<style scoped>

</style>
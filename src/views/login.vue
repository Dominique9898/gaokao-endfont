<template>
  <div class="login-wrap">
    <div
      style="
        position: relative;
        width: 300px;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -20%);
      "
    >
      <div class="ms-title">后台管理</div>
      <div class="ms-login">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item label="管理员">
            <el-input
              v-model="ruleForm.username"
              placeholder="username"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              placeholder="password"
              v-model="ruleForm.password"
              @keyup.enter.native="submitForm('ruleForm')"
            ></el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="submitForm">登录</el-button>
          </div>
          <p style="font-size: 12px; line-height: 30px; color: #999">
            Tips : 用户名和密码要写数据库里的。
          </p>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      ruleForm: {
        username: "dyt",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      let params = this.ruleForm;
      this.request
        .post("/login", params)
        .then((res) => {
          sessionStorage.setItem('userInfo', res.data)
          this.$message.success('欢迎回来')
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          this.$message({
            title: err,
            type: "error",
          });
        });
    },
  },
};
</script>

<style scoped>
.login-wrap {
  width: 100%;
  height: 100%;
}
.ms-title {
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  width: 300px;
  height: 160px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.login-wrap {
  background: #324157;
}
</style>
<style>
/*表单*/
.el-form-item {
  width: 100%;
}
.el-form-item__label,
.el-form-item__label {
  width: 80px !important;
}
.el-select {
  width: 100% !important;
}
.el-form-item__content {
  margin-left: 80px !important;
}
.table {
  min-width: 800px;
}
</style>

<template>
  <div id="login">
    <div class="loginConbox">
      <div class="header">
        <!--<div class="logo">-->
        <!--<img src="../../assets/logo.png">-->
        <!--</div>-->
        后台管理系统
      </div>
      <div class="loginBox">
        <div class="image-bg"></div>
        <div class="loginCon">
          <el-card shadow="always" class="login-module" v-if="smdl">
            <div slot="header" class="clearfix formTitlt">
              <span
                class="title-text"
                :class="{ active: pageType === 'login' }"
                @click="toRegister"
                >登录</span
              >
              <span
                class="title-text"
                :class="{ active: pageType === 'register' }"
                @click="toRegister"
                >注册</span
              >
            </div>
            <el-form
              :model="loginForm"
              status-icon
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item v-if="pageType === 'register'">
                <el-input
                  type="text"
                  v-model="loginForm.name"
                  auto-complete="off"
                  :clearable="true"
                  placeholder="请输入昵称"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  type="text"
                  v-model="loginForm.username"
                  auto-complete="off"
                  :clearable="true"
                  placeholder="请输入登录账号"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  type="password"
                  :clearable="true"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="请输入登录密码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="subBtn" type="primary" @click="submitForm">{{
                  pageType === "login" ? "登录" : "注册"
                }}</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      smdl: true,
      pageType: "login", // register
      loginForm: {
        username: "admin",
        password: "admin",
        name: "",
      },
    }
  },
  methods: {
    toRegister() {
      this.pageType === "login"
        ? (this.pageType = "register")
        : (this.pageType = "login")
    },

    async submitForm() {
      let that = this

      if (this.loginForm.username === "" || this.loginForm.password === "") {
        this.$message({
          showClose: true,
          message: "账号或密码不能为空",
          type: "error",
        })
        return false
      } else {
        if (this.pageType === "register") {
          // 注册
          let res = await this.$request.fetchRegister({
            username: that.loginForm.username,
            password: that.loginForm.password,
            name: that.loginForm.name,
            role_id: "0499e2b0a48d11eb9733413a889e1d72", // 普通用户
          })
          debugger
          if (res && res.data && res.data.code === 200) {
            this.$message({
              type: "success",
              message: "注册成功!",
            })
            this.pageType = "login"
            this.submitForm()
          } else {
            this.$message({
              type: "success",
              message: res.data.message,
            })
          }
          return
        } else {
          this.$request
            .fetchLogin({
              username: that.loginForm.username,
              password: that.loginForm.password,
            })
            .then((res) => {
              that.$restBack(
                res.data,
                () => {
                  that.$store
                    .dispatch("setToken", res.data.data.access_token)
                    .then((res) => {
                      that.$router.push({ path: "/" })
                    })
                },
                "登录成功"
              )
            })
            .catch((err) => {
              console.log(err)
            })
        }
        // this.$request
        //   .fetchLogin({
        //     username: that.loginForm.username,
        //     password: that.loginForm.password
        //   })
        //   .then(res => {
        //     that.$restBack(
        //       res.data,
        //       () => {
        //         that.$store
        //           .dispatch("setToken", res.data.data.access_token)
        //           .then(res => {
        //             that.$router.push({ path: "/" });
        //           });
        //       },
        //       "登录成功"
        //     );
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      }
    },
  },
  mounted() {
    sessionStorage.removeItem("addTab")
  },
}
</script>
<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .loginConbox {
    background: #fff;
  }
  .header {
    height: 60px;
    position: relative;
    background: #fff;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    color: #333;
    line-height: 80px;
    /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/
    .logo {
      margin-left: 30px;
      width: 500px;
      float: left;
      height: 40px;
      padding-top: 10px;
      img {
        height: 100%;
      }
    }
  }

  .loginBox {
    display: flex;
    justify-content: center;
    .iconcolor {
      color: #409eff;
    }

    padding: 74px 0 118px;
    .image-bg {
      width: 600px;
      height: 400px;
      background-image: url("../../assets/img/undraw_compose_music_ovo2.png");
      background-size: 100% 100%;
    }
    .loginCon {
      // width: 990px;
      margin: auto 0;
      position: relative;
      min-height: 388px;
      .el-card__header {
        border-bottom: 0px;
      }
      .title {
        font-size: 36px;
        font-weight: 600;
        color: #ffffff;
        width: 500px;
        float: left;
        margin-top: 0px;
        &:first-child {
          font-size: 50px;
          margin-top: 50px;
          margin-bottom: 30px;
        }
      }
      .login-module {
        width: 380px;
        height: 325px;
        margin-top: 60px;
        border: none;
        // position: absolute;
        // right: 0;

        .formTitlt {
          font-weight: 400;
          font-size: 18px;

          .title-text {
            font-size: 16px;
            opacity: 0.7;
            transition: all 0.5s ease;
            color: #999999;
            &.active {
              opacity: 1;
              font-size: 20px;
              font-weight: 600;
              color: #409eff;
            }
          }

          .titIconbox {
            float: right;

            .pointer {
              cursor: pointer;
            }
          }
        }

        .smalltxt {
          text-align: right;

          .a {
            text-decoration: none;
            color: #999999;
            font-size: 12px;
            margin-left: 8px;
          }
        }
      }

      .el-form-item__content {
        margin-left: 0px !important;

        .subBtn {
          width: 100%;
        }
      }
    }

    .el-input__inner,
    .el-button,
    .el-card,
    .el-message {
      border-radius: 0px !important;
    }

    .el-form-item__content .ico {
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 999;
      width: 40px;
      height: 39px;
      text-align: center;
      border-right: 1px solid #ccc;
    }

    .ewmbox {
      width: 100%;
      height: 240px;
      margin-top: -25px;

      .ewm {
        width: 140px;
        height: 140px;
        margin: 20px auto;

        p {
          font-size: 12px;
          padding-left: 40px;
          margin: 0;
        }
      }

      .ewmicon {
        width: 140px;
        margin: 20px auto 0;

        .iconfont {
          float: left;
        }

        p {
          font-size: 12px;
          padding-left: 40px;
          margin: 0;
        }
      }
    }
  }
}
</style>

<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          type="text"
          placeholder="请输入你的手机号"
          v-model="phone"
          @change="phoneNumChange"
        />
        <span class="error-msg" v-if="phoneNumCondition"
          >请输入的是1开头总共11位的电话号码</span
        >
        <span class="error-msg" style="color: green" v-else
          >号码符合要求^.^</span
        >
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" v-model="code" placeholder="请输入验证码" />
        <!-- <img ref="code" src="http://182.92.128.115/api/user/passport/code" alt="code"> -->
        <button
          :class="{ background: condition }"
          ref="button"
          style="width: 100px; height: 40px; font-size: 15px"
          @click="getCode"
        >
          {{ buttonMessage }}{{ clock }}
        </button>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入你的登录密码"
          v-model="password1"
          @change="passChange"
        />
        <span class="error-msg" v-if="passCondition"
          >密码请包括大小写字母以及特殊符号在内的10位字符！！</span
        >
        <span class="error-msg" style="color: green" v-else
          >密码字符符合要求^.^</span
        >
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="password2"
        />
        <span class="error-msg" v-if="password1 != password2"
          >密码输入不一致</span
        >
        <span class="error-msg" style="color: green" v-else
          >密码符合要求^.^</span
        >
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="xiaogougou" />

        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg" v-if="!xiaogougou">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      xiaogougou: true,
      // 手机号
      phone: "",
      // 验证码
      code: "",
      agree: "",
      password1: "",
      password2: "",
      buttonMessage: "获得验证码",
      clock: "",
      condition: false,
      phoneNumCondition: false,
      phoneNumberPattern: /^1\d{10}$/,
      passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{10,}$/,
       
      passCondition: false,
    };
  },
  methods: {
    passChange(event) {
      if (!this.passwordPattern.test(this.password1)) {
        this.passCondition = true;
      } else {
        this.passCondition = false;
      }
    },
    phoneNumChange(event) {
      if (
        isNaN(event.target.value * 1) ||
        !this.phoneNumberPattern.test(this.phone)
      ) {
        // console.log("你输出的是数字");
        this.phoneNumCondition = true;
      } else {
        this.phoneNumCondition = false;
      }
    },
    async userRegister() {
      // console.log(this.agree);
      if (this.phoneNumCondition == true && this.passCondition == true) {
        alert("正确完善上述注册信息！！")



      }else{
        if (this.xiaogougou == false) {
          alert("请勾选同意条款！！！！");
        } else if (
          this.password1 == this.password2 &&
          this.password1 != false
        ) {
          try {
            await this.$store.dispatch("reqUserRegister", {
              phone: this.phone,
              password: this.password1,
              code: this.code,
            });
            console.log(123); //在try里面写的语句是异步返回成功的时候再接着执行。。。

            this.$router.push({
              name: "login",
            });
          } catch (error) {
            alert(error.message);
          }
        }
        
      }
    },
    async getCode() {
      // phoneNumCondition:false, 表示电话输入正确：
      //当电话输入不正确：
      if (this.phoneNumCondition) {
        alert("电话输入有误！！");
      } else {
        if (this.phone == false) {
          alert("请输入正确的手机号！！");
        } else {
          this.condition = true;
          this.$refs.button.disabled = true;
          this.buttonMessage = "重获验证码:";
          this.clock = "5";
          let timerId = setInterval(() => {
            this.clock--;
            if (this.clock < 1) {
              clearInterval(timerId);
              this.condition = false;
              this.$refs.button.disabled = false;
              this.clock = "";
            }
          }, 1000);
          await this.$store.dispatch("reqGetCode", this.phone);
          this.code = this.$store.state.user.code;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }
    .background {
      background-color: #e1e1e1;
      color: rgb(175, 175, 175);
      border: 1px solid #818181;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
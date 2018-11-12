<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" v-show="box">
      <el-form-item class="login-item" prop="username">
        <el-input class="input01" name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
      </el-form-item>
      <el-form-item class="login-item" prop="password">
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                  placeholder="password"></el-input>
        <span class="show-pwd" @click="showPwd" v-show="eye"><svg-icon icon-class="eye" /></span>
        <span class="show-pwd" @click="showPwd" v-show="eye02"><svg-icon icon-class="eye02" /></span>
      </el-form-item>
      <el-form-item class="login-item">
        <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">
          登 录
        </el-button>
      </el-form-item>
      <div style="position: relative;top: 307px;left: 70px;">
        <el-checkbox v-model="checked" style="color:#a0a0a0;">下次自动登录</el-checkbox>
        <span @click="clearCookie" style="cursor: pointer;color: #1E96D5;font-size: 0.75rem;margin-left: 150px;">忘记密码？</span>
      </div>
      <img src="@/assets/img/logo2.png" alt="" class="img0">
      <div class="appdownload" @click="toggle">
        <span class="tip">扫码下载app</span>
        <img src="@/assets/img/appdownload.png" alt="">
      </div>

    </el-form>
    <div class="login-form" v-show="box2">
      <img src="@/assets/img/login2.png" alt="" class="img1">
      <img src="@/assets/img/logo2.png" alt="" class="img2">
      <img src="@/assets/img/QRcode.png" alt="" class="img3">
      <div class="appdownload" @click="toggle">
        <span class="tip">账号登录</span>
        <img src="@/assets/img/accountLogin.png" alt="">
      </div>
    </div>
    <el-dialog
      title="找回密码"
      :visible.sync="dialogVisible"
      @close='closeDialog'
      width="900px">
      <div>
        <el-steps :active="active" finish-status="success">
          <el-step title="验证手机号"></el-step>
          <el-step title="填写新密码"></el-step>
          <el-step title="更改成功"></el-step>
        </el-steps>
      </div>

      <div class="passwordDiv" v-if='active==1'>
        <el-form ref="form1" :model="form1" :rules="rules"  label-width="120px">
          <el-form-item label="请输入手机号码" prop="name">
            <el-input v-model="form1.name" type="number"></el-input>
          </el-form-item>
          <el-form-item label="请输入验证码"  prop="number">
            <el-input v-model="form1.number" type="number"></el-input>
          </el-form-item>
          <el-button size="mini" type="primary" class="yzm" @click="yzm('form1')" :disabled="isDisabled">{{buttonName}}</el-button>
          <el-button @click="next('form1')">下一步</el-button>
        </el-form>
      </div>

      <div class="passwordDiv" v-if='active==2'>
        <el-form ref="form" :model="form" :rules="rules2" label-width="120px" >
          <el-form-item label="请输入新密码" prop="pass">
            <el-input v-model="form.pass" type="password"></el-input>
          </el-form-item>
          <el-form-item label="验证新密码" prop="checkPass">
            <el-input v-model="form.checkPass" type="password"></el-input>
          </el-form-item>
          <el-button @click="next2">下一步</el-button>
        </el-form>
      </div>

      <div class="passwordDiv" style="width: 100%" v-if='active==3'>
        <p><span class="el-icon-success"> </span> 修改完成</p>
      </div>

      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible=false" type="primary" v-if='active==3'>完成</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  // import { login } from '@/api/login/login'
  export default {
    name: 'login',
    data() {
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      };
      return {
        buttonName:'点击获取验证码',
        isDisabled: false,
        active: 1,
        time: 120,
        dialogVisible:false,
        eye:true,
        eye02:false,
        checked:false,
        box:true,
        box2:false,
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur'}],
          password: [{ required: true, trigger: 'blur', validator: validatePass }]
        },
        loading: false,
        pwdType: 'password',
        form1:{
          name:'',
          number:'',
        },
        form:{
          pass:'',
          checkPass:''
        },
        rules: {
          name: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号码格式不正确', trigger: 'blur' }
          ]
        }
      }
    },
    mounted(){
      this.getCookie();
    },
    methods: {
      next(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // checkCode({phoneNum :this.form1.name,verificationCode:this.form1.number}).then(response => {
            //   if(response.success){
            //     if (this.active++ > 2) this.active = 0;
            //   }else{
            //     this.$message({
            //       type: 'error',
            //       message: '验证码错误'
            //     })
            //   }
            // });
          }else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      next2(){
        if(this.form.pass==this.form.checkPass){
          // updatePassword({phoneNum :this.form1.name,password:this.form.pass}).then(response => {
          //   if(response.success){
          //     if (this.active++ > 2) this.active = 0;
          //   }else{
          //     this.$message({
          //       type: 'error',
          //       message: '修改失败'
          //     })
          //   }
          // });
        }else {
          this.$message({
            type: 'error',
            message: '两次输入的密码不匹配'
          })
        }
      },
      yzm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let me = this;
            me.isDisabled = true;
            let interval = window.setInterval(function() {
              me.buttonName = '（' + me.time + '秒）后重新发送';
              --me.time;
              if(me.time < 0) {
                me.buttonName = "重新发送";
                me.time = 10;
                me.isDisabled = false;
                window.clearInterval(interval);
              }
            }, 1000);
            // getCode({phoneNum :this.form1.name}).then(response => {
            //   this.$message({
            //     type: 'success',
            //     message: '发送成功'
            //   })
            // });
          }
        })
      },
      toggle(){
        this.box = !this.box
        this.box2 = !this.box2
      },
      showPwd() {
        this.eye = !this.eye;
        this.eye02 = !this.eye02;
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {

        let user = {
          username:this.loginForm.username,
          password:this.loginForm.password
        };

        if(this.checked=true){
          //传入账号名，密码，和保存天数3个参数
          this.setCookie(user,7);
        }

        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$store.dispatch('Login', user).then(() => {
              //this.loading = false
              this.$router.push({ path: '/' })
            })

          } else {
            return false
          }
        })
      },
      //设置cookie
      setCookie(user, exdays) {
        let exdate = new Date();
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        document.cookie = "username=" + user.username + ";path=/;expires=" + exdate.toLocaleString();
        document.cookie = "password=" + user.password + ";path=/;expires=" + exdate.toLocaleString()
      },
      //读取cookie
      getCookie(){
        if (document.cookie.length>0) {
          var arr=document.cookie.split('; ');
          for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');//再次切割
            //判断查找相对应的值
            if(arr2[0]=='username'){
              this.loginForm.username=arr2[1];//保存到保存数据的地方
            }else if(arr2[0]=='password'){
              this.loginForm.password=arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie(){
        this.dialogVisible = true
        this.setCookie("","",-1);//修改2值都为空，天数为负1天
      },
      closeDialog(){
        this.active = 1
        this.form1 ={
          name:'',
          number:'',
        };
        this.form ={
          pass:'',
          checkPass:''
        };
      }
    },
    mounted(){
      this.getCookie()
    }
  }
</script>

<style scoped lang="scss">
  $bg:#2d3a4b;
  $light_gray:#eee;
  .login-container{
    height: 100%;
    width: 100%;
    background-image: url("../../assets/img/bg.png");
    .el-form-item{

    }
    .el-form-item:nth-child(3){
      margin-left: 67px;
      width: 71%;
    }
    .login-form{
      position: absolute;
      width: 472px;
      left: 50%;
      height: 465px;
      margin: 170px 0 0 -236px;
      padding: 0px;
      background-image: url("../../assets/img/login.png");
      background-size: contain;
      .login-item{
        position: absolute;
        &:nth-child(1){
          top:181px;;
          margin-left: 115px;
        }
        &:nth-child(2){
          top:242px;
          margin-left: 115px;
        }
        &:nth-child(3){
          top:335px;
          padding-left: 51px;
        }
      }
      .el-input{
        display: inline-block;
        height: 45px;
        width: 290px;
        background: transparent;
        color: #ccc;

      }
      .show-pwd{
        position: absolute;
      }
      .el-button{
        position: relative;
        height: 50px;
        font-size: 20px;
        top: 0px;
        left: -49px;
        width: 117%;
      }
      .appdownload{
        position: absolute;
        right: 24px;
        bottom: 25px;
        font-size: 14px;
        color: #1c1c1c;
        height: 44px;
        line-height: 44px;
      }
      .show-pwd{
        position: absolute;
        right: 20px;
        top: 3px;
      }
      .img0{
        position: absolute;
        left: 140px;
        top: 40px;
      }
      .img1{
        position: absolute;
        right: 3px;
        bottom: 3px;
      }
      .img2{
        position: absolute;
        left: 140px;
        top: 40px;
      }
      .img3{
        width: 240px;
        height: 240px;
        position: absolute;
        left: 115px;
        top: 130px;
      }
      .tip{
        float: left;
      }
    }
  }
  .passwordDiv{
    margin: 40px 20px 0 0;width: 70%;position: relative;
  }
  .passwordDiv p{text-align: center;font-size: 24px;color: #67C23A}
  .yzm{position: absolute;right: -160px;top: 5px;}
</style>

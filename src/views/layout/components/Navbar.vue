<template>
  <el-menu class="navbar" mode="horizontal">

    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <tabs-view></tabs-view>

    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <span style="font-size: 18px;position: relative;top: -10px; margin:0 10px;">{{name}}</span>
        <!--<img class="user-avatar" src="./../../../assets/img/toux.png">-->
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>

        <el-dropdown-item divided>
          <span @click="centerDialogVisible=true" style="display:block;">修改密码</span>
        </el-dropdown-item>

        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog
      title="修改密码"
      :visible.sync="centerDialogVisible"
      width="485px" @close='closeDialog'
    >

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="新密码 : " :label-width="formLabelWidth" prop="newpass">
          <el-input type="password" v-model="ruleForm.newpass" auto-complete="off" style="width:335px;"></el-input>
        </el-form-item>

        <el-form-item label="重复新密码 : " :label-width="formLabelWidth" prop="checknewpass">
          <el-input type="password" v-model="ruleForm.checknewpass" auto-complete="off" style="width:335px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="submitForm()">确认提交</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


  </el-menu>
</template>

<script>
  import {mapGetters} from 'vuex'
  // import {updatePassword} from '@/api/user';

  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import TabsView from '@/views/layout/components/TabsView'
  import {removeStore} from '@/utils/store'

  export default {
    components: {
      Breadcrumb,
      Hamburger,
      TabsView
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'userId',
        'name'
      ])
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.newpass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };


      return {
        centerDialogVisible: false,
        formLabelWidth: '100px',
        ruleForm: {
          newpass: '',
          checknewpass: ''
        },
        rules: {
          newpass: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
          ],
          checknewpass: [
            {
              required: true, message: '确认新密码',
              validator: validatePass,
              trigger: "blur"
            }
          ]
        }
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({path: "/login"});
          this.$store.dispatch("delAllViews")
          removeStore({name: 'visitedViews'})
        })
      },

      closeDialog() {
        /* 清除表单验证的提示*/
        this.$refs.ruleForm.resetFields();
        this.ruleForm = {
          newpass: '',
          checknewpass: ''
        }
      },
      cancel() {
        this.$refs.ruleForm.resetFields();
        this.ruleForm = {
          newpass: '',
          checknewpass: ''
        };
        this.centerDialogVisible = false
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              var obj = {
                userId: this.userId,
                newpwd: this.ruleForm.newpass
              };
              // updatePassword(obj).then(response => {
              //   if (response.success) {
              //     this.$refs.ruleForm.resetFields();
              //     this.ruleForm = {
              //       newpass: '',
              //       checknewpass: ''
              //     };
              //     this.centerDialogVisible = false;
              //
              //     this.$message({
              //       type: 'success',
              //       message: response.message
              //     })
              //
              //   } else {
              //     this.$refs.ruleForm.resetFields();
              //     this.ruleForm = {
              //       newpass: '',
              //       checknewpass: ''
              //     };
              //     this.centerDialogVisible = false;
              //     this.$message({
              //       type: 'warning',
              //       message: response.message
              //     })
              //   }
              // })
            }
          }
        )
      },

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    border-radius: 0px !important;
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:flex-start;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      padding: 0 10px;
      display: inline-block;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      margin-left: auto;

      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>


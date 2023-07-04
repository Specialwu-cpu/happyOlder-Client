<template>
  <el-form style="margin-top:50px" label-width="10px" :label-position="labelPosition" ref="LoginFormRef" :model="user"  class="login_form">
    <el-form-item  label="编号" prop="id">
      <el-input :disabled="true" style="width: 500px" placeholder=编号 v-model="user.id" prefix-icon="el-icon-user"></el-input>
    </el-form-item>
    <el-form-item label="个人信息" prop="password">
      <div>
        <label for="name">真实姓名:</label>
        <el-input id="name" style="width: 400px" placeholder="真实姓名" v-model="user.real_name" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="gender">性别:</label>
        <el-input id="gender" style="width: 400px" placeholder="性别" v-model="user.sex" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="phone">电话号码:</label>
        <el-input id="phone" style="width: 400px" placeholder="电话号码" v-model="user.phone" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="shenFen">身份证号:</label>
        <el-input id="shenFen" style="width: 400px" placeholder="身份证号" v-model="user.phone" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="birthday">出生日期:</label>
        <el-input id="birthday" style="width: 400px" placeholder="出生日期" v-model="user.mobile" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="hire_date">入职日期:</label>
        <el-input id="hire_date" style="width: 350px" placeholder="入职日期" v-model="user.description" prefix-icon="el-icon-lock"></el-input>
        <label for="resign_date">离职日期:</label>
        <el-input id="resign_date" style="width: 350px" placeholder="离职日期" v-model="user.description" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="description">描述:</label>
        <el-input id="description" style="width: 400px" placeholder="描述" v-model="user.description" prefix-icon="el-icon-lock"></el-input>
      </div>
    </el-form-item>
    <el-form-item class="btns">
      <el-button type="primary" @click="submit">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";

export default {
  created() {
    var _this = this
    this.user.id = this.$route.query.id
    // axios({
    //   method:"get",
    //   headers:{
    //     'Content-Type':'application/json',
    //   },
    //   url:"user/getUsername"
    // }).then((res)=>{
    //   _this.user.username=res.data;
    //   _this.newUser.username=res.data.username;
    // })

  },
  data() {
    return {
      labelPosition: 'top',
      user:{
        id:'',
        username: '',
        password:'',
        real_name:'',
        sex:'',
        email:'',
        phone:'',
        mobile:'',
        description:'',
      },
      newUser:{
        username: '',
        password:''
      }
    }
  },
  methods:{
    submit(){
        axios({
          method:"post",
          headers:{
            'Content-Type':'application/json',
          },
          data:JSON.stringify(this.user),
          url:"user/revise"
        }).then(res => {
          if(res.data.loginMsg=='1')
          {
            this.$message.error('用户名重复，修改失败！');
            this.user.username=this.newUser.username;
          }
          else
          {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
          }

        })
    }
  }
}
</script>

<style>
.login_form{

  /*background-color: #e4ecf5;*/
}

</style>

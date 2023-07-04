<template>
  <el-form style="margin-top:50px" label-width="10px" :label-position="labelPosition" ref="LoginFormRef" :model="user"  class="login_form">
    <el-form-item  label="编号" prop="id">
      <el-input :disabled="true" style="width: 500px" placeholder=编号 v-model="user.ID" prefix-icon="el-icon-user"></el-input>
    </el-form-item>
    <el-form-item label="个人信息" prop="password">
      <div>
        <label for="name">真实姓名:</label>
        <el-input id="name" style="width: 400px" placeholder="真实姓名" v-model="user.real_name" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="gender">性别:</label>
        <el-input id="gender" style="width: 400px" placeholder="性别" v-model="user.gender" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="health_state">健康状况:</label>
        <el-input id="health_state" style="width: 400px" placeholder="健康状况" v-model="user.mobile" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="room_number">房间号:</label>
        <el-input id="room_number" style="width: 400px" placeholder="房间号" v-model="user.mobile" prefix-icon="el-icon-lock"></el-input>
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
        <label for="description">描述:</label>
        <el-input id="description" style="width: 400px" placeholder="描述" v-model="user.description" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="checkin_date">入院日期:</label>
        <el-input id="checkin_date" style="width: 350px" placeholder="入院日期" v-model="user.description" prefix-icon="el-icon-lock"></el-input>
        <label for="checkout_date">离院日期:</label>
        <el-input id="checkout_date" style="width: 350px" placeholder="离院日期" v-model="user.description" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="firstguardian_name">第一监护人姓名:</label>
        <el-input id="firstguardian_name" style="width: 350px" placeholder="第一监护人姓名" v-model="user.description" prefix-icon="el-icon-lock"></el-input>
        <label for="firstguardian_relationship">第一监护人关系:</label>
        <el-input id="firstguardian_relationship" style="width: 350px" placeholder="第一监护人关系" v-model="user.description" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="firstguardian_phone">第一监护人电话:</label>
        <el-input id="firstguardian_phone" style="width: 350px" placeholder="第一监护人电话" v-model="user.description" prefix-icon="el-icon-lock"></el-input>
        <label for="firstguardian_wechat">第一监护人微信:</label>
        <el-input id="firstguardian_wechat" style="width: 350px" placeholder="第一监护人微信" v-model="user.description" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="secondguardian_name">第二监护人姓名:</label>
        <el-input id="secondguardian_name" style="width: 350px" placeholder="第二监护人姓名" v-model="user.description" prefix-icon="el-icon-lock"></el-input>
        <label for="secondguardian_relationship">第二监护人关系:</label>
        <el-input id="secondguardian_relationship" style="width: 350px" placeholder="第二监护人关系" v-model="user.description" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="secondguardian_phone">第二监护人电话:</label>
        <el-input id="secondguardian_phone" style="width: 350px" placeholder="第二监护人电话" v-model="user.description" prefix-icon="el-icon-lock"></el-input>
        <label for="secondguardian_wechat">第二监护人微信:</label>
        <el-input id="secondguardian_wechat" style="width: 350px" placeholder="第二监护人微信" v-model="user.description" prefix-icon="el-icon-lock"></el-input>
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
    this.user.id=this.$route.query.id;
    let url = 'http://43.143.150.4:8010/oldPerson/get/'
    url = url + this.user.id.toString()
    var _this = this
    axios({
      method:"get",
      headers:{
        'Content-Type':'application/json',
      },
      url:url,
    }).then((res)=>{
      // console.log(res.data.old_person)
      _this.user = res.data.old_person
      // _this.user.username=res.data;
      // _this.newUser.username=res.data.username;
    })
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

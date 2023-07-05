<template>
  <el-form style="margin-top:50px" label-width="10px" :label-position="labelPosition" ref="LoginFormRef" :model="user"  class="login_form">
    <el-form-item label="个人信息" prop="password">
      <div>
        <label for="name">真实姓名:</label>
        <el-input id="name" style="width: 400px" placeholder="真实姓名" v-model="user.username" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="gender">性别:</label>
        <el-input id="gender" style="width: 400px" placeholder="性别" v-model="user.gender" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="health_state">健康状况:</label>
        <el-input id="health_state" style="width: 400px" placeholder="健康状况" v-model="user.health_state" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="room_number">房间号:</label>
        <el-input id="room_number" style="width: 400px" placeholder="房间号" v-model="user.room_number" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="phone">电话号码:</label>
        <el-input id="phone" style="width: 400px" placeholder="电话号码" v-model="user.phone" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="shenFen">身份证号:</label>
        <el-input id="shenFen" style="width: 400px" placeholder="身份证号" v-model="user.id_card" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="birthday">出生日期:</label>
        <!--        <el-input id="birthday" style="width: 400px" placeholder="出生日期" v-model="user.birthday" prefix-icon="el-icon-lock"></el-input>-->
        <el-date-picker
          style="width: 350px"
          id="birthday"
          v-model="user.birthday"
          type="date"
          placeholder="Select date"
          @change="handleDateChange"
        ></el-date-picker>
      </div>
      <div>
        <label for="description">描述:</label>
        <el-input id="description" style="width: 400px" placeholder="描述" v-model="user.description" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="checkin_date">入院日期:</label>
        <!--        <el-input id="checkin_date" style="width: 350px" placeholder="入院日期" v-model="user.checkin_date" prefix-icon="el-icon-lock"></el-input>-->
        <el-date-picker
          style="width: 350px"
          id="checkin_date"
          v-model="user.checkin_date"
          type="date"
          placeholder="Select date"
          @change="handleDateChange"
        ></el-date-picker>
        <label for="checkout_date">离院日期:</label>
        <!--        <el-input id="checkout_date" style="width: 350px" placeholder="离院日期" v-model="user.checkout_date" prefix-icon="el-icon-lock"></el-input>-->
        <el-date-picker
          style="width: 350px"
          id="checkout_date"
          v-model="user.checkout_date"
          type="date"
          placeholder="Select date"
          @change="handleDateChange"
        ></el-date-picker>
      </div>
      <div>
        <label for="firstguardian_name">第一监护人姓名:</label>
        <el-input id="firstguardian_name" style="width: 350px" placeholder="第一监护人姓名" v-model="user.firstguardian_name" prefix-icon="el-icon-lock"></el-input>
        <label for="firstguardian_relationship">第一监护人关系:</label>
        <el-input id="firstguardian_relationship" style="width: 350px" placeholder="第一监护人关系" v-model="user.firstguardian_relationship" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="firstguardian_phone">第一监护人电话:</label>
        <el-input id="firstguardian_phone" style="width: 350px" placeholder="第一监护人电话" v-model="user.firstguardian_phone" prefix-icon="el-icon-lock"></el-input>
        <label for="firstguardian_wechat">第一监护人微信:</label>
        <el-input id="firstguardian_wechat" style="width: 350px" placeholder="第一监护人微信" v-model="user.firstguardian_wechat" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="secondguardian_name">第二监护人姓名:</label>
        <el-input id="secondguardian_name" style="width: 350px" placeholder="第二监护人姓名" v-model="user.secondguardian_name" prefix-icon="el-icon-lock"></el-input>
        <label for="secondguardian_relationship">第二监护人关系:</label>
        <el-input id="secondguardian_relationship" style="width: 350px" placeholder="第二监护人关系" v-model="user.secondguardian_relationship" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="secondguardian_phone">第二监护人电话:</label>
        <el-input id="secondguardian_phone" style="width: 350px" placeholder="第二监护人电话" v-model="user.secondguardian_phone" prefix-icon="el-icon-lock"></el-input>
        <label for="secondguardian_wechat">第二监护人微信:</label>
        <el-input id="secondguardian_wechat" style="width: 350px" placeholder="第二监护人微信" v-model="user.secondguardian_wechat" prefix-icon="el-icon-lock"></el-input>
      </div>
    </el-form-item>
    <el-form-item class="btns">
      <el-button type="primary" @click="submit">添加</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      labelPosition: 'top',
      user:{
        ID:'',
        username: '',
        gender:'',
        health_state:'',
        room_number:'',
        phone:'',
        id_card:'',
        birthday:'',
        description:'',
        checkin_date:'',
        checkout_date:'2200-01-01',
        firstguardian_name:'',
        firstguardian_relationship:'',
        firstguardian_phone:'',
        firstguardian_wechat:'',
        secondguardian_name:'',
        secondguardian_relationship:'',
        secondguardian_phone:'',
        secondguardian_wechat:'',
      },
      newUser:{
        username: '',
        password:''
      }
    }
  },
  methods:{
    submit(){
      if(!this.isValid()){
        return;
      }
      let url = "http://43.143.150.4:8010/oldPerson/create/"
      axios({
        method:"post",
        headers:{
          'Content-Type':'application/json',
        },
        data:JSON.stringify(this.user),
        url:url
      }).then(res => {
        console.log(res);
        this.$message({
          message: '添加成功！',
          type: 'success'
        });
      })
    },
    isValid(){
      if(this.user.username==="" || this.user.username== null){
        this.$message({
          message: '姓名必须填写！',
          type: 'error'
        });
        return false;
      }
      if(this.user.birthday === "" || this.user.birthday== null){
        this.$message({
          message: '生日必须填写！',
          type: 'error'
        });
        return false;
      }
      if(this.user.checkin_date === "" || this.user.checkin_date== null){
        this.$message({
          message: '入院日期必须填写！',
          type: 'error'
        });
        return false;
      }
      return true;
    },
    handleDateChange(){
      console.log(this.user.birthday)
    }
  }
}
</script>

<style>
.login_form{

  /*background-color: #e4ecf5;*/
}

</style>

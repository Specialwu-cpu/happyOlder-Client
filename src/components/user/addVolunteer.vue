<template>
  <el-form style="margin-top:50px" label-width="10px" :label-position="labelPosition" ref="LoginFormRef" :model="user"  class="login_form">
    <el-form-item  label="编号" prop="id">
      <el-input :disabled="true" style="width: 500px" placeholder=编号 v-model="user.id" prefix-icon="el-icon-user"></el-input>
    </el-form-item>
    <el-form-item label="个人信息" prop="password">
      <div>
        <label for="name">真实姓名:</label>
        <el-input id="name" style="width: 400px" placeholder="真实姓名" v-model="user.name" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="gender">性别:</label>
        <el-input id="gender" style="width: 400px" placeholder="性别" v-model="user.gender" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="phone">电话号码:</label>
        <el-input id="phone" style="width: 400px" placeholder="电话号码" v-model="user.phone" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="id_card">身份证号:</label>
        <el-input id="id_card" style="width: 400px" placeholder="身份证号" v-model="user.id_card" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="birthday">出生日期:</label>
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
        <label for="checkin_date">访问日期:</label>
        <el-date-picker
          style="width: 350px"
          id="checkin_date"
          v-model="user.checkin_date"
          type="date"
          placeholder="Select date"
          @change="handleDateChange"
        ></el-date-picker>
        <label for="checkout_date">离开日期:</label>
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
        <label for="description">描述:</label>
        <el-input id="description" style="width: 400px" placeholder="描述" v-model="user.DESCRIPTION" prefix-icon="el-icon-lock"></el-input>
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
        id:'',
        name: '',
        gender:'',
        phone:'',
        id_card:'',
        birthday:'',
        description:'',
        checkin_date:'',
        checkout_date:'2200-01-01',
        DESCRIPTION: '',
      },
    }
  },
  methods:{
    submit(){
      if(!this.isValid()){
        return;
      }
      let url = "http://43.143.150.4:8010/volunteer/create/"
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
      if(this.user.name==="" || this.user.name== null){
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
    },
  }
}
</script>

<style>
.login_form{

  /*background-color: #e4ecf5;*/
}

</style>

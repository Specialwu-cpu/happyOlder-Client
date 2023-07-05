<template>
  <div style="background-color: white">
    <el-header class="el-header" height="70px">
      <div>
        <img src="../assets/BJTU.png" alt="" height="40" width="160 " style="margin-left: 10px">
      </div>
      <el-menu :default-active="'/userCenter'" class="el-menu-demo"
               router mode="horizontal"
               active-text-color="#0241BD">
        <el-menu-item class="el-menu-item-header" v-for="(item,i) in navList" :key="i" :index="item.name">
          {{ item.navItem }}
        </el-menu-item>
      </el-menu>

<!--      <el-tooltip class="item" effect="dark" content="注销" placement="bottom">-->
        <i class="el-icon-switch-button" @click="out" itemscope></i>
<!--      </el-tooltip>-->

    </el-header>

    <el-container style="height: 800px; border: 1px solid #eee;">

      <el-aside width="202px" style="border: 1px solid #eee; border-top: none" >
        <div style="width: 190px;background-color: white;padding: 5px;margin: auto">
          <img :src="user.userPic" width="150px" height="150px" style="border-radius: 300px;margin-left: 8%">
          <br>
          <br>
          <p style="margin:0 auto;text-align: center" v-model="user.username">{{user.username}}</p>
        </div>

        <br>
        <br>
        <el-menu :default-openeds="['1','2']">
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-s-custom"></i>信息中心</template>
            <el-menu-item-group>
              <router-link class="alink" to="/userCenter/modifyAdmin"><el-menu-item index="2-1"><i class="el-icon-s-tools"></i>信息修改</el-menu-item></router-link>
              <router-link class="alink" to="/userCenter/manageOlder"><el-menu-item index="2-2"><i class="el-icon-tickets"></i>老人管理</el-menu-item></router-link>
              <router-link class="alink" to="/userCenter/manageWorker"><el-menu-item index="2-3"><i class="el-icon-monitor"></i>职工管理</el-menu-item></router-link>
              <router-link class="alink" to="/userCenter/manageVolunteer"><el-menu-item index="2-3"><i class="el-icon-view"></i>义工管理</el-menu-item></router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>


      <el-container style="background-color: white">
        <el-main>
          <router-view/>
        </el-main>
      </el-container>

    </el-container>

  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "Space",
  created() {
    var _this = this
    // axios({
    //   method:"get",
    //   headers:{
    //     'Content-Type':'application/json',
    //   },
    //   url:"user/getUsername"
    // }).then((res)=>{
    //   _this.user.username=res.data;
    // })
  },
  data() {
    return {
      user:{
        userPic :require('../assets/user.png'),
        username: '用户'
      },
      navList:[
        {name:'/user3',navItem:'处理中心'},
        {name:'/userCenter',navItem:'个人中心'},
        {name:'/about',navItem:'关于我们'},
      ]
    }
  },
  methods:{
    out(){
      axios({
        method:"get",
        headers:{
          'Content-Type':'application/json',
        },
        url:"http://127.0.0.1:8000/api/exited/"
      }).then((res)=>{
      })
      this.$router.push("/login");
    },
    back(){
      this.$router.push("/user3");
    }
  }

}
</script>

<style scoped>
.link{
  margin-left: -1640px;
}
.el-header {
  background-color: WHITE ;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  border: 10px;
  box-shadow: black;

}

.el-menu-demo{
  height: 70px;
  line-height: 70px;
}
.el-menu-item-header{
  height: 71px;

}

.el-aside {
  color: #333;
}
.alink{
  text-decoration: none;
}
.out{
  float: left;
  margin-top: 10px;
}
</style>


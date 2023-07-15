<template>
  <el-container>
    <!-- 顶栏 -->
    <el-header class="el-header" height="70px">
      <div>
        <img src="../assets/BJTU.png" alt="" height="40" width="160 " style="margin-left: 10px">
      </div>
      <el-menu :default-active="'/about'" class="el-menu-demo"
               router mode="horizontal"
               active-text-color="#0241BD">
        <el-menu-item class="el-menu-item-header" v-for="(item,i) in navList" :key="i" :index="item.name">
          {{ item.navItem }}
        </el-menu-item>
      </el-menu>
      <i class="el-icon-switch-button" @click="out"></i>
    </el-header>
    <el-container style="display: flex; width: 800px">
      <el-aside width="202px" style="border: 1px solid #eee;">
        <el-menu :default-openeds="['1']">
          <el-menu-item index="1-1-1" @click.native="face"><i class="el-icon-cpu"></i>人脸识别</el-menu-item>
          <el-menu-item index="1-1-2" @click.native="fall"><i class="el-icon-cpu"></i>摔倒检测</el-menu-item>
        </el-menu>
      </el-aside>
      <el-row  style="border: 1px solid #eee;" >
        <img :src="imageUrl" style="width: 800px; height:700px;margin-top: 0px; margin-left: 100px">
        <el-button @click="click1" style="width: 800px; margin-left: 100px;"></el-button>
      </el-row>
    </el-container>

  </el-container>

</template>

<script>
import axios from "axios";

export default {
  name: "about",
  data() {
    return {
      imageUrl:require("../assets/1.jpg"),
      latestDate:new Date(),
      timer:0,
      navList:[
        {name:'/user3',navItem:'统计中心'},
        {name:'/userCenter/modifyAdmin',navItem:'信息管理'},
        {name:'/about',navItem:'实时监控'},
      ]
    }
  },
  methods: {
    face(){
      this.imageUrl=require("../assets/1.jpg")
    },
    fall(){
      this.imageUrl=require("../assets/2.jpg")
    },
    click1(){
      this.eventData(); // 首次加载数据
      this.timer = setInterval(this.eventData, 1000); // 定时器，每隔5秒请求数据更新图表
    },
    async eventData() {
      try {
        axios({
          method: "get",
          headers: {
            'Content-Type': 'application/json',
          },
          url: "http://43.143.150.4:8010/event/get_newest/"
        }).then(res => {
          let data = res.data
          let message = "事件："+data.event_description+"，地点："+data.event_location+ "，时间："+data.event_date
          let eventDate = new Date(data.event_date)
          // 如果是事件时间大于目前最新时间
          if(eventDate>this.latestDate){
            this.$message({
              message: message,
              type: 'warning'
            });
            this.latestDate=eventDate
          }
        })
      } catch (error) {
        console.error('请求错误:', error);
      }
    },
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
  }
}
</script>

<style scoped>
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

.about{

}
span.title{
  color:black;
  font-size: 40px;
    /*font-weight: bold;*/
  line-height: 60px;
}

span.text{
  color:gray;
  font-size: 30px;
  font-weight: bold;
}

span.gitee{
  font-size: 20px;
}

.link{
  font-size: 20px;
}
</style>

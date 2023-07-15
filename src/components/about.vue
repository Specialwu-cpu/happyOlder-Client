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
  <el-container  style="border: 1px solid #eee;" >
      <img src="../assets/1.jpg" style="width: 900px; height:700px;margin: 0 auto">
  </el-container>
  </el-container>

</template>

<script>
export default {
  name: "about",
  data() {
    return {
      navList:[
        {name:'/user3',navItem:'统计中心'},
        {name:'/userCenter/modifyAdmin',navItem:'信息管理'},
        {name:'/about',navItem:'实时监控'},
      ]
    }
  },
  methods: {},
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

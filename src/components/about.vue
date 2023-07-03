<template>
  <el-container>
  <el-header class="el-header" height="70px">
    <div>
      <img src="../assets/BJTU.png" alt="" height="40" width="160 " style="margin-left: 10px">
    </div>
    <el-menu :default-active="'/about'" class="el-menu-demo"
             router
             mode="horizontal"
             active-text-color="#0241BD">
      <el-menu-item class="el-menu-item-header" v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
    </el-menu>

<!--    <el-tooltip class="item" effect="dark" content="注销" placement="bottom">-->
      <i class="el-icon-switch-button" @click="out" style="color: gray; "></i>
<!--    </el-tooltip>-->

  </el-header>
  <el-container  style="border: 1px solid #eee;" >
    <el-form class="about" style="margin-top:80px" label-width="10px" :label-position="labelPosition" >

  <span class="title" style="margin-left: 630px">第11组</span> <br />
      <br><br>
      <span class="text" style="margin-left: 600px">算法: 郑若翀 陈作豪</span> <br />
      <br>
      <span class="text" style="margin-left: 500px">后端：陈佳运</span> <br />
      <br>
      <span class="text" style="margin-left: 600px">前端：郑荣泰 杨昊骏</span> <br />
      <br><br>
      <span class="gitee" style="margin-left: 500px">Gitee:</span>
  <el-link class="link" href="https://gitee.com/Nicoqwq/course-practice-3-11-groups" type="primary">https://gitee.com/Nicoqwq/course-practice-3-11-groups</el-link>

    </el-form>
  </el-container>
  </el-container>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      navList:[
        {name:'/user3',navItem:'处理中心'},
        {name:'/userCenter',navItem:'个人中心'},
        {name:'/about',navItem:'关于我们'},
      ]
    }
  },
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

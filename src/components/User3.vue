<template xmlns="http://www.w3.org/1999/html">
  <el-container>
    <!-- 顶栏 -->
      <el-header class="el-header" height="70px">
        <div>
          <img src="../assets/BJTU.png" alt="" height="40" width="160 " style="margin-left: 10px">
        </div>
        <el-menu :default-active="'/user3'" class="el-menu-demo"
                 router mode="horizontal"
                 active-text-color="#0241BD">
          <el-menu-item class="el-menu-item-header" v-for="(item,i) in navList" :key="i" :index="item.name">
            {{ item.navItem }}
          </el-menu-item>
        </el-menu>
          <i class="el-icon-switch-button" @click="out"></i>
      </el-header>
    <!-- 嵌套容器 -->
    <el-container class="background"  style="border: 1px solid #eee;">
      <!-- 侧边导航菜单 -->
      <el-aside width="202px" style="border: 1px solid #eee;">
        <div style="width: 190px;background-color: white;padding: 5px;margin: auto">
        <img src="../assets/main.png" width="150px" height="150px" style="border-radius: 300px;margin-left: 8%">

<!--        <div class="user">-->
<!--          <el-button @click="user" type="success" icon="el-icon-user"  circle></el-button>-->
<!--        </div>-->
<!--        <div class="train">-->
<!--          <el-button @click="train" type="success" icon="el-icon-data-line"  circle>训练</el-button>-->
<!--        </div>-->


        </div>
          <br>
          <br>
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-office-building"></i>统计中心</template>
                <el-submenu index="1-1">   <template slot="title"><i class="el-icon-document-add"></i>老人统计</template>
                  <el-menu-item index="1-1-1" @click.native="itemOlderAge"><i class="el-icon-cpu"></i>年龄统计</el-menu-item>
                  <el-menu-item index="1-1-2" @click.native="itemOlderBehavior"><i class="el-icon-cpu"></i>行为统计</el-menu-item>
                </el-submenu>
                <el-menu-item index="1-2" @click.native="worker"><i class="el-icon-data-analysis"></i>职工统计</el-menu-item>
                <el-menu-item index="1-3" @click.native="volunteer"><i class="el-icon-cpu"></i>义工统计</el-menu-item>
            </el-submenu>
          </el-menu>

      </el-aside>
      <!-- 内容 -->
      <el-row gutter="24" style="margin-top: 0px;" >
        <el-col :span="120">
          <el-card class="box-card_up_left" style=" margin-left:60px;margin-top:15px;
          height: 850px;width: 750px;" shadow="hover" background-color="FFFF00">
            <section class="itemLeftUp">
              <ItemPage >
                <component v-bind:is="plot1" class="zhu" :key="datas"></component>
              </ItemPage>
            </section>
          </el-card>
        </el-col>
      </el-row>

      <el-row  style="margin-top: 0px">
        <el-col :span="120">
          <el-card class="box-card_up_right" style="margin-left:95px; margin-top:15px;height: 380px" shadow="hover" >
            <section class="itemRightUp">
              <ItemPage>
                <itemOne  class="zhe" :key="bugChange" :msg="bugtext"></itemOne>
              </ItemPage>
            </section>
          </el-card>
        </el-col>
        <el-col :span="120">
          <el-card class="box-card_down_right" style=" margin-left:95px;margin-top:15px;height: 380px;width:570px " shadow="hover">
            <section class="itemRightDown">
              <ItemPage>
                <item-three  class="word" :key="datas" :msg="datas" v-on:listenTochildEvent="showMessageFromChild"></item-three>
              </ItemPage>
            </section>
          </el-card>
        </el-col>
      </el-row>
    </el-container>

  </el-container>

</template>

<script>
import itemOne from "./item/itemOne";
import itemTwo from "./item/itemTwo";
import itemThree from "./item/itemThree";
import itemFour from "./item/itemFour";
import itemMap from "./item/itemMap";
import itemFive from "./item/itemFive";
import ItemPage from "./itemPage";
import axios from "axios";
import pl from "element-ui/src/locale/lang/pl";
import itemVolunteer from "./item/itemVolunteer.vue";
import itemWorker from "./item/itemWorker.vue";
import itemOlderAge from "./item/itemOlderAge.vue";
export default {
  computed: {
    pl() {
      return pl
    }
  },
  data() {
    return {
      plot1:"item-two",
      fileList:[],
      fileType:[".png",".jpg", ".bmp"],
      startDate:'',
      endDate:'',
      datas:[],
      modname:[],
      acc:[],
      ppv:[],
      trp:[],
      f1:[],
      id:[],
      myName:[],
      value:[],
      options:[],
      kChildren:[],
      lChildren:[],
      bChildren:[],
      pChildren:[],
      bugtext:[],
      bugChange:0,
      dialogVisible:false,
      change:0,
      navList:[
        {name:'/user3',navItem:'统计中心'},
        {name:'/userCenter/modifyAdmin',navItem:'信息管理'},
        {name:'/about',navItem:'实时监控'},
      ]
    }
  },
  components: {
    ItemPage,itemOne,itemTwo,itemThree,itemFour,itemMap,itemFive,itemVolunteer,itemWorker,itemOlderAge
  },
  methods:{
    showMessageFromChild(data){
      console.log(data);
      if (data.modname=="KNN"){
        this.options[0].children.push({value:data.paraId,label:data.nickname})
      }else if (data.modname=="Logic"){
        this.options[1].children.push({value:data.paraId,label:data.nickname})
      }else if (data.modname=="Bayes"){
        this.options[2].children.push({value:data.paraId,label:data.nickname})
      }else if (data.modname=="perception"){
        this.options[3].children.push({value:data.paraId,label:data.nickname})
      }
    },
    opDia(row){
      console.log(row.id)
      this.$http.post("/user/chooseModel",row.id).then((res)=>{
        if (res.data==1){
          this.$message({
            showClose: true,
            message: '选择成功！',
            type: 'success'
          });
          this.dialogVisible=false
        }
      })
      this.dialogVisible=true
    },

    user(){
      this.$router.push("/userCenter");
    },
    out(){
      this.$router.push("/login");
    },
    // train(){
    //   this.$http.get("/algorithm/Logic").then((res)=>{
    //   })
    //   this.$http.get("/algorithm/KNN").then((res)=>{
    //   })
    //   this.$http.get("/algorithm/Bayes").then((res)=>{
    //   })
    //   this.$http.get("/algorithm/perception").then((res)=>{
    //   })
    //   this.$http.get("/algorithm/getResult").then((res)=>{
    //     this.$message.success('训练完成')
    //     this.datas=res.data
    //     console.log(this.datas)
    //     this.fileList=[]
    //   })
    // },
    predict(){
      console.log(this.value[1])
      let paraId = this.value[1]
      this.$http.post("/user/predict",{paraId}).then((res)=>{
        for (var i=0;i<res.data.length;i++){
          this.bugtext[i]=res.data[i].bugtext
        }
        if(this.bugChange==0){
          this.bugChange=1
        }else this.bugChange=0
      })
    },
    volunteer(){
      this.plot1="item-volunteer"
    },
    worker(){
      this.plot1="item-worker"
    },
    itemOlderBehavior(){
      this.plot1='item-two'
    },
    itemOlderAge(){
      this.plot1='item-older-age'
    },
    choose(){
      this.$http.get("/user/getModel").then((res)=>{
        console.log(res.data)
        for (var i=0;i<res.data.length;i++){
          if (res.data[i].modname=="KNN"){
            this.kChildren.push({value:res.data[i].paraId,label:res.data[i].nickname})
          }else if (res.data[i].modname=="Logic"){
            this.lChildren.push({value:res.data[i].paraId,label:res.data[i].nickname})
          }else if (res.data[i].modname=="Bayes"){
            this.bChildren.push({value:res.data[i].paraId,label:res.data[i].nickname})
          }else if (res.data[i].modname=="perception"){
            this.pChildren.push({value:res.data[i].paraId,label:res.data[i].nickname})
          }
          // )
          // this.options.push({value:res.data[i].paraId,label:res.data[i].nickname})
          // console.log(this.options)
        }
        this.options.push(
          {value:"knn",label:"KNN",children:this.kChildren},
          {value:"logic",label:"逻辑回归",children:this.lChildren},
          {value:"Bayes",label:"贝叶斯",children:this.bChildren},
          {value:"perception",label:"感知机",children:this.pChildren})
      })
    },
    handleDateChange(){
      console.log(this.startDate)
      console.log(this.endDate)
    }
  },
  mounted() {
    this.choose()
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
  height: 71px !important;
}

/*.title{*/
/*  font-size: 35px;*/
/*  color: #5E2612;*/
/*  margin-left: 15px;*/
/*  margin-top: 0px;*/
/*}*/

.el-aside{
  background-color: white;
  border-style: solid;
  border-top:none !important;border-bottom:none !important;border-left: none!important;
  height: 800px;
}
.background{
  background-color: white;
}
.box-card_up_left{
  background-color: white;
}
.zhu{
  flex: 2;
  background-color: white;
  width:300px;
  height: 300px;
}

.zhe{
  flex: 2;
  background-color: white;
  width:350px;
  height: 300px;
  /*margin-left:150px;*/
  /*margin-top: 40px;*/
}
.word{
  flex: 2;
  background-color: white;
  width:350px;
  height: 300px;
  margin-left:50px;

}

.el-icon-switch-button{

}
</style>

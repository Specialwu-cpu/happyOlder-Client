<template>
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


<!--        <el-tooltip class="item" effect="dark" content="注销" placement="bottom">-->
          <i class="el-icon-switch-button" @click="out"></i>
<!--        </el-tooltip>-->

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
        <br>
        <br>

        </div>

          <br>
          <br>
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-office-building"></i>处理中心</template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click.native="train"><i class="el-icon-cpu"></i>模型训练</el-menu-item>
                <el-submenu index="1-2">   <template slot="title"><i class="el-icon-document-add"></i>上传文件</template>
                  <el-upload
                    class="upload-demo"
                    action="/api/test/file2"
                    :accept="fileType"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :on-success="handle_success"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                    <el-button icon="el-icon-circle-plus-outline">上传文件</el-button>
                  </el-upload>
                </el-submenu>
                <el-submenu index="1-3" >           <template slot="title" style="flex: fit-content"><i class="el-icon-thumb"></i>选择模型</template>
                  <el-cascader
                    v-model="value"
                    :options="options"
                    @change="handleChange"
                  ></el-cascader>
                </el-submenu>
                <el-menu-item index="1-4" @click.native="predict"><i class="el-icon-data-analysis"></i>模型预测</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>

      </el-aside>
      <!-- 内容 -->
      <el-row gutter="24" style="margin-top: 0px;" >

        <el-col :span="120">
          <el-card class="box-card_up_left" style=" margin-left:60px;margin-top:15px;
          height: 780px;width: 640px;" shadow="hover" background-color="FFFF00">
            <section class="itemLeftUp">
              <ItemPage >
                <itemTwo  class="zhu" :key="datas" :msg="datas"></itemTwo>
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
export default {
  data() {
    return {
      fileList:[],
      fileType:[".png",".jpg", ".bmp"],
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
        {name:'/user3',navItem:'处理中心'},
        {name:'/userCenter/modifyAdmin',navItem:'个人中心'},
        {name:'/about',navItem:'关于我们'},
      ]
    }
  },
  components: {
    ItemPage,itemOne,itemTwo,itemThree,itemFour,itemMap,itemFive,
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
    handleChange(value) {
      console.log(value);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
      this.chooseForms=[]
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handle_success(res){
      console.log(res)
      this.$message.success('文件上传成功')
    },

    user(){
      this.$router.push("/userCenter");
    },
    out(){
      this.$router.push("/login");
    },
    train(){
      this.$http.get("/algorithm/Logic").then((res)=>{
      })
      this.$http.get("/algorithm/KNN").then((res)=>{
      })
      this.$http.get("/algorithm/Bayes").then((res)=>{
      })
      this.$http.get("/algorithm/perception").then((res)=>{
      })
      this.$http.get("/algorithm/getResult").then((res)=>{
        this.$message.success('训练完成')
        this.datas=res.data
        console.log(this.datas)
        this.fileList=[]
      })
    },
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

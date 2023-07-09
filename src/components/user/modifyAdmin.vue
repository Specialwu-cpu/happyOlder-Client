<template>
  <el-form style="margin-top:50px" label-width="10px" :label-position="labelPosition" ref="LoginFormRef" :model="user"  class="login_form">
    <profilePicture :user="this.user" usertype="Admin"> </profilePicture>
    <el-form-item  label="用户名" prop="username">
      <el-input :disabled="true" style="width: 500px" placeholder=用户名 v-model="user.username" prefix-icon="el-icon-user"></el-input>
      <el-input style="width: 500px" placeholder="密码" v-model="user.password" prefix-icon="el-icon-lock"></el-input>
    </el-form-item>
    <el-form-item class="info" label="个人信息" prop="password">
      <div>
        <label for="name">真实姓名:</label>
        <el-input id="name" style="width: 400px" placeholder="真实姓名" v-model="user.real_name" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="sex">性别:</label>
        <el-input id="sex" style="width: 400px" placeholder="性别" v-model="user.sex" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="email">邮箱:</label>
        <el-input id="email" style="width: 400px" placeholder="邮箱" v-model="user.email" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="phone">电话号码:</label>
        <el-input id="phone" style="width: 400px" placeholder="电话号码" v-model="user.phone" prefix-icon="el-icon-lock"></el-input>
      </div>
      <div>
        <label for="mobile">移动电话:</label>
        <el-input id="mobile" style="width: 400px" placeholder="移动电话" v-model="user.mobile" prefix-icon="el-icon-lock"></el-input>
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
import profilePicture from "../profilePicture.vue";


export default {
  created() {
    var _this = this
    axios({
      method:"get",
      headers:{
        'Content-Type':'application/json',
      },
      url:"user/getUsername"
    }).then((res)=>{
      _this.user.username=res.data;
      _this.newUser.username=res.data.username;
    })
  },
  components: {profilePicture},
  data() {
    return {
      labelPosition: 'top',
      fileType:[".png",".jpg", ".bmp"],
      user:{
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
    //上传文件的事件
    uploadFile(item){
      this.$message('图片上传中........')
      //上传文件的需要formdata类型;所以要转
      let FormDatas = new FormData()
      FormDatas.append('file',item.file);
      console.log(item.file)
      this.$axios({
        method: 'post',
        url: '/file/fileUpload',
        headers:this.headers,
        timeout: 30000,
        data: FormDatas
      }).then(res=>{
        if(res.data.id != '' || res.data.id != null){
          this.fileList.push(item.file);//成功过后手动将文件添加到展示列表里
          let i = this.fileList.indexOf(item.file)
          this.fileList[i].id = res.data.id;//id也添加进去，最后整个大表单提交的时候需要的
          if(this.fileList.length > 0){//如果上传了附件就把校验规则给干掉
            this.fileflag = false;
            this.$set(this.rules.url,0,'')
          }
          this.handleSuccess();
        }
      })
    },
    handle_success(res){
      console.log(res)
      this.$message.success('文件上传成功')
    },
  }
}
</script>

<style>
.login_form{

  /*background-color: #e4ecf5;*/
}
.info{
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //height: 100vh;
}

</style>

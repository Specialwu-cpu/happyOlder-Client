<template>
  <div style="width: 190px;background-color: white;padding: 5px;margin: auto">
    <img src="../assets/1.jpg" width="150px" height="150px" style="border-radius: 300px;margin-left: 8%">
    <br>
    <br>
    <p style="margin:0 auto;text-align: center" v-model="user.username">{{user.username}}</p>
    <el-upload
      class="upload-demo"
      action="/api/test/file2"
      :http-request="uploadFile"
      :accept="fileType"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :on-success="handle_success"
      multiple
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button icon="el-icon-circle-plus-outline">上传头像</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'top',
      fileType:[".png",".jpg", ".bmp"],
    }
  },
  props:{
    user:'',
    usertype:""
  },
  methods:{
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

</style>

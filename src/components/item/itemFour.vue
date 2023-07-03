<template>
  <el-form class="form" ref="form" :model="form" label-width="50px">
    <el-form-item>
      {{msg.scenry}}
    </el-form-item>
    <el-form-item>
      <el-rate
        v-model="msg.value"
        :colors="colors">
      </el-rate>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
import bus from "./bus";

export default {
  mounted() {
    setInterval( () => {
      bus.$on('toBrother2',(data)=>{
        this.msg.scenry=data;
        }
      )
    },1000)
  },
  data(){
    return{
      name:[],
      acc:[],
      ppv:[],
      trp:[],
      f1:[],
      msg:{
        scenry:'',
        value:null,
      },
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  methods:{
    onSubmit(){
      var _this = this
        axios({
          method:"post",
          headers:{
            'Content-Type':'application/json',
          },
          data:JSON.stringify(this.msg),
          url:"http://127.0.0.1:8000/api/give_comment/"
        }).then((res)=>{
         if (res.data.Msg=='1')
         {
           this.$message({
                showClose: true,
                message: '评价成功！',
                type: 'success'
              });
         }
      })

    }
  }

}
</script>

<style>
.form{
  margin-top: 80px;
}
</style>

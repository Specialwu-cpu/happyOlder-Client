<template>
  <div>
    <div class="chart">
      <el-table
        :data="tableData"
        height="320"
        style="width: 100%">
        <el-table-column
          prop="ranking"
          label="排行"
          width="90">
        </el-table-column>
        <el-table-column
          prop="modname"
          label="模型"
          width="90">
        </el-table-column>
        <el-table-column
          prop="acc"
          label="准确率"
          width="90">
        </el-table-column>
        <el-table-column
          prop="handle"
          label="操作"
          width="120">
          <!--              @click="handleClick(scope.row)"-->
          <template slot-scope="scope">
            <el-button
              @click="opDia(scope.row)"
              type="text"
              size="small">
              保存
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--  对话框-->
    <el-dialog
      title="保存模型"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="saveFormRef" :model="saveForm" label-width="80px">
        <el-form-item  label="模型名称">
          <el-input  v-model="saveForm.modname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="自定义命名" v-model="saveForm.myName" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click=handleClick(saveForm.id,saveForm.modname,saveForm.myName,saveForm.paraId)>确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
import axios from "axios";
import bus from "./bus";
export default {
  props:['msg'],
  methods: {
    opDia(row){
      this.saveForm.modname=row.modname
      this.saveForm.ranking=row.ranking
      this.saveForm.id=row.id
      this.saveForm.paraId=row.paraId
      this.dialogVisible=true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    changeFather(paraId,modname,nickname){
      console.log(paraId)
      this.$emit("listenTochildEvent", {paraId,modname,nickname});
    },
    handleClick(paraId,modname,nickname,id) {
      console.log(paraId)
      this.$http.post("/user/save",{paraId,nickname}).then((res)=>{
        if (res.data==1){
          this.$message({
            showClose: true,
            message: '保存成功！',
            type: 'success'
          });
          this.changeFather(id,modname,nickname)
          this.dialogVisible=false
        } else if (res.data==0){
          this.$message({
            showClose: true,
            message: '此类模型不能保存！',
            type: 'warning'
          });
          this.dialogVisible=false
        }
      })
    }
  },
  created() {
    this.datas=this.msg
    console.log(this.datas)
    for (var i=0;i<this.datas.length;i++){
      if (this.datas.length>1){
        this.modname[i]=this.datas[i].modname
        this.acc[i]=this.datas[i].acc
        this.ppv[i]=this.datas[i].ppv
        this.trp[i]=this.datas[i].trp
        this.f1[i]=this.datas[i].f1
        this.ranking[i]=i+1
        this.id[i]=this.datas[i].id
        this.paraId1[i]=this.datas[i].paraId1
        this.tableData.push({ranking:this.ranking[i],modname:this.modname[i],acc:this.acc[i],id:this.id[i],paraId:this.paraId1[i]})
      }else
      {
        this.modname[i]=this.datas.modname
        this.acc[i]=this.datas.acc
        this.ppv[i]=this.datas.ppv
        this.trp[i]=this.datas.trp
        this.f1[i]=this.datas.f1
        this.ranking[i]=1
        this.id[i]=this.datas.id
        this.paraId1[i]=this.datas.paraId1
        this.tableData.push({ranking:this.ranking[i],modname:this.modname[i],acc:this.acc[i],id:this.id[i],paraId:this.paraId1[i]})
      }
    }
  },
  data(){
    return{
      datas:{'value1':this.msg},
      modname:[],
      acc:[],
      ppv:[],
      trp:[],
      f1:[],
      id:[],
      paraId1:[],
      tableData: [],
      value:[],
      ranking:[],
      saveForm:{
        modname:'用户',
        myName:'',
        ranking:0,
        id:0,
        paraId:0
      },
      dialogVisible: false
    }
  },
}
</script>

<style>
</style>

<template>
  <div>
    <div class="chart">
      <el-table
        :data="tableData"
        height="320"
        style="width: 100%">
        <el-table-column
          prop="bugtext"
          label="老人选择"
          width="200">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import bus from "./bus";
export default {
  props:['msg'],
  created() {
    console.log(this.datas)
    for (var i=0;i<this.datas.bugtext.length;i++){
      this.tableData.push({bugtext:this.datas.bugtext[i]})
    }
    console.log(this.tableData)
  },
  data(){
    return{
      datas:{'bugtext':this.msg},
      tableData:[]
    }
  }

}
</script>

<style>
</style>

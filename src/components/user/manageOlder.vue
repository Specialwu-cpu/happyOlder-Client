<template>
  <div style="background-color:  white">
  <el-table
    :data="tableData_rec"
    stripe
    style="width: 100%"
    :default-sort = "{prop: 'id', order: 'ascending'}"
    max-height="800px">
    <el-table-column
      prop="ID"
      label="编号"
      sortable
      width="80">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      sortable
      width="100">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      sortable
      width="170">
    </el-table-column>
    <el-table-column
      prop="shenFen"
      label="身份证号"
      width="170">
    </el-table-column>
    <el-table-column
      prop="age"
      label="生日"
      width="60">
    </el-table-column>
    <el-table-column
      prop="address"
      label="家庭住址"
      width="170">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="160">
      <template slot-scope="scope">
        <el-button
          @click="modifyOlder(scope.$index, tableData_rec)"
          type="text"
          size="small">
          修改
        </el-button>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData_rec)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-button @click="addRow" style="margin-top: 10px; background-color:  white">添加</el-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    addRow(){
      this.$router.push('/userCenter/modifyOlder');
    },
    modifyOlder(index, rows){
      let id = rows[index].ID
      this.$router.push({path:'/userCenter/modifyOlder', query: {id: id}})
    },
    deleteRow(index, rows) {
      let id = rows[index].id
      this.$http.post("/user/delTrain", {id}).then((res) => {
        this.tableData_rec.splice(index, 1)
      })
    },
  },
  created() {
    var _this = this
    axios({
      method:"get",
      headers:{
        'Content-Type':'application/json',
      },
      url:"http://43.143.150.4:8010/oldPerson/get_all"
    }).then((res)=>{
      _this.tableData_rec=res.data.data;
    })
  },
  data() {
    return {
      tableData_rec: [
  ],

    }
  },

}
</script>

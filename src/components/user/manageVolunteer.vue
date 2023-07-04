<template>
  <div style="background-color:  #e4ecf5">
  <el-table
    :data="tableData_rec"
    stripe
    style="width: 100%"
    :default-sort = "{prop: 'id', order: 'ascending'}"
    max-height="800px">
    <el-table-column
      prop="id"
      label="编号"
      sortable
      width="80">
    </el-table-column>
    <el-table-column
      prop="name"
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
      prop="birthDay"
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
          @click="modifyVolunteer"
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    modifyVolunteer(){
      this.$router.push({path:'/userCenter/modifyVolunteer', query: {id:"1"}})
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
    _this.tableData_rec = [{"id":1, "name":2, "age":3,"shenFen":3,"birthDay":1, "address":1},{"id":1, "name":2, "age":3,"shenFen":3,"birthDay":1, "address":1}]
    // axios({
    //   method:"get",
    //   headers:{
    //     'Content-Type':'application/json',
    //   },
    //   url:"/user/getTrain"
    // }).then((res)=>{
    //   _this.tableData_rec=res.data;
    // })
  },
  data() {
    return {
      tableData_rec: [

  ],

    }
  },

}
</script>

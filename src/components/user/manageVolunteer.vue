<template>
  <div style="background-color:  white">
  <el-table
    :data="volunteerInfo"
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
      prop="gender"
      label="性别"
      sortable
      width="80">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话号码"
      width="70">
    </el-table-column>
    <el-table-column
      prop="id_card"
      label="身份证号码"
      width="100">
    </el-table-column>
    <el-table-column
      prop="description"
      label="描述"
      width="180">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="160">
      <template slot-scope="scope">
        <el-button
          @click="modifyVolunteer(scope.$index, volunteerInfo)"
          type="text"
          size="small">
          修改
        </el-button>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, volunteerInfo)"
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
      this.$router.push('/userCenter/addVolunteer');
    },
    modifyVolunteer(index, rows){
      let id = rows[index].id
      this.$router.push({path:'/userCenter/modifyVolunteer', query: {id:id}})
    },
    deleteRow(index, rows) {
      let id = rows[index].id
      let url = "http://43.143.150.4:8010/volunteer/delete/"+id.toString()+'/'
      this.$http.delete(url).then((res) => {
        this.olderInfo.splice(index, 1)
        console.log(res)
        this.volunteerInfo.splice(index, 1)
      })
    },
  },
  created() {
    console.log(1)
    var _this = this
    axios({
      method:"get",
      headers:{
        'Content-Type':'application/json',
      },
      url:"http://43.143.150.4:8010/volunteer/get_all"
    }).then((res)=>{
      console.log(res)
      _this.volunteerInfo = res.data.data
    })
  },
  data() {
    return {
      volunteerInfo: [
  ],
    }
  },
}
</script>

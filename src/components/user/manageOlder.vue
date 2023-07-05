<template>
  <div style="background-color:  white">
  <el-table
    :data="olderInfo"
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
      prop="gender"
      label="性别"
      sortable
      width="80">
    </el-table-column>
    <el-table-column
      prop="room_number"
      label="房间号"
      width="70">
    </el-table-column>
    <el-table-column
      prop="birthday"
      label="生日"
      width="100">
    </el-table-column>
    <el-table-column
      prop="healthy_state"
      label="健康状况"
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
          @click="modifyOlder(scope.$index, olderInfo)"
          type="text"
          size="small">
          修改
        </el-button>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, olderInfo)"
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
      this.$router.push('/userCenter/addOlder');
    },
    modifyOlder(index, rows){
      let id = rows[index].ID
      this.$router.push({path:'/userCenter/modifyOlder', query: {id: id}})
    },
    deleteRow(index, rows) {
      let id = rows[index].ID
      let url = "http://43.143.150.4:8010/oldPerson/delete/"+id.toString()+'/'
      this.$http.delete(url).then((res) => {
        this.olderInfo.splice(index, 1)
        console.log(res)
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
      _this.olderInfo=res.data.data;
      for (var data in _this.olderInfo){
        if(_this.olderInfo[data]['birthday'] != null){
          _this.olderInfo[data]['birthday'] = _this.olderInfo[data]['birthday'].slice(0,10)
        }
      }
    })
  },
  data() {
    return {
      olderInfo: [
  ],

    }
  },

}
</script>

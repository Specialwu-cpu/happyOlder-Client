<template>
  <div>
    <div class="chart">
<!--      <el-table-->
<!--        :data="tableData"-->
<!--        height="320"-->
<!--        style="width: 100%">-->
<!--        <el-table-column-->
<!--          prop="bugtext"-->
<!--          label="老人选择"-->
<!--          width="200">-->
<!--        </el-table-column>-->
<!--      </el-table>-->
      <span v-for="item in message1">
        {{ item }}
        <el-divider></el-divider>
      </span>
    </div>
    <div style="bottom: 100px; position: absolute;">
      <el-input v-model="input" placeholder="请输入内容" style="width: 300px"></el-input>
      <el-button class="login_button" type="primary" @click="send1">发送</el-button> <br />
    </div>

  </div>
</template>

<script>
import axios from "axios";
import bus from "./bus";
import da from "element-ui/src/locale/lang/da";
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
      input:'',
      message1:['青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪','少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉'],
      datas:{'bugtext':this.msg},
      tableData:[]
    }
  },
  methods:{
    send1(){
      this.message1.push("用户:"+this.input)
      console.log(this.message1)
      const apiKey = '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';
      const apiUrl = 'https://api.openai.com/v1/chat/completions';

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      };
      const requestBody = {
        messages: [
          { role: 'user', content: this.input },
        ],
        model: 'gpt-3.5-turbo'
      };
      fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
      })
        .then(response => response.json())
        .then(data => {
          console.log("发送成功")
          console.log(data.choices)
          console.log(data.choices[0].message.content)
          this.message1.push("机器人助手:"+data.choices[0].message.content)
        })
        .catch(error => {
          // 处理错误
          console.log(error)
        });
      this.input=''
    }
  }
}
</script>

<style>
</style>

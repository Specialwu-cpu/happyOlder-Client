<template>
  <div id="zhu" ref="myChart">
  </div>

</template>

<script>
import * as echarts from "echarts";
import axios from "axios";

export default {
  data(){
    return{
      datas:[{
        name: '离职',
        type: 'line',
        stack: 'Total',
        data: []
    },
    {
      name: '入职',
        type: 'line',
        stack: 'Total',
        data: []
    }],
      times:0,
      chart:{}
    }
  },
  props:['msg'],
  methods:{
    async fetchData() {
      try {
        axios({
          method: "get",
          headers: {
            'Content-Type': 'application/json',
          },
          url: "http://43.143.150.4:8010/volunteer/get_number/"
        }).then(res => {
          let data = res.data
          for (let i = 0; i < data.response_data.length; i++) {
            let month = data.response_data[i].month
            this.datas[0].data[month - 1] = data.response_data[i].checkout_month
            this.datas[1].data[month - 1] = data.response_data[i].checkin_month
          }
          console.log(this.datas[0].data)
        })
        this.updateChart(); // 更新图表
      } catch (error) {
        console.error('请求错误:', error);
      }
    },
    updateChart(){
      let option = {
          title: {
            text: '职工统计表'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['离职', '入职']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ["1","2","3","4","5","6","7","8","9","10","11","12"]
          },
          yAxis: {
            type: 'value'
          },
          series: this.datas
      };
      //  绑定数据
      this.chart.setOption(option);
    },
  },
  mounted() {
    this.fetchData(); // 首次加载数据
    this.timer = setInterval(this.fetchData, 1000); // 定时器，每隔5秒请求数据更新图表
    this.chart = echarts.init(this.$refs.myChart);
  },
  beforeDestroy() {
    clearInterval(this.timer); // 组件销毁前清除定时器
  }
}
</script>

<style scoped>
#zhu{
  width: 700px;
  height: 780px;
}
</style>

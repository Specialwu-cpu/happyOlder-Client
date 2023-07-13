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
      datas:{'value1':this.msg},
      chart:{}
    }
  },
  props:['msg'],
  methods:{
    async fetchData() {
      try {
        // const response = await axios.get('YOUR_API_ENDPOINT'); // 发送异步请求
        // 更新图表数据
        this.datas=[100,90,80,100,90,80]
        this.updateChart(); // 更新图表
      } catch (error) {
        console.error('请求错误:', error);
      }
    },
    updateChart(){
      let option = {
        title: {
          text: '老人年龄统计表'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          show: true
        },
        grid: {
          left: '3%',
          right: '4%',
          // bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ["60岁以下","60-70","70-80","80-90","90-100","100岁以上"]
          // boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name:'人数',
            type: 'bar',
            data: this.datas
          },
        ]
      };
      //  绑定数据
      this.chart.setOption(option);
    },
  },
  created() {
      // this.datas=res.data;
      // this.datas.value1=this.msg
      this.datas=this.msg
      // for (var i=0;i<4;i++){
      //   this.modname[i]="2023-07-0"+i.toString()
      //   this.acc[i] = 0.1
      //   this.ppv[i] = 0.9
      //   this.trp[i] = 0.7
      //   this.f1[i] = 0.5
      // }
  },
  mounted() {
    this.fetchData(); // 首次加载数据
    this.timer = setInterval(this.fetchData, 500); // 定时器，每隔5秒请求数据更新图表
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

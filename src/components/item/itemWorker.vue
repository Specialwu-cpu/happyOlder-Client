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
      // datas:{'value1':this.msg},
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
        // const response = await axios.get('YOUR_API_ENDPOINT'); // 发送异步请求
        // 更新图表数据
        this.datas[0].data=[1,2,3,4,5,6,7,8,9,10,11,5];
        this.datas[1].data=[2,3,4,5,6,7,8,9,10,11,12,11];
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
            // {
            //   name: '离职',
            //   type: 'line',
            //   stack: 'Total',
            //   data: [120, 132, 101, 134, 90, 230, 210]
            // },
            // {
            //   name: '入职',
            //   type: 'line',
            //   stack: 'Total',
            //   data: [220, 182, 191, 234, 290, 330, 310]
            // }
      };
      //  绑定数据
      this.chart.setOption(option);
    },
  },
  // created() {
  //     this.datas=this.msg
  // },
  mounted() {
    this.fetchData(); // 首次加载数据
    this.timer = setInterval(this.fetchData, 5000); // 定时器，每隔5秒请求数据更新图表
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

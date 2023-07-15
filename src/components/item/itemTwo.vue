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
      modname:[],
      happy:[],
      interaction:[],
      unknow:[],
      fall:[],
      times:0,
      child:'child',
      chart:{}
    }
  },
  props:['msg'],
  methods:{
    async fetchData() {
      try {
        // const response = await axios.get('YOUR_API_ENDPOINT'); // 发送异步请求
        // 更新图表数据
        axios({
          method:"get",
          headers:{
            'Content-Type':'application/json',
          },
          url:"http://43.143.150.4:8010/event/get_number/"
        }).then(res => {
          console.log(res)
          this.modname = Object.keys(res.data);
          for(let i=0; i<this.modname.length; i++){
            this.happy.push(res.data[this.modname[i]]["老人笑了"])
            this.interaction.push(res.data[this.modname[i]]["义工交互"])
            this.fall.push(res.data[this.modname[i]]["摔倒"])
            this.unknow.push(res.data[this.modname[i]]["陌生人"])
          }
          console.log(this.happy)
        })
        // if(this.times<8){
        //   for (var i=0;i<6;i++){
        //     this.modname[i]="2023-07-0"+i.toString()
        //     this.happy[i]=this.happy[i]*0.9
        //     this.interaction[i]=this.interaction[i]*0.8
        //     this.unknow[i]=this.unknow[i]*0.7
        //     this.fall[i]=this.fall[i]*0.8
        //   }
        //   this.times++;
        // }else {
        //   for (var i=0;i<6;i++) {
        //     this.modname[i] = "2023-07-0" + i.toString()
        //     this.happy[i] = 0.1
        //     this.interaction[i] = 0.9
        //     this.unknow[i] = 0.7
        //     this.fall[i] = 0.5
        //   }
        //   this.times=0;
        // }
        this.updateChart(); // 更新图表
      } catch (error) {
        console.error('请求错误:', error);
      }
    },
    updateChart(){
      let option = {
        title: {
          text: '老人行为统计表'
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
          type: 'value',
          // boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: this.modname
        },
        series: [
          {
            name:'开心',
            type: 'bar',
            data: this.happy
          },
          {
            name:'义工交互',
            type: 'bar',
            data: this.interaction
          },
          {
            name:'陌生人闯入',
            type: 'bar',
            data: this.unknow
          },
          {
            name:'摔倒',
            type: 'bar',
            data: this.fall
          },
        ]
      };
      //  绑定数据
      this.chart.setOption(option);
    },
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

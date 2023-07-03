<template>
  <div echarts style="height: 570px; width: 100%;position: relative;" id="myechart" >
  </div>

</template>

<script>
import * as echarts from "echarts";
require('echarts/extension/bmap/bmap');
import loadBMap from "../../map";
import bus from "./bus";

export default {
  data(){
    return{
      datas:[],
      name:[],
      value:[],
      heat:[],
      color:[],
      date:{'value1':this.msg},

    }
  },
  props:['msg'],
  methods:{

  },

  created() {

    this.date.value1=this.msg

     this.$http.post('http://127.0.0.1:8000/api/home_view/',this.date).then((res)=>{
      this.datas=res.data;
      for (var i=0;i<this.datas.length;i++){
      this.name[i]=this.datas[i].name
        this.value[i]=this.datas[i].value
        this.heat[i]=this.datas[i].heat
        if (this.heat[i]<6000)
          this.color[i]='yellow'
        if (this.heat[i]>6000 &&this.heat[i]<12000)
          this.color[i] ='orange'
        if (this.heat[i]>12000 &&this.heat[i]<18000)
          this.color[i] ='776005FF'
        if (this.heat[i]>18000 &&this.heat[i]<24000)
          this.color[i] ='red'
        if (this.heat[i]>24000 &&this.heat[i]<30000)
          this.color[i] ='770505FF'
        if (this.heat[i]>30000) this.color[i] ='black'
      }
    });
  },
  mounted() {

    let dom = document.getElementById('myechart');
    let chart = echarts.init((dom));
    loadBMap("DvBqXAEPGjMDYpgqAZjQX7X21XXis3HE").then(()=>{
      let option={
        bmap:{
          center:[116.403694,39.912279],
          zoom:15,
          roam:'true',
          auto_resize:'false',
        },
        visualMap: {
        type: 'piecewise',
        top: '5%',
        splitNumber: 5,
        min: 0,
        max: 30000,
        seriesIndex: 0,
        calculable: true,
        inRange: {
            color: ['yellow', 'red']
        },
        textStyle: {
            color: 'black',
            formatter: 'aaaa{value}bbbb{value2}' // 范围标签显示内容。
        }

    },
      };
      chart.setOption(option);

      setInterval( () => {
        let serie=[]
      for(var i=0;i<this.datas.length;i++){
        serie.push({
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          data:[{
            name:this.name[i], //数据项的名字
            value:this.value[i],
            rippleEffect:{
              number:4,//波纹数量
              scale:8
            },
          }
          ],
          itemStyle:{
            color:this.color[i]
          }
        })
      }
      let option1={
        series: this.serie=serie
      };
      chart.setOption(option1)

        let remen=[]
        bus.$on('toBrother',(data=>{
          if(data!=remen){
          let option={
            bmap:{
            center:data,
            zoom:15,
            roam:'true',
            auto_resize:'false',
            // mapStyle: "midnight"
          }
          }
          chart.setOption(option)
            remen=data
          }

      }))
      },1000)

      chart.on("click",(params)=>{
        let option={
          bmap:{
            center:[params.value[0],params.value[1]],
            zoom:15,
            roam:'true',
            auto_resize:'false',
            // mapStyle: "midnight"
          }
        }
        console.log(params.name)
        chart.setOption(option)

        bus.$emit('toBrother2',params.name)

      })
    })


  }

}

</script>

<style scoped>
#myechart{
  width: 100%;
  height: 570px;
}
.map{
  width:100%;
  height: 800px;
}
</style>

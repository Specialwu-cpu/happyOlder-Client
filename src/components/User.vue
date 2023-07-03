<!--<template>-->
<!--  <div-->
<!--  class="body">-->
<!--    &lt;!&ndash; 顶部标题栏 &ndash;&gt;-->
<!--    <el-header height="80px">-->
<!--&lt;!&ndash;      <el-date-picker class="picker"&ndash;&gt;-->
<!--&lt;!&ndash;                      v-model="date"&ndash;&gt;-->
<!--&lt;!&ndash;                      type="date"&ndash;&gt;-->
<!--&lt;!&ndash;                      placeholder="选择日期"&ndash;&gt;-->
<!--&lt;!&ndash;                      format="yyyy 年 MM 月 dd 日"&ndash;&gt;-->
<!--&lt;!&ndash;                      value-format="yyyy-MM-dd">&ndash;&gt;-->
<!--&lt;!&ndash;      </el-date-picker>&ndash;&gt;-->
<!--      <span style="color: black; font-style:italic;font-family: 方正姚体 ;" class="title">节假日客流量预测与景点推荐系统</span>-->
<!--      <el-button @click="user" type="success" icon="el-icon-user" class="user" circle></el-button>-->
<!--      <el-button @click="out" type="danger" icon="el-icon-right" circle></el-button>-->
<!--    </el-header>-->

<!--    &lt;!&ndash; 中间容器 &ndash;&gt;-->
<!--    <section class="container">-->
<!--      <el-aside width="200px" class="aside"></el-aside>-->
<!--      &lt;!&ndash; 左容器 &ndash;&gt;-->
<!--      <section class="itemLeft">-->
<!--&lt;!&ndash;        <ItemPage>&ndash;&gt;-->
<!--&lt;!&ndash;          <itemOne :key="date" :msg="date"></itemOne>//折线：展示loss走向&ndash;&gt;-->
<!--&lt;!&ndash;        </ItemPage>&ndash;&gt;-->
<!--        <ItemPage >-->
<!--          <itemTwo :key="date" :msg="date"></itemTwo>-->
<!--        </ItemPage>-->
<!--      </section>-->
<!--      &lt;!&ndash; 中容器 &ndash;&gt;-->
<!--&lt;!&ndash;      <section class="itemCenter">&ndash;&gt;-->
<!--&lt;!&ndash;        <ItemPage>&ndash;&gt;-->
<!--&lt;!&ndash;          <itemMap :key="date" :msg="date"></itemMap>&ndash;&gt;-->
<!--&lt;!&ndash;        </ItemPage>&ndash;&gt;-->
<!--&lt;!&ndash;      </section>&ndash;&gt;-->
<!--      &lt;!&ndash; 右容器 &ndash;&gt;-->
<!--      <section class="itemRight">-->
<!--        <ItemPage>-->
<!--          <itemOne :key="date" :msg="date"></itemOne>-->
<!--        </ItemPage>-->
<!--&lt;!&ndash;        <ItemPage>&ndash;&gt;-->
<!--&lt;!&ndash;          <itemThree :key="date" :msg="date"></itemThree>&ndash;&gt;-->
<!--&lt;!&ndash;        </ItemPage>&ndash;&gt;-->
<!--        <ItemPage>-->
<!--          <itemFour />-->
<!--        </ItemPage>-->
<!--      </section>-->
<!--    </section>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// 导入插槽组件-->
<!--import ItemPage from "@/components/itemPage.vue";-->
<!--// 左右4个小组件的引用-->
<!--import itemOne from "@/components/item/itemOne.vue";-->
<!--import itemTwo from "@/components/item/itemTwo.vue";-->
<!--import itemThree from "@/components/item/itemThree.vue";-->
<!--import itemFour from "@/components/item/itemFour.vue";-->
<!--import itemMap from "@/components/item/itemMap";-->

<!--export default {-->
<!--  components: {-->
<!--    ItemPage,itemOne,itemTwo,itemThree,itemFour,itemMap-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      date: '2024-06-05',-->
<!--      child:'',-->
<!--    };-->
<!--  },-->
<!--  methods:{-->
<!--    user(){-->
<!--      this.$router.push("/userCenter");-->
<!--    },-->
<!--    out(){-->
<!--      this.$router.push("/login");-->
<!--    }-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style lang='less'>-->
<!--.body{-->
<!--  border-style:solid;-->
<!--  border-color: rgba(0, 0, 255, 0.99);-->
<!--}-->
<!--/* 中间容器 */-->
<!--.container {-->
<!--  // 最大最小的宽度-->
<!--  min-width: 1300px;-->
<!--  max-width: 2148px;-->
<!--  height: 672px;-->
<!--  margin: 0 auto;-->
<!--  // 盒子上10px 左右10px 下0的外边距-->
<!--  padding: 1px 1px 0;-->

<!--  display: flex; //父容器设置flex布局才能在子元素使用-->
<!--  // 设置左中右的占比 但是不要忘了在父容器要设置flex-->
<!--  .itemLeft,-->
<!--  .itemRight {-->
<!--    flex: 3;-->
<!--    background-color: white;    // 测试后注释掉-->
<!--  }-->
<!--  .itemCenter {-->
<!--    flex: 5;-->
<!--    height: 600px;-->
<!--    background-color: white;  // 测试后注释掉-->
<!--  }-->
<!--}-->
<!--.picker{-->
<!--  margin-top: 10px;-->
<!--  margin-right:300px;-->
<!--}-->
<!--.user{-->
<!--  margin-left:900px;-->
<!--}-->
<!--.title{-->
<!--  font-size: 26px;-->
<!--  margin-right: 430px;-->
<!--}-->
<!--.aside{-->
<!--  border-style:solid;-->
<!--  border-color: rgba(0, 0, 255, 0.99);-->
<!--}-->
<!--</style>-->


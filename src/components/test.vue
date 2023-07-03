<template>
  <div>    <navbar></navbar>

    <button @click="submitRating">提交评分</button>
  </div>
</template>
<script>
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  data(){

  },
  name: "test",
  methods: {
    submitRating() {
      console.log(localStorage.getItem("token"))
      const ratingData = {
        userId: "1",
        movieId: "2",
        rating: "1"
      };

      axios({
        method: "post",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token') // 将token添加到Authorization字段中
        },
        data: JSON.stringify(ratingData),
        url: "ratings/rate"
      })
        .then(response => {
          // 处理成功响应
          console.log(response.data);
        })
        .catch(error => {
          // 处理错误响应
          console.error(error);
        });
    }
  }
}
</script>

<style scoped>

</style>

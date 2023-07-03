<template>
  <div class="main">
    <navbar></navbar>
  <div class="add-data-page">
    <h2>新增类目</h2>
    <div class="form-group">
      <label for="category-name">类目名：</label>
      <input id="category-name" v-model="name" type="text" placeholder="请输入类目名" />
    </div>
    <button @click="addCategory">新增类目</button>

    <h2>新增电影</h2>
    <div class="form-group">
      <label for="movie-title">电影名：</label>
      <input id="movie-title" v-model="original_title" type="text" placeholder="请输入电影名" />
    </div>
    <div class="form-group">
      <label for="movie-runtime">电影时长：</label>
      <input id="movie-runtime" v-model="runtime" type="text" placeholder="请输入电影时长" />
    </div>
    <div class="form-group">
      <label for="movie-budget">预算：</label>
      <input id="movie-budget" v-model="budget" type="text" placeholder="请输入预算" />
    </div>
    <div class="form-group">
      <label for="movie-category">类目：</label>
      <input id="movie-budget" v-model="belongs_to_collection" type="text" placeholder="请输入类目" />
    </div>
    <div class="form-group">
      <label for="movie-poster">图片地址：</label>
      <input id="movie-poster" v-model="poster_path" type="text" placeholder="请输入图片地址" />
    </div>
    <button @click="addMovie">新增电影</button>
  </div>
    <Footer class="Footer"></Footer>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';
import Footer from "@/components/Footer.vue";

export default {
  data() {
    return {
      name: '',
      original_title: '',
      runtime: '',
      budget: '',
      belongs_to_collection: '',
      poster_path: '',
      categories: [],
    };
  },
  components: {
    Navbar,
    Footer,
  },
  mounted() {
  },
  methods: {
    addCategory() {
      // 新增类目

      const data={
        name:this.name
      }

      if(this.name=='')
      {
        this.$message({
          message: '请先输入内容',
          type: 'warning'
        })
      }
      else {
        axios({
          method: "post",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') // 将token添加到Authorization字段中
          },
          data: JSON.stringify(data),
          url: "/manage/addCollection"
        })
          .then(response => {
            // 处理成功响应
            this.name = '';
            console.log(response.data);
            if(response.data.code==1)
              this.$message({
                message: response.data.msg,
                type: 'success'
              });
            else
              this.$message({
                message: response.data.msg,
                type: 'error'
              });
          })
          .catch(error => {
            // 处理错误响应
            console.error(error);
          });
      }
    },
    addMovie() {
      // 新增电影
      const url = '/manage/addMovie'; // 请替换为实际的新增电影接口路径

      const data = {
        original_title: this.original_title,
        runtime: this.runtime,
        budget: this.budget,
        belongs_to_collection: this.belongs_to_collection,
        poster_path: this.poster_path,
      };

      if(this.original_title==''||this.runtime==''||this.budget==''||this.belongs_to_collection==''||this.poster_path=='')
      {
        this.$message({
          message: '请先输入内容',
          type: 'warning'
        })
      }
      else {
        axios({
          method: "post",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') // 将token添加到Authorization字段中
          },
          data: JSON.stringify(data),
          url: "/manage/addMovie"
        })
          .then(response => {
            // 处理成功响应
            this.original_title = '';
            this.runtime = '';
            this.budget = '';
            this.belongs_to_collection = '';
            this.poster_path = '';
            console.log(response.data);
            if(response.data.code==1)
              this.$message({
                message: response.data.msg,
                type: 'success'
              });
            else
              this.$message({
                message: response.data.msg,
                type: 'error'
              });
          })
          .catch(error => {
            // 处理错误响应
            console.error(error);
          });
      }
    },
  },
};
</script>

<style>
.add-data-page {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
}

.main{
  position: relative;
  min-height: 100vh;
}

.Footer{
  position: absolute;
  bottom: 0;
}
</style>

<template>
  <div class="main">
    <navbar></navbar>
      <h1 class="title">当前热门</h1>
      <div class="posters">
        <div v-for="movie in movies" :key="movie.id" class="poster" @click="showMovieDetails(movie.id)">
          <div class="poster-container">
            <img :src="getMoviePosterUrl(movie.poster_path)" alt="电影海报" />
              <el-progress class="progress" type="circle"   color="greenyellow" width="50"
                         define-back-color="white"  text-color="black" stroke-linecap="butt"
                         :percentage="movie.vote_average * 10"></el-progress>
          </div>
          <h2 class="title">{{ movie.title }}</h2>
        </div>
      </div>
    <div v-if="isLoggedIn">
    <h1 class="title">个性推荐</h1>
    <div class="posters">
      <div v-for="movie in movies2" :key="movie.id" class="poster" @click="showMovieDetails(movie.id)">
        <img :src="getMoviePosterUrl(movie.poster_path)" alt="电影海报" />
        <h2 class="title">{{ movie.title }}</h2>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';
import Footer from "@/components/Footer.vue";

export default {
  name: "home",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      isLoggedIn: false,
      storedUsername: '',
      searchType: 'name',
      movies: [],
      movies2: [],
      searchText: '',
      pageSize: 16, // 控制每页显示的电影数量
      result:[]
    };
  },
  mounted() {
    this.fetchMovies();
    this.isLoggedIn = localStorage.getItem('isLoggedIn');
    this.storedUsername = localStorage.getItem('account');
    this.recommend()

  },
  methods: {
    recommend() {
      if (localStorage.getItem('token')) {
        // 新增类目
        axios({
          method: "get",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') // 将token添加到Authorization字段中
          },
          url: "/algorithm/recommend"
        })
          .then(response => {
            // 处理成功响应
            console.log(response.data);
            if(response.data.code==1){
              this.$message({
                message: response.data.msg,
                type: 'success'
              });
              const movieIds = response.data.result.map(movie => movie.id);
      movieIds.forEach(movieId => {
                const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=c9f4be09eb3d3763851aa8b9016d55e6&language=zh-CN`;
                axios.get(apiUrl)
                  .then(response => {
                    // 处理获取到的电影数据
                    const movieData = response.data;
                    this.movies2.push(movieData);
                  })
                  .catch(error => {
                    console.error(error);
                  });
              });
            }
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
    showMovieDetails(movieId) {
      this.$router.push({ name: 'Detail', params: { id: movieId } });
    },
    fetchMovies() {
      const apiKey = 'c9f4be09eb3d3763851aa8b9016d55e6';
      const language = 'zh-CN'; // 设置语言为中文
      const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${this.currentPage}&language=${language}&region=US`;

      axios
        .get(apiUrl)
        .then((response) => {
          this.movies = response.data.results.slice(0, this.pageSize);
          this.totalMovies = response.data.total_results;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getMoviePosterUrl(posterPath) {
      const baseUrl = 'https://image.tmdb.org/t/p/';
      const posterSize = 'w500';

      return `${baseUrl}${posterSize}${posterPath}`;
    },
  },
};
</script>

<style scoped>
/deep/ .el-progress-circle__track {
  stroke: #EEEEEE;
}

.main{
  background-color: black;
}

.posters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.poster {
  margin: 10px;
  text-align: center;
}

.title{
  color: #c0ccda;
}

img {
  width: 200px;
  height: 300px;
}

.poster-container {
  position: relative;
  display: inline-block;
}

.progress {
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translate(0%, -10%);
}


</style>

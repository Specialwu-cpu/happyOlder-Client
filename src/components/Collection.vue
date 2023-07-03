<template>
  <div class="main">
    <navbar></navbar>
    <h1 class="title" >我的收藏</h1>

    <div v-if="movies.length === 0">
      <img src="../assets/noresult.png">
      <p class="title">暂无收藏</p>
    </div>

    <div v-else>
      <!-- 显示搜索结果 -->
      <div class="posters">
        <div v-for="movie in movies" :key="movie.id" class="poster" @click="showMovieDetails(movie.id)">
          <img :src="getMoviePosterUrl(movie.poster_path)"  />
          <h2 class="title">{{ movie.title }}</h2>
        </div>
      </div>
      <div class="pagination-container">
        <el-pagination class="pagination"
          @current-change="handlePageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="totalMovies"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </div>
    <Footer class="Footer"></Footer>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';
import Footer from "@/components/Footer.vue";

export default {
  name: "collection",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      movies: [],
      currentPage: 1,
      pageSize: 10, // 控制每页显示的电影数量
      totalMovies: 0,
      shouldExecuteUpdated: true,
    };
  },
  mounted() {
    this.storedUsername = localStorage.getItem('account');
    this.getListDetails()
  },
  methods: {
    showMovieDetails(movieId) {
      this.$router.push({name: 'Detail', params: {id: movieId}});
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.shouldExecuteUpdated = false;
      this.pagesearch();
    },
    getCollectionListIdByUserId(userId) {
      return localStorage.getItem(`user_${userId}_collectionListId`);
    },
    getListDetails() {
      const apiKey = 'c9f4be09eb3d3763851aa8b9016d55e6';
      const language = 'zh-CN';
      const apiUrl = `https://api.themoviedb.org/3/list/8255739?api_key=${apiKey}&page=${this.currentPage}&language=${language}`;

      axios
        .get(apiUrl)
        .then((response) => {
          this.movies = response.data.items.slice(0, this.pageSize);
          this.totalMovies = response.data.item_count;
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
  }
}
</script>

<style scoped>
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

img {
  width: 200px;
  height: 300px;
}

.main{
  position: relative;
    min-height: 100vh;
  background-color: black;
}

.Footer{
  position: absolute;
  bottom: 0;
}

.pagination{
  background-color: black  !important;
}

.title{
  color: #c0ccda;
}

</style>

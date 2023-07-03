<template>
  <div class="main">
    <navbar></navbar>
    <h1 v-if="this.searchType=='category'" class="title" :key="this.searchText">{{ genre.name }}</h1>
    <h1 v-if="this.searchType!='category'" class="title">搜索结果</h1>
    <div v-if="movies.length === 0">
      <img src="../assets/noresult.png">
      <p class="title">没有找到匹配的结果。</p>
    </div>

    <div v-else>
      <!-- 显示搜索结果 -->
      <div class="posters">
        <div v-for="movie in movies" :key="movie.id" class="poster" @click="showMovieDetails(movie.id)">
          <img :src="getMoviePosterUrl(movie.poster_path)"  @error="handleError" alt="电影海报" />
          <h2 class="title">{{ movie.title }}</h2>
        </div>
      </div>
      <div class="pagination-container">
        <el-pagination class="pagination" style="background-color: black !important;"
          @current-change="handlePageChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="totalMovies"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </div>
    <Footer class="footer"></Footer>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';
import Footer from "@/components/Footer.vue";

export default {
  name: "search",
  components: {
    Navbar,
    Footer
  },
  props:
    ['searchType', 'searchText'],
  data() {
    return {
      movies: [],
      genres: [],
      currentPage: 1,
      pageSize: 16, // 控制每页显示的电影数量
      totalMovies: 0,
      shouldExecuteUpdated: true,
      genre: {}
    };
  },
  mounted() {
    this.searchText = this.$route.params.searchText;
    this.searchType = this.$route.params.searchType;
    this.search()
    this.isLoggedIn = localStorage.getItem('isLoggedIn');
    this.getAllGenres()
    // location.reload()
  },
  updated() {
    // 在数据更新完成后执行的操作
    this.pagesearch()
    // this.getAllGenres()
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.searchText !== from.params.searchText || to.params.searchType !== from.params.searchType) {
      // 路由参数发生变化，执行刷新页面逻辑
      // location.reload()
      this.currentPage= 1;
    }
    next();
  },
  methods: {
    getAllGenres() {
      // 使用TMDB的Genre API获取体裁列表数据

      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=c9f4be09eb3d3763851aa8b9016d55e6&language=zh-CN`;

      axios.get(url)
        .then(response => {
          this.genres = response.data.genres;
          const matchedGenre = this.genres.find(genre => genre.id === this.searchText);
          if (matchedGenre) {
            this.genre = matchedGenre;
          }        })
        .catch(error => {
          console.log(error);

        });
    },
    handleError() {
      // 当图片加载失败时执行的逻辑
      // 设置默认图片或其他处理
      this.poster_path = "../assets/noposter.png";
    },
    showMovieDetails(movieId) {
      this.$router.push({ name: 'Detail', params: { id: movieId } });
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.shouldExecuteUpdated = false;
      this.pagesearch();
    },
    pagesearch() {
      // 根据搜索类型进行不同的 API 请求
      if (this.searchType === 'name') {
        this.searchByName();
      } else if (this.searchType === 'category') {
        this.searchByCategory();
      } else if (this.searchType === 'id') {
        this.searchById();
      }
    },
    search() {
      // 根据搜索类型进行不同的 API 请求
      if (this.searchType === 'name') {
        this.currentPage= 1;
        this.searchByName();
      } else if (this.searchType === 'category') {
        this.currentPage= 1;
        this.searchByCategory();
      } else if (this.searchType === 'id') {
        this.currentPage= 1;
        this.searchById();
      }
      else if (this.searchType === 'keywords') {
        this.currentPage= 1;
        this.searchByKeywords();
      }
    },
    searchByName() {
      const apiKey = 'c9f4be09eb3d3763851aa8b9016d55e6';
      const language = 'zh-CN';
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${this.searchText}&page=${this.currentPage}&language=${language}&region=US`;

      axios
        .get(apiUrl)
        .then((response) => {
          this.movies = response.data.results.slice(0, this.pageSize);
          this.totalMovies = response.data.total_results/2;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    searchByCategory() {
      const apiKey = 'c9f4be09eb3d3763851aa8b9016d55e6';
      const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${this.searchText}&page=${this.currentPage}&language=zh-CN&region=US`;

      axios
        .get(apiUrl)
        .then((response) => {
          this.movies = response.data.results.slice(0, this.pageSize);
          this.totalMovies = response.data.total_results/2;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    searchById() {
      const apiKey = 'c9f4be09eb3d3763851aa8b9016d55e6';
      const apiUrl = `https://api.themoviedb.org/3/movie/${this.searchText}?api_key=${apiKey}&language=zh-CN&region=US`;

      axios
        .get(apiUrl)
        .then((response) => {
          this.movies = [response.data];
          this.totalMovies = 1;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    searchByKeywords() {
      const searchText =
        {
          keywords:this.searchText
        }
      axios({
        method: "post",
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ' + localStorage.getItem('token') // 将token添加到Authorization字段中
        },
        data:JSON.stringify(searchText),
        url: "/movie/queryByMovieKeywords"
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
                  this.movies.push(movieData);
                  this.totalMovies = response.data.total_results;
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
.main{
  position: relative;
  min-height: 100vh;
  background-color: black;
}

.Footer{
  position: absolute;
  bottom: 0;
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

img {
  width: 200px;
  height: 300px;
}

.title{
  color: #c0ccda;
}
</style>

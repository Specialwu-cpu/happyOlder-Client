<template>
  <div >
    <navbar></navbar>
    <div class="main">
    <el-container class="movie-details" :style="{ backgroundImage:  'url(' + getBackgroundImageUrl(movie.backdrop_path) + ')' }">
    <div class="overlay" :style="{ backgroundColor: dominantColor }"></div>
    <el-row>
      <el-col :span="6">
        <img :src="getMoviePosterUrl(movie.poster_path)" alt="Movie Poster" class="poster-image">
      </el-col>
      <el-col :span="16">
        <h1 class="title">{{ movie.title }}</h1>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12">
            <el-row class="detail-row">
              <el-col :span="8" class="label">原始标题:</el-col>
              <el-col :span="16">{{ movie.original_title }}</el-col>
            </el-row>
            <el-row class="detail-row">
              <el-col :span="8" class="label">评分:</el-col>
              <el-col :span="16">{{ movie.vote_average }}</el-col>
            </el-row>
            <el-row class="detail-row">
              <el-col :span="8" class="label">投票人数:</el-col>
              <el-col :span="16">{{ movie.vote_count }}</el-col>
            </el-row>
            <el-row class="detail-row">
              <el-col :span="8" class="label">类型:</el-col>
              <el-col :span="16">
                  <el-tag v-for="genre in movie.genres" :key="genre.id" class="genre-tag" @click="genreSearch(genre.id)">{{ genre.name }}</el-tag>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row class="detail-row">
              <el-col :span="8" class="label">时长:</el-col>
              <el-col :span="16">{{ movie.runtime }}分钟</el-col>
            </el-row>
            <el-row class="detail-row">
              <el-col :span="8" class="label">预算:</el-col>
              <el-col :span="16">{{ movie.budget }}美元</el-col>
            </el-row>
            <el-row class="detail-row">
              <el-col :span="8" class="label">收入:</el-col>
              <el-col :span="16">{{ movie.revenue }}美元</el-col>
            </el-row>
            <el-row class="detail-row">
              <el-col :span="8" class="label">上映日期:</el-col>
              <el-col :span="16">{{ movie.release_date }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <p class="overview">{{ movie.overview }}</p>
        <el-divider></el-divider>

        <div>
        <el-rate v-model="rating" :max="5" :allow-half="true" ></el-rate>
<!--        <button @click="submitRating">提交评分</button>-->
          <el-button type="primary" plain  @click="submitRating" style="margin-top: 10px">提交评分</el-button>
        </div>
        <el-divider></el-divider>

        <div>
          <el-button v-if="showAddButton" type="primary"  @click="addMovieToList" >收藏</el-button>
          <el-button v-if="showRemoveButton" type="danger" @click="removeMovieFromList">取消收藏</el-button>
        </div>
      </el-col>
    </el-row>
  </el-container>
    </div>
    <Footer class="Footer"></Footer>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';
import Footer from "@/components/Footer.vue";

export default {
  name: 'MovieDetails',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      movie: {},
      dominantColor: '',
      rating: 0,
      isMovieInList: false,
    };
  },
  computed: {
    showAddButton() {
      return !this.isMovieInList;
    },
    showRemoveButton() {
      return this.isMovieInList;
    },
  },
  mounted() {
    const movieId = this.$route.params.id;
    this.fetchMovieDetails(movieId);
    this.extractDominantColor(); // 提取主要颜色
    this.checkMovieInList(movieId)
      .then(result => {
        this.isMovieInList = result;
      });
  },
  methods: {
    checkMovieInList(movieId) {
      const apiKey = 'c9f4be09eb3d3763851aa8b9016d55e6';
      const listId = '8255739';
      const apiUrl = `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`;

      return axios.get(apiUrl)
        .then(response => {
          const movieItems = response.data.items;
          return movieItems.some(item => item.id === movieId);
        })
        .catch(error => {
          console.error(error);
          return false;
        });
    },
    addMovieToList() {
      const movieId = this.$route.params.id;
      const apiKey = 'c9f4be09eb3d3763851aa8b9016d55e6';
      const listId = '8255739';
      const sessionId = '17b2f1b5bcaacf5d7b1bf6cadccb39527b67708e';
      const apiUrl = `https://api.themoviedb.org/3/list/${listId}/add_item?api_key=${apiKey}&session_id=${sessionId}`;

      return axios.post(apiUrl, { media_id: movieId })
        .then(response => {
          this.$message({
            message: '收藏成功',
            type: 'success'
          });
          this.isMovieInList = true;
          return response.data.status_code === 1; // 添加成功的状态码为1
        })
        .catch(error => {
          console.error(error);
          return false;
        });

    },
    removeMovieFromList() {
      const movieId = this.$route.params.id;
      const apiKey = 'c9f4be09eb3d3763851aa8b9016d55e6';
      const listId = '8255739';
      const sessionId = '17b2f1b5bcaacf5d7b1bf6cadccb39527b67708e';
      const apiUrl = `https://api.themoviedb.org/3/list/${listId}/remove_item?api_key=${apiKey}&session_id=${sessionId}`;

      return axios.post(apiUrl, { media_id: movieId })
        .then(response => {
          this.$message({
            message: '取消收藏',
            type: 'success'
          });
          this.isMovieInList = false;
          return response.data.status_code === 1; // 移除成功的状态码为1
        })
        .catch(error => {
          console.error(error);
          return false;
        });


    },
    genreSearch(genreId){
      this.$router.push({ name: 'search', params: { searchText: genreId, searchType: "category" } });
    },
    submitRating() {
      console.log(localStorage.getItem("token"))
      const token=localStorage.getItem("token")
      const ratingData = {
        userId: "1",
        movieId: this.$route.params.id,
        rating: this.rating
      };

      if(token!=null&& ratingData.rating!=0) {
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
        this.$message({
          message: '评分成功',
          type: 'success'
        });      }
      else if(ratingData.rating==0)
        this.$message({
          message: '请先评分',
          type: 'warning'
        });
      else
        this.$message({
          message: '请先登录',
          type: 'warning'
        });
    },

    fetchMovieDetails(movieId) {
      const apiKey = 'c9f4be09eb3d3763851aa8b9016d55e6';
      const language = 'zh-CN';
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`;

      axios.get(apiUrl)
        .then(response => {
          this.movie = response.data;
          this.extractDominantColor();// 提取主要颜色
        })
        .catch(error => {
          console.error(error);
        });
    },
    getMoviePosterUrl(posterPath) {
      const baseUrl = 'https://image.tmdb.org/t/p/';
      const posterSize = 'w500';

      return `${baseUrl}${posterSize}${posterPath}`;
    },
    getBackgroundImageUrl(backdrop_path){
      const baseUrl = 'https://image.tmdb.org/t/p/';
      const posterSize = 'original';

      return `${baseUrl}${posterSize}${backdrop_path}`;
    },
    //提取背景图主色调
    extractDominantColor() {
      const image = new Image();
      image.crossOrigin = 'Anonymous';

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let r = 0, g = 0, b = 0;
        let totalPixels = 0;

        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          totalPixels++;
        }

        r = Math.floor(r / totalPixels);
        g = Math.floor(g / totalPixels);
        b = Math.floor(b / totalPixels);

        this.dominantColor = `rgba(${r}, ${g}, ${b},0.7)`;
      };

      image.src = this.getBackgroundImageUrl(this.movie.backdrop_path);
    },
  }
};
</script>

<style scoped>
.movie-details {
  position: relative;
  min-height: 90vh;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.overlay {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
}

.poster-image {
  width: 100%;
  height: auto;
}

.title {
  font-size: 24px;
  margin-top: 0;
  color: #fff;
}

.detail-row {
  margin-bottom: 10px;
  color: #fff;
}

.label {
  font-weight: bold;
  color: #fff;
}

.genre-tag {
  margin-right: 5px;
  margin-bottom: 5px;
  background-color: #8cc5ff;
  color: #fff;
}

.genre-tag:hover {
  background-color: #f5f5f5;
  color: #333;
}
.overview {
  font-size: 16px;
  margin-top: 10px;
  line-height: 1.5;
  color: #fff;
}

.main{
  position: relative;
  /*min-height: 100vh;*/
  background-color: black;
}

.Footer{
  position: absolute;
  bottom: 0;
}

</style>

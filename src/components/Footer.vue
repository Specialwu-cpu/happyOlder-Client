<template>
    <div class="footer">
      <div class="genres-wrapper">
        <p v-for="genre in genres" :key="genre.id" @click="searchByGenre(genre.id)" class="genre">{{ genre.name }}</p>
        <p class="ban">
          ©Copyright 2023 阐释你的梦电影公司版权所有 | 提瓦特ICP备12438170号-4
        </p>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      genres: []  // 保存体裁列表的数据
    };
  },
  mounted() {
    this.getAllGenres();
  },
  methods: {
    getAllGenres() {
      // 使用TMDB的Genre API获取体裁列表数据

      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=c9f4be09eb3d3763851aa8b9016d55e6&language=zh-CN`;

      axios.get(url)
        .then(response => {
          this.genres = response.data.genres;
        })
        .catch(error => {
          console.log(error);

        });
    },
    searchByGenre(genreId) {
      // 根据选定的体裁进行搜索，具体逻辑根据您的需求来实现
      this.$router.push({ name: 'search', params: { searchText: genreId, searchType: "category" } });
    }
  }
};
</script>

<style scoped>

.footer{
  height: 120px;
  background-color: rgb(36, 36, 36);
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中对齐 */
  align-items: center;
  color: white;
}

.genres-wrapper {
  display: flex;
  justify-content: center; /* 水平居中对齐 */
}

.genres-wrapper p {
  margin: 0 10px; /* 可根据需要调整水平间距 */
}

.genre {
  /* 添加 hover 效果 */
  cursor: pointer;
}

.genre:hover {
  color: lightblue; /* 设置浅蓝色 */
}

.ban{
  position: absolute; /* 子元素设置为绝对定位 */
  transform: translate(-0%, 150%); /* 将子元素居中对齐 */
  color: #c0ccda;
}
</style>


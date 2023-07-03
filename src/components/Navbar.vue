<template>
  <div>
    <el-header class="navbar">
      <div class="navbar-container">
        <div class="logo" @click="goHome">
          <img src="../assets/logo.png" alt="Logo" style="width: 35px;height: 35px" />
        </div>
        <div class="search-container">
          <el-input
            class="search-input"
            v-model="searchText"
            placeholder="搜索"
            @keyup.enter="search"
          >
            <el-select
              class="search-select"
              v-model="searchType"
              slot="prepend"
            >
              <el-option label="名称" value="name"></el-option>
              <el-option label="ID" value="id"></el-option>
              <el-option label="关键词" value="keywords"></el-option>

            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <template v-if="isLoggedIn">
              <img src="../assets/user1.png" style="width: 35px;height: 35px">
            </template>
            <template v-else>
              <img src="../assets/user2.png" style="width: 35px;height: 35px">
            </template>
          </span>
          <el-dropdown-menu slot="dropdown">
            <template v-if="isLoggedIn">
              <!-- 已登录时显示的下拉框内容 -->
              <el-dropdown-item >欢迎,{{storedUsername}}</el-dropdown-item>
              <el-dropdown-item @click.native="collection">我的收藏</el-dropdown-item>
              <el-dropdown-item @click.native="additem">新增内容</el-dropdown-item>
              <el-dropdown-item @click.native="logOut" divided>退出</el-dropdown-item>
            </template>
            <template v-else>
              <!-- 未登录时显示的下拉框内容 -->
              <el-dropdown-item @click.native="logIn">登录</el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn: false,
      storedUsername: '',
      searchType: 'name',
      searchText: '',
    };
  },
  mounted() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn');
    this.storedUsername = localStorage.getItem('account');
  },
  methods: {
    additem(){
      this.$router.push('/additem');
    },
    collection() {
      // 处理收藏功能
      this.$router.push('/collection');
    },
    logIn() {
      this.$router.push('/login');
    },
    logOut() {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
      this.isLoggedIn = false;
      this.$message('退出成功');
    },
    goHome() {
      this.$router.push('/');
    },
    search() {
      // 处理搜索功能
      this.$router.push({ name: 'search', params: { searchText: this.searchText, searchType: this.searchType } });
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: rgb(36, 36, 36);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.logo {
  cursor: pointer;
}

.search-container {
  flex-grow: 1;
  margin-left: 20px;
}

.search-input {
  width: 600px;
}

.search-select {
  width: 90px;
}
</style>

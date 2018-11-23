<template>
  <div class="home">
    <h1>Chwilio!</h1>
    <el-input placeholder="Please input" v-model="searchText"></el-input>
    <el-button icon="el-icon-search"></el-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      searchText: '',
    }
  }
}
</script>

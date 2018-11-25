<template>
  <div class="header">
    <div class="nav-buttons">
      <el-button type="primary" round><router-link :to="{name: 'home'}">Home</router-link></el-button>
      <el-button type="primary" round><router-link :to="{name: 'about'}">About</router-link></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top-bar',
}
</script>

<style scoped>
a {
  text-decoration: none;
}

.nav-buttons {
  text-align: right;
}
</style>
<template>
  <div id="app">
    <router-link :to="{name: 'home'}" id="home">Home</router-link>
    <router-link :to="{name: 'about'}" id="about">About</router-link>
    <div class="header">
    <h1 class="center">Chwilio!</h1>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#home {
  float: left;
}

#about {
  float: right;
}

.header {
  display: flex;
  justify-content: center;
}
.center {
  font-size: 5em;
  margin-top: 10%;
  margin-bottom: -5px;
  width: 800px;
}

</style>

<template>
  <div class="header">
      <div class="center">
        <img :src="imgSrc"/>
      </div>
      <search-bar @search="onSearch" :searchText.sync="searchText"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'home',
  components: {
    SearchBar,
  },
  data() {
      return {
          data: [],
          searchText: '',
          imgSrc: '',
      };
  },
  methods: {
    onSearch(searchText) {
      this.searchText = searchText;
      this.$router.push({ name: 'searchResults', params: { query: this.searchText }});
    },
  },
  created(){
      this.imgSrc = require('../assets/logo.png');
    }
}
</script>

<style scoped>
.center {
  font-size: 5em;
  text-align: center;
  margin-top: 10%;
  margin-bottom: -5px;
}
</style>


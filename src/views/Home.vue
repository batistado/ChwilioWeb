<template>
  <div class="header">
      <h1 class="center">Chwilio!</h1>
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
      };
  },
  methods: {
    onSearch(searchText) {
      this.searchText = searchText;
      this.$router.push({ name: 'searchResults', params: { query: this.searchText }});
    }
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


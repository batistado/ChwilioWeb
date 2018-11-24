<template>
  <div class="home">
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

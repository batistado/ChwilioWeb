<template>
  <div class="home">
    <search-bar @search="onSearch"/>
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
  methods: {
    onSearch(searchText) {
      this.$router.push({ name: 'searchResults', params: { query: searchText }});
    }
  }
}
</script>

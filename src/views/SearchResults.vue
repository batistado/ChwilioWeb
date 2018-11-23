<template>
  <div class="search-results">
    <search-bar @search="onSearch"/>
    Search Results:
    <el-card shadow="always" v-for="tweet in data" :key="tweet.id">
      ID: {{tweet.id}}
      Text: {{tweet.text}}
    </el-card>
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
      };
  },
  methods: {
    loadData(searchQuery) {
      this.$axios.get('tweets/all?query='+searchQuery)
      .then((response) => {
        this.data = response.data;
      })
      .catch(error => console.log(error));
    },

    onSearch(searchText) {
      this.loadData(searchText);
    }
  },
  created() {
    this.loadData(this.$route.params.query);
  }
}
</script>
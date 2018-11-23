<template>
  <div class="search-results">
    <search-bar @search="onSearch" :searchText.sync="searchText"/>
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
          searchText: '',
      };
  },
  methods: {
    loadData() {
      this.$axios.get('tweets/all?query='+this.searchText)
      .then((response) => {
        this.data = response.data;
      })
      .catch(error => console.log(error));
    },

    onSearch(searchText) {
      this.searchText = searchText
      this.loadData();
    }
  },
  created() {
    this.searchText = this.$route.params.query;
    this.loadData();
  }
}
</script>
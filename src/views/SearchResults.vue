<template>
  <div>
    <div class="nav-bar">
      <h1 class="header-text">Chwilio!</h1>
      <div class="search-bar">
        <search-bar @search="onSearch" :searchText.sync="searchText"/>
      </div>
    </div>
    <div class="search-results">
    Search Results:
    <tweet-card v-for="tweet in data" :key="tweet.id" :tweetData="tweet"></tweet-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue'
import TopBar from '@/components/TopBar.vue'
import TweetCard from '@/components/TweetCard.vue'

export default {
  name: 'home',
  components: {
    SearchBar,
    TopBar,
    TweetCard
  },
  data() {
      return {
          data: [],
          searchText: '',
      };
  },
  methods: {
    loadData() {
      this.$axios.get('tweets/all?query='+this.searchText+'&page=1')
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

<style scoped>
.nav-bar {
  display: flex;
  justify-content: flex-start;
}

.header-text {
  margin-top: -40px;
  margin-right: 10px;
}

.search-bar {
  margin-top: -20px;
  max-height: 60px;
}
</style>

<template>
  <div>
    <div class="nav-bar">
      <h1 class="header-text">Chwilio!</h1>
      <div class="search-bar">
        <search-bar @search="onSearch" :searchText.sync="searchText"/>
      </div>
    </div>
    <div class="search-wrapper">
      <div class="search-filters">
        <search-filter @langChanged="langChanged" :filters="this.filters" @cityChanged="cityChanged" @daysChanged="daysChanged"/>
      </div>
      <div class="search-results" v-loading="loading" element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading">
        Search Results:
        <template v-if="data.length > 0"> 
          <tweet-card v-for="tweet in data" :key="tweet.id" :tweetData="tweet"></tweet-card>
        </template>
        <el-card shadow="always" v-else>
          No results found :|
        </el-card>
      </div>
      <div class="trending-hashtags">
        <trending-hashtags :filters="this.filters" @hashtagSelected="hashtagSelected"/>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalTweets"
      @current-change="changeCurrPage">
    </el-pagination>
  </div>
</template>

<script>
import { Loading } from 'element-ui';
// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue'
import TopBar from '@/components/TopBar.vue'
import TweetCard from '@/components/TweetCard.vue'
import SearchFilter from '@/components/SearchFilter.vue'
import TrendingHashtags from '@/components/TrendingHashtags.vue'

export default {
  name: 'home',
  components: {
    SearchBar,
    TopBar,
    TweetCard,
    SearchFilter,
    TrendingHashtags
  },
  data() {
      return {
          data: [],
          loading: false,
          searchText: '',
          currPage: 1,
          totalTweets: 0,
          filters: {
            langs: ["en", "es", "hi", "fr", "th"],
            cities: ["nyc", "delhi", "mexico city", "bangkok", "paris"],
            date: ["100"],
          }
      };
  },
  methods: {
    langChanged(newLangs){
      this.filters.langs = newLangs;
      this.loadData();
    },
    hashtagSelected(selectedHashtag) {
      this.searchText = selectedHashtag;
      this.loadData();
    },
    daysChanged(newDays){
      this.filters.date = [newDays];
      this.loadData();
    },
    cityChanged(newCities){
      this.filters.cities = newCities;
      this.loadData();
    },
    changeCurrPage(newPage){
      this.currPage = newPage;
      this.loadData();
    },
    loadData() {
      this.loading = true;
      this.$axios.post('tweets/all?query='+this.searchText+'&page=' + this.currPage, this.filters)
      .then((response) => {
        this.data = response.data.tweets;
        this.totalTweets = response.data.numberOfTweets;
      })
      .catch(error => console.log(error));
      this.loading = false;
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

.search-wrapper {
  display: flex;
  justify-content: space-evenly;
}

.search-filters {
  width: 200px;
}

.trending-hashtags {
  margin-top: 12px;
}

.search-results {
  width: 800px;
}
</style>

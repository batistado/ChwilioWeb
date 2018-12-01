<template>
<div class="trending-hashtags">
    <el-card shadow="always">
        <div><b><font-awesome-icon icon="fire" :style="{ color: 'red', margin: '2px' }"/>Trending hashtags</b></div>
        <div class="trending-list">
            <div v-for="hashtag in this.cleanedHashtags" :key="hashtag" class="hashtags">
                <el-button plain size="mini" @click="onClick"><font-awesome-icon icon="bolt" :style="{ color: '#3F9EFF', margin: '2px' }"/>{{hashtag}}</el-button>
            </div>
        </div>
    </el-card>
</div>
</template>

<script>
export default {
  name: 'trending-hashtags',
  props: {
    filters: {
        type: Object,
        required: true,
    },
  },
  data() {
      return {
          data: [],
      }
  },
  watch: {
      filters: {
      deep: true,
      handler(newValue, oldValue) {
          this.loadData();
      }
    }
  },
  computed: {
      cleanedHashtags() {
          return Array.from(new Set(this.data.map(o => typeof o === 'string' ? o.toLowerCase() : o)));
      }
  },
  methods: {
      loadData() {
        this.loading = true;
        this.$axios.post('tweets/trending', this.filters)
        .then((response) => {
            this.data = response.data.trendingHashtags;
        })
        .catch(error => console.log(error));
        this.loading = false;
    },
    onClick(event){
        this.$emit('hashtagSelected', event.target.textContent);
    }
  },
  created(){
      this.loadData();
  }
}
</script>

<style scoped>
.hashtags {
    margin: 2px;
}
</style>
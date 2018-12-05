<template>
  <div class="analytics">
    <el-card shadow="always">
      <h1>Trending Hashtags:</h1>
      <word-cloud/>
    </el-card>
    <el-card>
      <bar-chart/>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
import BarChart from '@/components/BarChart.vue'
import WordCloud from '@/components/WordCloud.vue'

export default {
  name: 'analytics',
  components: {
    BarChart,
    WordCloud
  },
}
</script>

<style scoped>
.analytics {
  margin: 5px;
}
</style>


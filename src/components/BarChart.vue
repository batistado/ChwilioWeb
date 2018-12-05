<template>
<div class="charts">
    <div class="city-select">
    City: 
    <el-select :value="this.selectedCity" size="mini" @change="changedCity">
        <el-option
        v-for="item in this.cityOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>
    </div>
    <el-card shadow="always">
        <column-chart :data="cityData" title="Trending topics"></column-chart>
    </el-card>
    <el-card shadow="always">
        <pie-chart :data="sentimentData" title="Sentiment Analysis"></pie-chart>
    </el-card>
    <el-card shadow="always">
        <line-chart :data="timeSeriesData" title="Time Series" :max="600" height="700px"></line-chart>
    </el-card>
</div>
</template>

<script>

export default {
  name: 'bar-chart',
  data() {
    return {
        data: {
            city: {},
            sentiment: {},
            timestamp: {},
        },
        selectedCity: 'nyc',
        cityOptions: [{
              value: 'nyc',
              label: 'New York City'
          },
          {
              value: 'mexico city',
              label: 'Mexico City'
          },
          {
              value: 'delhi',
              label: 'Delhi'
          },{
              value: 'paris',
              label: 'Paris'
          },
          {
              value: 'bangkok',
              label: 'Bangkok'
          }],
    }  
  },
  computed: {
      cityData() {
          return this.data.city[this.selectedCity];
      },
      sentimentData() {
          return this.data.sentiment[this.selectedCity];
      },
      timeSeriesData() {
          return this.data.timestamp[this.selectedCity];
      }
  },
  methods: {
      changedCity(newCity){
          this.selectedCity = newCity;
      },
      loadData() {
      this.loading = true;
      this.$axios.post('tweets/analytics', {'city': this.cityOptions.map(o => o.value)})
      .then((response) => {
        this.data = response.data;
      })
      .catch(error => { console.log(error); this.loading = false; });
    },
  },
  created(){
      this.loadData();
  }
}
</script>

<style scoped>
.city-select {
    margin: 10px;
}
</style>
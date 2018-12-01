<template>
<div class="search-filter">
    <el-collapse>
        <el-collapse-item title="Filter by language" name="1">
            <el-card shadow="always">
                <div><b>Languages:</b>
                    <el-checkbox-group 
                        v-model="selectedLangs"
                        :min="1"
                        @change="langChanged">
                        <div v-for="lang in langOptions" :key="lang.value">
                            <el-checkbox :label="lang.value" :key="lang.value">{{lang.label}}</el-checkbox>
                        </div>
                    </el-checkbox-group>
                </div>
            </el-card>
        </el-collapse-item>
        <el-collapse-item title="Filter by location" name="2">
            <el-card shadow="always">
                <div><b>Cities:</b>
                    <el-checkbox-group 
                        v-model="selectedCities"
                        :min="1"
                        @change="cityChanged">
                        <div v-for="city in cityOptions" :key="city.value">
                            <el-checkbox :label="city.value" :key="city.value">{{city.label}}</el-checkbox>
                        </div>
                    </el-checkbox-group>
                </div>
            </el-card>
        </el-collapse-item>
        <el-collapse-item title="Filter by history" name="3">
            <el-card shadow="always">
                <div><div class="history-label"><b>History (in days):</b></div>
                    <el-slider
                        v-model="prevDays"
                        :min="15"
                        vertical
                        @change="daysChanged"
                        height="300px">
                    </el-slider>
                </div>
            </el-card>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
export default {
  name: 'search-filter',
  props: {
    filters: {
        type: Object,
        required: true,
    },
  },
  data() {
      return {
          langOptions: [{
              value: 'en',
              label: 'English'
          },
          {
              value: 'th',
              label: 'Thai'
          },
          {
              value: 'fr',
              label: 'French'
          },{
              value: 'hi',
              label: 'Hindi'
          },
          {
              value: 'es',
              label: 'Espaniol'
          }],
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
          selectedLangs: [],
          selectedCities: [],
          prevDays: 0,
      }
  },
  methods: {
      langChanged(){
          this.$emit('langChanged', this.selectedLangs);
      },
      cityChanged(){
          this.$emit('cityChanged', this.selectedCities);
      },
      daysChanged() {
          this.$emit('daysChanged', this.prevDays.toString());
      }
  },
  created(){
      this.selectedLangs = this.filters.langs;
      this.selectedCities = this.filters.cities;
      this.prevDays = Number(this.filters.date[0]);
  }
}
</script>

<style scoped>
.search-filter {
    text-align: left;
    margin-top: 25px;
}

.history-label {
    margin-bottom: 15px;
}
</style>
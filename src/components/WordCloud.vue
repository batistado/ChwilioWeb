<template>
<div>
    <wordcloud
      :data="translatedData"
      nameKey="name"
      valueKey="value"
      color="Accent">
    </wordcloud>
</div>
</template>

<script>
// @ is an alias to /src
import wordcloud from 'vue-wordcloud'

export default {
  name: 'word-cloud',
  components: {
    wordcloud,
  },
  data() {
      return {
          data: {},
      }
  },
  computed: {
      translatedData() {
          const data = [];
          Object.keys(this.data).forEach((key) => {
              data.push({
                  'name': key,
                  'value': this.data[key],
              });
          });
          return data;
      }
  },
  methods: {
      loadData(){
        this.loading = true;
        this.$axios.get('tweets/wordcloud')
        .then((response) => {
            this.data = response.data.wordCloud;
            this.loading = false;
        })
        .catch(error => { console.log(error); this.loading = false; });
      }
  },
  created() {
      this.loadData();
  }
}
</script>

<style scoped>
</style>
<template>
    <div class="tweet-details">
        <div>
            <div>
            <img :src="tweetData.userProfileImage" alt="Avatar" style="width:80px">
            </div>
            <div>
            <b>{{tweetData.username}}</b>
            </div>
        </div>
        <div>
            <table v-loading="loading" element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading">
                <tr>
                    <td><b>Tweet:</b></td>
                    <td>{{tweetData.text}}</td>
                </tr>
                <tr v-if="this.tweetData.lang !== this.originalLang">
                    <td colspan="2">
                        <el-card shadow="always">
                            <div>
                                <b>Original Text:</b>
                            </div>
                            <div>
                                {{this.originalText}}
                            </div>
                        </el-card>
                    </td>
                </tr>
                <tr>
                    <td><b>City:</b></td>
                    <td>{{tweetData.city}}</td>
                </tr>
                <tr>
                    <td><b>Language:</b></td>
                    <td>
                        <el-select :value="this.selectedLang" @change="onLangChange" size="mini">
                            <el-option
                            v-for="item in this.langs"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td><b>Timestamp:</b></td>
                    <td>{{transformedDate}}</td>
                </tr>
                <tr>
                    <td><b>Topic:</b></td>
                    <td>{{tweetData.topic}}</td>
                </tr>
                <tr>
                    <td><b>Tweet URL:</b></td>
                    <td>{{tweetData.tweetUrl}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import moment from "moment"

export default {
  name: 'tweet-details',
  props: {
    id: {
        type: String,
        required: true,
    },
  },
  data() {
      return {
          tweetData: {},
          tweetData: {},
          loading: true,
          langs: [{
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
          selectedLang: '',
          originalLang: '',
          originalText: '',
      }
  },
  computed: {
      transformedDate() {
          return moment(this.tweetData.date).format('DD/MM/YYYY');
      },
  },
    methods: {
        translateData() {
            this.loading = true;
            this.$axios.post('tweets/translate', this.tweetData)
            .then((response) => {
                this.tweetData.text= response.data.translatedText;
            })
            .catch(error => console.log(error));
            this.loading = false;
        },
        onLangChange(selectedLang) {
            this.selectedLang = selectedLang;
            this.tweetData.lang = selectedLang;
            this.translateData();
        },
        loadData() {
            this.loading = true;
            this.$axios.get('tweets/'+this.id)
            .then((response) => {
                this.tweetData = response.data;
                this.originalLang = this.originalLang.length === 0 ? this.tweetData.lang : this.originalLang;
                this.selectedLang = this.selectedLang.length === 0 ? this.tweetData.lang : this.selectedLang;
                this.originalText = this.originalText.length === 0 ? this.tweetData.text : this.originalText;
                this.loading = false;
            })
            .catch(error => { console.log(error); this.loading = false; });
        },
    },
    created() {
        this.loadData();
    }
}
</script>

<style scoped>
td {
    text-align: left
}

.tweet-details {
    margin-top: -20px;
}
</style>
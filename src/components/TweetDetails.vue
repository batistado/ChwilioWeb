<template>
    <div class="tweet-details">
        <div>
            <div>
            <img :src="tweetCopy.userProfileImage" alt="Avatar" style="width:80px">
            </div>
            <div>
            <b>{{tweetCopy.username}}</b>
            </div>
        </div>
        <div>
            <table>
                <tr>
                    <td><b>Tweet:</b></td>
                    <td>{{tweetCopy.text}}</td>
                </tr>
                <tr v-if="this.tweetData.lang !== this.selectedLang">
                    <td colspan="2">
                        <el-card shadow="always">
                            <div>
                                <b>Original Text:</b>
                            </div>
                            <div>
                                {{this.tweetData.text}}
                            </div>
                        </el-card>
                    </td>
                </tr>
                <tr>
                    <td><b>City:</b></td>
                    <td>{{tweetCopy.city}}</td>
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
                    <td>{{tweetCopy.topic}}</td>
                </tr>
                <tr>
                    <td><b>Tweet URL:</b></td>
                    <td>{{tweetCopy.tweetUrl}}</td>
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
    tweetData: {
        type: Object,
        required: true,
    },
  },
  data() {
      return {
          tweetCopy: {},
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
      }
  },
  computed: {
      transformedDate() {
          return moment(this.tweetCopy.date).format('DD/MM/YYYY');
      },
  },
    methods: {
        loadData() {
            this.$axios.post('tweets/translate', this.tweetCopy)
            .then((response) => {
                this.$set(this.tweetCopy, 'originalText', response.data.text);
                this.tweetCopy.text= response.data.translatedText;
            })
            .catch(error => console.log(error));
        },
        onLangChange(selectedLang) {
            this.selectedLang = selectedLang;
            this.$set(this.tweetCopy, 'lang', selectedLang);
            this.loadData();
        }
    },
    created() {
        this.tweetCopy = Object.assign({}, this.tweetData);
        this.selectedLang = this.tweetCopy.lang;
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
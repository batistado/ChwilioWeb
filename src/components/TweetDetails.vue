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
            <table>
                <tr>
                    <td><b>Tweet:</b></td>
                    <td>{{tweetData.text}}</td>
                </tr>
                <tr>
                    <td><b>City:</b></td>
                    <td>{{tweetData.city}}</td>
                </tr>
                <tr>
                    <td><b>Language:</b></td>
                    <td>{{tweetData.lang}}</td>
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
    tweetData: {
        type: Object,
        required: true,
    },
  },
  computed: {
      transformedDate() {
          return moment(this.tweetData.date).format('DD/MM/YYYY');
      }
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
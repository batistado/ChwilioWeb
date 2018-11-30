<template>
<div>
  <div class="tweet-card" v-loading="loading" element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading">
    <el-card shadow="always">
      <div class="wrapper">
          <div class="header">
              <div class="profile">
                <img :src="tweetData.userProfileImage" alt="Avatar" style="width:50px">
                <b>{{tweetData.username}}</b>
              </div>
              <div class="options">
                  {{this.transformedDate}}
                  <el-button @click="dialogVisible = true" icon="el-icon-more" size="mini" round id="prev-button"></el-button>
              </div>
          </div>
          <hr/>
          <div class="content">
              {{tweetData.text}}
          </div>
      </div>
    </el-card>
  </div>

    <el-dialog
    title="Tweet Details"
    :visible.sync="dialogVisible">
        <tweet-details :tweetData="tweetData"/>
    </el-dialog>
</div>
</template>

<script>
// @ is an alias to /src
import moment from "moment"
import TweetDetails from "@/components/TweetDetails.vue"

export default {
  name: 'tweet-card',
  components: {
      TweetDetails,
  },
  data() {
      return {
          dialogVisible: false,
          tweetData: {},
          loading: true,
      }
  },
  props: {
    id: {
        type: String,
        required: true,
    },
  },
  computed: {
      transformedDate() {
          return moment(this.tweetData.date).format('DD/MM/YYYY');
      }
  },
    methods: {
        loadData() {
            this.loading = true;
      this.$axios.get('tweets/'+this.id)
      .then((response) => {
        this.tweetData = response.data;
      })
      .catch(error => console.log(error));
      this.loading = false;
    },
    },
  created() {
    this.loadData();
  }
}
</script>

<style scoped>
.tweet-card {
    margin-bottom: 5px;
}
.header {
    display: flex;
    justify-content: space-between;
}

#prev-button {
    margin-top: -10px;
    margin-left: 5px;
}

b {
    margin-top: 15px;
}

.profile {
    display: flex;
    justify-content: flex-start;
}

.options {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
}

img {
    border-radius: 50%;
    margin-right: 5px;
}

.content {
    text-align: left;
    min-height: 50px;
}
</style>
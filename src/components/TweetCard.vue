<template>
<div>
  <div class="tweet-card">
    <el-card shadow="always">
      <div class="wrapper">
          <div class="header">
              <div class="profile">
                <img :src="imgSrc" @error="defaultPic" alt="Avatar" style="width:50px">
                <b>{{tweetData.username}}</b>
              </div>
              <div class="options">
                  {{this.transformedDate}}
                  <el-button @click="dialogVisible = true" size="mini" round id="prev-button"><font-awesome-icon icon="info-circle" :style="{ color: '#3F9EFF'}"/></el-button>
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
        <tweet-details :id="tweetData.id"/>
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
          imgSrc: '',
      }
  },
  props: {
    tweetData: {
        type: Object,
        required: true,
    },
  },
  computed: {
      transformedDate() {
          return moment(this.tweetData.date).format('DD/MM/YYYY');
      },
  },
  methods: {
    defaultPic() {
        this.imgSrc = require('../assets/default.png');
    }
  },
  created(){
      this.imgSrc = this.tweetData.userProfileImage;
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
    height: 50px;
    width: 50px;
}

.content {
    text-align: left;
    min-height: 50px;
}
</style>
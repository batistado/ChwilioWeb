<template>
  <div class="tweet-card">
    <el-card shadow="always">
      <div class="wrapper">
          <div class="header">
              <div class="profile">
                <img :src="tweetData.userProfileImage" alt="Avatar" style="width:50px">
                <b>{{tweetData.username}}</b>
              </div>
              <div class="options">
                  {{tweetData.date}}
              </div>
          </div>
          <hr/>
          <div class="content">
              {{tweetData.text}}
          </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'tweet-card',
  props: {
    tweetData: {
        type: Object,
        required: true,
    },
  },
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
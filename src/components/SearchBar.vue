<template>
  <div class="search-bar">
    <div class="input">
    <el-input placeholder="Start searching..." :value="searchText" @input="$emit('update:searchText', $event)"></el-input>
    </div>
    <el-button icon="el-icon-search" @click="onSearch" size="mini"></el-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'searchBar',
  props: {
    searchText: {
        type: String,
        default: () => '',
    },
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchText);
    }
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
}

.input {
    min-width: 500px;
    margin-right: 5px;
}
</style>
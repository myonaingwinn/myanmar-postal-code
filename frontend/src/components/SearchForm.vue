<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      keyword: '',
    };
  },
  watch: {
    keyword: function () {
      this.$emit('setKeyword', this.keyword);
    },
  },
};
</script>

<template>
  <div class="search-form">
    <el-input
      placeholder="Type something"
      v-model="keyword"
      prefix-icon="el-icon-search"
      clearable
    >
    </el-input>
  </div>
</template>

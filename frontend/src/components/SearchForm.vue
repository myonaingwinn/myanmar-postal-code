<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      keyword: '',
      searchTimeout: null,
    };
  },
  methods: {
    setKeyword() {
      clearTimeout(this.searchTimeout);

      this.searchTimeout = setTimeout(() => {
        this.$emit('setKeyword', this.keyword.trim());
      }, 500);
    },
  },
};
</script>

<template>
  <div class="search-form">
    <el-input
      placeholder="Search with anything"
      v-model="keyword"
      prefix-icon="el-icon-search"
      clearable
      @input="setKeyword"
    >
    </el-input>
  </div>
</template>

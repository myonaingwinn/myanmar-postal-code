<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      keyword: '',
      searchTimeout: null,
      oldFilteredValue: '',
    };
  },
  methods: {
    setKeyword() {
      const filteredValue = this.keyword.replace(
        /[^a-zA-Z0-9\u1000-\u109F\s]/g,
        ''
      );

      if (filteredValue !== this.oldFilteredValue) {
        clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout(() => {
          this.$emit('setKeyword', this.keyword.trim());
        }, 500);
      }
      this.keyword = this.oldFilteredValue = filteredValue;
    },
  },
};
</script>

<template>
  <div class="search-form">
    <el-input
      :placeholder="$t('search.placeholder')"
      v-model="keyword"
      prefix-icon="el-icon-search"
      clearable
      @input="setKeyword"
    >
    </el-input>
  </div>
</template>

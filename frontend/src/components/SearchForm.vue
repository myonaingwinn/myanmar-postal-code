<script>
import { useCommonStore } from '../stores';

export default {
  name: 'SearchForm',
  data() {
    const commonStore = useCommonStore();

    return {
      keyword: commonStore.getKeyword,
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
          this.$emit('setKeyword', this.keyword);
        }, 1000);
      }

      this.oldFilteredValue = filteredValue;
    },

    clear() {
      this.$emit('setKeyword', this.keyword);
    },
  },

  mounted() {
    this.$refs.searchRef.focus();
  },
};
</script>

<template>
  <div class="search-form">
    <el-row>
      <el-col
        :xs="{ span: 12, offset: 6 }"
        :sm="{ span: 9, offset: 8 }"
        :md="{ span: 7, offset: 8 }"
        :lg="{ span: 7, offset: 8 }"
        :xl="{ span: 6, offset: 9 }"
      >
        <el-input
          :placeholder="$t('search.placeholder')"
          v-model="keyword"
          prefix-icon="el-icon-search"
          clearable
          @input="setKeyword"
          @clear="clear"
          ref="searchRef"
        >
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

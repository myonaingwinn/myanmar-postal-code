<script>
import NavBar from './components/Navbar.vue';
import { LANGUAGE } from './enums';
import { useLanguageStore, useTableStore } from './stores';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  setup() {
    const langStore = useLanguageStore();
    const tableStore = useTableStore();

    return {
      LANGUAGE,
      langStore,
      tableStore,
    };
  },
};
</script>

<template>
  <div class="app">
    <el-row>
      <el-col>
        <NavBar />
      </el-col>
      <el-col
        :class="[
          'route-view',
          langStore.getLanguage === LANGUAGE.EN
            ? 'paddingBottom-EN'
            : 'paddingBottom-MM',
          tableStore.getHasTableData && langStore.getLanguage === LANGUAGE.MM
            ? 'has-data'
            : '',
        ]"
      >
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

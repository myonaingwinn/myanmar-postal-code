<script>
import NavBar from './components/Navbar.vue';
import { useTableStore } from './stores';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  setup() {
    const tableStore = useTableStore();

    return {
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
          tableStore.getHasTableData ? 'has-data' : 'no-data',
        ]"
      >
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

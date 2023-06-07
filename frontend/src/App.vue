<script>
import NavBar from './components/Navbar.vue';
import { useTableStore } from './stores';

export default {
  name: 'App',
  components: {
    NavBar,
  },

  data() {
    return {
      isAboutRoute: false,
    };
  },

  created() {
    this.updateRoute();
  },

  watch: {
    $route() {
      this.updateRoute();
    },
  },

  methods: {
    updateRoute() {
      this.isAboutRoute = this.$route.path === '/about';
    },
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
          !isAboutRoute &&
            (tableStore.getHasTableData ? 'has-data' : 'no-data'),
        ]"
      >
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

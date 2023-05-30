<script>
import NavBar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

<template>
  <div class="app">
    <el-row>
      <el-col>
        <NavBar />
      </el-col>
      <el-col class="route-view">
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

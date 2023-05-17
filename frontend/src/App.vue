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
    <NavBar />
    <router-view />
  </div>
</template>

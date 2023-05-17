<script>
export default {
  name: 'HomeView',
  components: {
    SearchForm: () => import('../components/SearchForm.vue'),
  },
};
</script>

<template>
  <div class="home">
    <SearchForm />
  </div>
</template>

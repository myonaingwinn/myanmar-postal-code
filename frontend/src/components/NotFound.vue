<template>
  <el-row class="not-found">
    <el-col :span="24" align="center" class="not-found">
      <svgicon icon="404" width="180" height="220" color="#ff5656" />
      <h1 v-html="getHeading"></h1>
      <p v-html="getMessage"></p>
    </el-col>
  </el-row>
</template>

<script>
import router from '../router';
import '../assets/compiled-icons';

export default {
  name: 'NotFound',
  mounted() {
    document.title = this.$t('notFound.title');

    this.$notify.info({
      title: 'Redirect',
      message: this.$t('notFound.notify.info'),
      duration: 3000,
      offset: 50,
      showClose: false,
    });

    setTimeout(() => {
      router.push('/');
    }, 3000);
  },

  computed: {
    getHeading() {
      return this.$t('notFound.heading');
    },
    getMessage() {
      return this.$t('notFound.message');
    },
  },
};
</script>

<template>
  <div class="about">
    <el-row>
      <el-col class="content" :xs="{ span: 20, offset: 2 }" :sm="{ span: 22, offset: 1 }" :md="{ span: 22, offset: 1 }"
        :lg="{ span: 22, offset: 1 }" :xl="{ span: 16, offset: 4 }" align="center">
        <h2>About This App</h2>
        <div class="sub-heading">#About, Thanks!</div>
        <p>
          Have you ever had a hard time finding a postal code? I hope this app will be helpful to you, even if it's just a
          little bit. It would bring me great joy.<br />
          Well, my bro <a href='https://github.com/zan-yai-htet' target='blank'>ZYH</a> and I wanted to start a Myanmar
          Postal Code API for developers. Unfortunately, we didn't get a chance to kickstart the development at that time.
          Now, I finally have some free time, so I decided to develop this app with a user-friendly UI. The postal code
          data used in this app is sourced from the <a href="https://github.com/MyanmarPost/MyanmarPostalCode"
            target='blank'>Myanmar
            Post's repository</a>. Hence, credits go to <a href='https://github.com/zan-yai-htet' target='blank'>ZYH</a>
          for the idea and to Myanmar Post for providing the data. Thank
          you very much!
        </p>
        <div class="sub-heading">#Technical</div>
        <p>
          Initially, I started with a Laravel API, but I couldn't find a free hosting service for it (you can check that
          version <a href="https://github.com/myonaingwinn/myanmar-postal-code/tags">here</a>). As a result, I switched to
          an Express API and deployed it on <a href="https://vercel.com" target='blank'>vercel.com</a>. <em>Please note
            that
            this app might be a bit slow due to the usage of a free hosting service.</em>
          <br /><br />
          The following technologies were used in building this app:
        <ul>
          <li>Frontend: Vite + Vue (Element-UI)</li>
          <li>Backend: Express.js</li>
          <li>Database: MongoDB</li>
          <li>Environment: Docker</li>
        </ul>
        </p>
        <div class="sub-heading">#My Profile</div>
        <p>
          I'm Myo Naing Winn, a web developer who loves to play the guitar.
          <br />
          Feel free to ask any questions or share your feedback.
          <br />
          Have a nice day!
          <br />
          <span class="contact">
            <svgicon icon="email" width="18" height="20" class="icon" /><a href="mailto:myonaingwinn@ymail.ne.jp"
              class="icon-label">myonaingwinn@ymail.ne.jp</a>
          </span>
          <span class="contact">
            <svgicon icon="github" width="18" height="20" class="icon" /><a href="https://github.com/myonaingwinn"
              target="blank" class="icon-label">https://github.com/myonaingwinn</a>
          </span>
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import '../assets/compiled-icons'

export default {
  name: 'AboutView',
  methods: {
    updatePageTitle() {
      const pageTitle = this.$t('about.title');
      document.title = pageTitle;
    },
  },

  watch: {
    '$i18n.locale': function () {
      this.updatePageTitle();
    },
  },

  created() {
    this.updatePageTitle();
  },
};
</script>

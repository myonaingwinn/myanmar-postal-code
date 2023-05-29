<template>
  <div class="navbar">
    <el-row>
      <el-col :xs="17" :sm="16" :md="18" :lg="20" :xl="20">
        <div class="app-name">Myanmar Postal Code</div>
      </el-col>
      <el-col :xs="0" :sm="4" :md="3" :lg="2" :xl="2" class="nav-col">
        <el-dropdown @command="changeLanguage" size="medium" split-button>
          <span class="el-dropdown-link">
            {{ currentLanguage.toUpperCase() }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="en">EN</el-dropdown-item>
            <el-dropdown-item command="mm" divided>MM</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :xs="7" :sm="4" :md="3" :lg="2" :xl="2" class="nav-col">
        <el-dropdown size="medium" split-button>
          {{ $t('navbar.help') }}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{ $t('navbar.feedback') }}</el-dropdown-item>
            <el-dropdown-item divided>{{
              $t('navbar.about')
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { LANGUAGE } from '../enums';

export default {
  name: 'NavBar',
  data() {
    return {
      language: this.$pinia.state.currentLanguage,
    };
  },

  methods: {
    changeLanguage(cmd) {
      if (cmd && Object.values(LANGUAGE).includes(cmd)) {
        this.language = cmd;
        this.updateLanguageStore(cmd);
      } else {
        this.language = 'en';
        this.updateLanguageStore(this.language);
      }
    },

    updateLanguageStore(language) {
      this.$pinia.state.currentLanguage = language;
      localStorage.setItem('language', language);
    },
  },

  computed: {
    currentLanguage() {
      this.$pinia.state.currentLanguage = this.language;

      this.$i18n.locale = this.language; // change language

      return this.$pinia.state.currentLanguage;
    },
  },
};
</script>

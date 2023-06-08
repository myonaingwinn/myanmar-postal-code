<template>
  <div class="navbar">
    <el-row>
      <el-col :xs="16" :sm="15" :md="17" :lg="19" :xl="19">
        <router-link to="/">
          <div class="app-name">Myanmar Postal Code</div>
        </router-link>
      </el-col>
      <el-col :xs="0" :sm="4" :md="3" :lg="2" :xl="2" class="nav-col">
        <el-dropdown @command="updateLanguageStore" size="medium" split-button>
          <span class="el-dropdown-link">
            {{ langStore.currentLanguage.toUpperCase() }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              :disabled="langStore.currentLanguage === LANGUAGE.EN"
              :command="LANGUAGE.EN"
              >EN</el-dropdown-item
            >
            <el-dropdown-item
              :disabled="langStore.currentLanguage === LANGUAGE.MM"
              :command="LANGUAGE.MM"
              divided
              >MM</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :xs="8" :sm="5" :md="4" :lg="3" :xl="3" class="nav-col">
        <el-dropdown size="medium" split-button @click="openDialog">
          {{ $t('navbar.help.title') }}
          <el-dropdown-menu slot="dropdown" class="dd-help-menu">
            <el-dropdown-item>
              <a :href="getMailTo()">
                {{ $t('navbar.feedback') }}
              </a>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <router-link to="/about">
                <div>{{ $t('navbar.about') }}</div>
              </router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <help-dialog :visible.sync="dialogVisibilty" />
  </div>
</template>

<script>
import { LANGUAGE } from '../enums';
import { useLanguageStore } from '../stores';
import { getMailTo } from '../utils/helper';

export default {
  name: 'NavBar',
  components: {
    HelpDialog: () => import('./HelpDialog.vue'),
  },
  data() {
    const langStore = useLanguageStore();

    const updateLanguageStore = (language) => {
      langStore.setLanguage(language);

      if (this.$i18n) {
        this.$i18n.locale = language;
      }

      localStorage.setItem('language', language);
    };

    return {
      LANGUAGE,
      langStore,
      updateLanguageStore,
      dialogVisibilty: false,
      getMailTo,
    };
  },

  methods: {
    openDialog() {
      this.dialogVisibilty = true;
    },
    closeDialog() {
      this.dialogVisibilty = false;
    },
  },
};
</script>

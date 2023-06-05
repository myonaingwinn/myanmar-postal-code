<template>
  <div class="navbar">
    <el-row>
      <el-col :xs="16" :sm="15" :md="17" :lg="19" :xl="19">
        <div class="app-name">Myanmar Postal Code</div>
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
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <a
                href="mailto:myonaingwinn@ymail.ne.jp"
                style="text-decoration: none; color: inherit"
              >
                {{ $t('navbar.feedback') }}
              </a>
            </el-dropdown-item>
            <el-dropdown-item divided>{{
              $t('navbar.about')
            }}</el-dropdown-item>
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

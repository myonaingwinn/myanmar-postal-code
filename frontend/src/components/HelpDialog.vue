<template>
  <el-dialog
    :title="$t('navbar.help.dialog.title')"
    :visible="visible"
    @close="closeDialog"
    width="40%"
    center
  >
    <span v-html="$t('navbar.help.dialog.content')"></span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closeDialog">
        {{ $t('navbar.help.dialog.btnTxt') }}
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'HelpDialog',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('update:visible', false);
    },
  },
};
</script>

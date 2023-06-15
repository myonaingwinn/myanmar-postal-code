<template>
  <el-select
    v-model="val"
    filterable
    placeholder="Please enter a keyword"
    :loading="loading"
    :disabled="disabled"
    @change="change"
  >
    <el-option
      v-for="item in dataList"
      :key="item"
      :label="item"
      :value="item"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    value: {
      type: String,
      default: '',
    },
    dataList: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      val: this.value,
    };
  },

  methods: {
    change(val) {
      this.$emit('change', val);
    },
  },

  watch: {
    value(newValue) {
      this.val = newValue;
    },
  },
};
</script>

<template>
  <div>
    <label v-for="(option, key) in options" :key="key" class="cursor-pointer flex items-center">
      <input
        type="radio"
        name="radio-input"
        class="mr-2"
        :id="option.value"
        :value="option.value"
        @change="teste"
      />
      <span>{{ option.type }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'RadioButton',
  props: {
    options: Array,
  },
  methods: {
    teste({ target }) {
      this.$emit('change', target.value);
    },
  },
};
</script>

<style></style>

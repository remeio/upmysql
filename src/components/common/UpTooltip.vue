<template>
  <n-tooltip :trigger="trigger">
    <template #trigger>
      <slot></slot>
    </template>
    {{ label }}
  </n-tooltip>
</template>

<script>
export default {
  setup() {
    return {};
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    trigger: {
      type: String,
      default: "hover",
    },
  },
};
</script>

<style></style>

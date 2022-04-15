<template>
  <n-card hoverable :size="size">
    <template #header-extra>
      <slot></slot>
    </template>
    <template #header>
      <n-ellipsis :style="ellipsisStyle">
        <span style="font-size: 1em"
          ><b>{{ label }}</b></span
        >
      </n-ellipsis>
    </template>
    <n-space vertical>
      <n-ellipsis :style="ellipsisStyle" style="font-size: 1em"
        >{{ value }}
      </n-ellipsis>
      <n-ellipsis :style="ellipsisStyle">
        <span style="font-size: 1em">{{ extra }}</span>
      </n-ellipsis>
    </n-space>
  </n-card>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const ellipsisStyle = reactive({
      "max-width": "70%",
    });
    return {
      ellipsisStyle,
    };
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    extra: {
      type: String,
    },
    size: {
      type: String,
      default: "medium",
    },
  },
};
</script>

<style>
.n-card {
  border-radius: 12px;
}
</style>

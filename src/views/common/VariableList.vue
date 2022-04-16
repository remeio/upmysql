<template>
  <n-grid
    :x-gap="12"
    :y-gap="12"
    :cols="LOCAL_CONFIG.style.gridCols"
    style="margin: 4px"
  >
    <n-gi v-for="item in data" :key="item[key]">
      <up-card
        :label="item.name"
        :value="valueComputedFunc(item.value)"
        :extra="item.extra"
        size="small"
        ><up-icon
          icon="Ellipse"
          :color="colorComputedFunc(item.value)"
          v-if="showSwitchComputedFunc(item.value)" /></up-card></n-gi
  ></n-grid>
</template>

<script>
import { UpCard, UpIcon } from "@/components/common";
import LOCAL_CONFIG from "@/config";
export default {
  components: {
    UpCard,
    UpIcon,
  },
  props: {
    data: {
      type: Array,
      default: null,
    },
    key: {
      type: String,
      default: "extra",
    },
  },
  setup() {
    const colorComputedFunc = (value) => (value == "ON" ? "green" : "red");
    const showSwitchComputedFunc = (value) => value == "ON" || value == "OFF";
    const valueComputedFunc = (value) => (value ? value : "加载中...");
    return {
      LOCAL_CONFIG,
      colorComputedFunc,
      showSwitchComputedFunc,
      valueComputedFunc,
    };
  },
};
</script>

<style></style>

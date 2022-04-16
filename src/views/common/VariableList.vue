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
        :value="valueComputed(item.value)"
        :extra="item.extra"
        size="small"
        ><up-icon
          icon="Ellipse"
          :color="colorComputed(item.value)"
          v-if="showSwitchComputed(item.value)" /></up-card></n-gi
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
    const colorComputed = (value) => (value == "ON" ? "green" : "red");
    const showSwitchComputed = (value) => value == "ON" || value == "OFF";
    const valueComputed = (value) => (value ? value : "加载中...");
    return {
      LOCAL_CONFIG,
      colorComputed,
      showSwitchComputed,
      valueComputed,
    };
  },
};
</script>

<style></style>

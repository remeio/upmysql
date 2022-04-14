<template>
  <div>
    <up-icon-header value="InnoDB 存储引擎内存区域" icon="BarChartOutline" />
    <up-icon-header value="1.缓冲池" :level="2" />
    <n-grid :x-gap="12" :y-gap="8" :cols="LOCAL_CONFIG.style.gridCols">
      <n-gi v-for="item in memory.slice(0, 6)" :key="item.name">
        <up-card :label="item.name" :value="item.value" /> </n-gi
    ></n-grid>
    <up-icon-header value="2.其他内存区域" :level="2" />
    <n-grid :x-gap="12" :y-gap="8" :cols="LOCAL_CONFIG.style.gridCols">
      <n-gi v-for="item in memory.slice(6)" :key="item.name">
        <up-card :label="item.name" :value="item.value" /> </n-gi
    ></n-grid>

    <up-icon-header value="InnoDB 缓冲池参数值" icon="BarChartOutline" />
    <n-grid :x-gap="12" :y-gap="8" :cols="LOCAL_CONFIG.style.gridCols">
      <n-gi v-for="item in items" :key="item.name">
        <up-card
          :label="item.description"
          :value="item.value"
          :extra="item.name"
        /> </n-gi
    ></n-grid>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { UpIconHeader, UpCard } from "@/components/common";
import LOCAL_CONFIG from "@/config";

export default {
  components: {
    UpCard,
    UpIconHeader,
  },
  setup() {
    let items = [
      {
        name: "asd",
        value: "asd",
      },
    ];
    let memory = items;
    onMounted(() => {});

    return {
      items,
      memory,
      LOCAL_CONFIG,
    };
  },
};
</script>

<style></style>

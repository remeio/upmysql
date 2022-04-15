<template>
  <div>
    <n-tabs type="line" animated size="large">
      <n-tab-pane name="oasis" tab="General Query Log">
        <up-icon-header value="参数信息" icon="BarChartOutline" level="2" />
        <n-grid
          :x-gap="12"
          :y-gap="12"
          :cols="LOCAL_CONFIG.style.gridCols"
          style="margin: 4px"
        >
          <n-gi v-for="item in memory.slice(0, 6)" :key="item.name">
            <up-card
              :label="item.name"
              :value="item.value"
              :extra="item.extra"
              size="small"
              ><up-icon
                icon="Ellipse"
                :color="item.value == 'ON' ? 'green' : 'red'"
                v-if="
                  item.value == 'ON' || item.value == 'OFF'
                " /></up-card></n-gi
        ></n-grid>
        <up-icon-header value="日志跟踪" icon="BarChartOutline" level="2" />
      </n-tab-pane>
      <n-tab-pane name="the beatles" tab="Slow Query Log">
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="Binary Log"> 七里香 </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { UpIconHeader, UpCard, UpIcon } from "@/components/common";
import LOCAL_CONFIG from "@/config";

export default {
  components: {
    UpCard,
    UpIconHeader,
    UpIcon,
  },
  setup() {
    let items = [
      {
        name: "the destination for log output",
        value: "ON",
        extra: "log_output ",
      },
      {
        name: "the destination for log output",
        value: "ON",
        extra: "log_output ",
      },
      {
        name: "the destination for log output",
        value: "ON",
        extra: "log_output ",
      },
      {
        name: "the destination for log output",
        value: "ON",
        extra: "log_output ",
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

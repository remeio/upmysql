<template>
  <div>
    <n-tabs type="line" animated size="large">
      <n-tab-pane name="general_log" tab="General query log">
        <general-log
      /></n-tab-pane>
      <n-tab-pane name="slow_log" tab="Slow query log">
        <slow-log
      /></n-tab-pane>
      <n-tab-pane name="bin_log" tab="Binary log"> <bin-log /></n-tab-pane>
      <n-tab-pane name="error_log" tab="Error log"> <error-log /></n-tab-pane
      ><n-tab-pane name="ddl_log" tab="DDL log (metadata log)	"> <ddl-log /></n-tab-pane
    ></n-tabs>
  </div>
</template>

<script>
import GeneralLog from "./GeneralLog.vue";
import SlowLog from "./SlowLog.vue";
import BinLog from "./BinLog.vue";
import ErrorLog from "./ErrorLog.vue";
import DdlLog from "./DdlLog.vue";
export default {
  components: { GeneralLog, SlowLog, BinLog, ErrorLog, DdlLog },
};
</script>

<style></style>

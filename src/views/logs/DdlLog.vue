<template>
  <div>
    <up-icon-header value="描述" icon="InformationCircleOutline" :level="2" />
    <p>
      Metadata operations performed by DDL statements.<br />MySQL uses this log
      to recover from a crash occurring in the middle of a partitioning metadata
      operation.
    </p>
    <up-icon-header value="参数信息" icon="BarChartOutline" :level="2" />
    <p>
      There are <b>no user-configurable</b> server options or variables
      associated with this file.
    </p>
  </div>
</template>

<script>
export default {
  components: {},
  setup() {},
};
</script>

<style></style>

<template>
  <div>
    <up-icon-header value="描述" icon="InformationCircleOutline" :level="2" />
    <p>
      Problems encountered <b>starting</b>, <b>running</b>, or
      <b>stopping</b> mysqld
    </p>
    <up-icon-header value="参数信息" icon="BarChartOutline" :level="2" />
    <variable-list :data="variablesReactive" />
  </div>
</template>

<script>
import VariableList from "@/views/server/logs/common/VariableList";
import { reactive } from "@vue/reactivity";

export default {
  components: {
    VariableList,
  },
  setup() {
    // 系统变量列表
    const variablesReactive = reactive([
      { name: "错误日志的输出路径", extra: "log_error", readonly: true },
      { name: "错误日志服务", extra: "log_error_services" },
      { name: "错误日志级别", extra: "log_error_verbosity" },
      { name: "错误日志抑制列表", extra: "log_error_suppression_list" },
    ]);
    return {
      variablesReactive,
    };
  },
};
</script>

<style></style>

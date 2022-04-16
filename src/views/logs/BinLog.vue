<template>
  <div>
    <up-icon-header value="描述" icon="InformationCircleOutline" :level="2" />
    <p>
      The <b>binary log</b> contains “events” that describe database changes such as
      table creation operations or changes to table data. It also contains
      events for statements that potentially could have made changes (for
      example, a DELETE which matched no rows), unless row-based logging is
      used. The binary log also contains information about how long each
      statement took that updated data.The binary log has <b>two important purposes</b>:
      <ol>
        <li>For <b>replication</b>, the binary log on a replication source server provides a record of the data changes to be sent to replicas. </li>
        <li>Certain <b>data recovery</b> operations require use of the binary log. </li>
      </ol>
    </p>
    <up-icon-header value="参数信息" icon="BarChartOutline" :level="2" />
    <variable-list :data="variablesReactive" />
    <up-icon-header value="状态信息" icon="BarChartOutline" :level="2" />
    <variable-list :data="statusReactive" :status="true" />
  </div>
</template>

<script>
import VariableList from "@/views/logs/common/VariableList";
import { reactive } from "@vue/reactivity";

export default {
  components: {
    VariableList,
  },
  setup() {
    // 状态列表
    const statusReactive = reactive([
       { name: "二进制文件使用临时文件次数", extra: "Binlog_cache_disk_use", unit: "次"},
       { name: "二进制文件使用缓冲次数", extra: "Binlog_cache_use", unit: "次"},
    ])
    // 系统变量列表
    const variablesReactive = reactive([
      { name: "是否开启二进制日志", extra: "log_bin", readonly: true },
      { name: "数据目录", extra: "datadir", readonly: true },
      {
        name: "单个文件最大值",
        extra: "max_binlog_size",
        unit: "B",
        readonly: false,
      },
      {
        name: "缓存大小",
        extra: "binlog_cache_size",
        unit: "B",
        readonly: false,
      },
      {
        name: "缓存最大大小",
        extra: "max_binlog_cache_size",
        unit: "B",
        readonly: false,
      },
      { name: "文件路径", extra: "log_bin_basename", readonly: true },
      {
        name: "写入多少次数后同步到磁盘",
        extra: "sync_binlog",
        readonly: false,
        unit: "次",
      },
      { name: "XA事务", extra: "innodb_support_xa", readonly: true },
      { name: "错误时行为", extra: "binlog_error_action", readonly: false },
      { name: "二进制文件格式", extra: "binlog_format", readonly: false },
      {
        name: "行模式最大事件",
        extra: "binlog_row_event_max_size",
        unit: "B",
        readonly: true,
      },
      {
        name: "二进制文件事务压缩",
        extra: "binlog_transaction_compression",
        readonly: false,
      },
    ]);
    return {
      variablesReactive,
      statusReactive
    };
  },
};
</script>

<style></style>

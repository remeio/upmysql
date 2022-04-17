<template>
  <div>
    <up-icon-header value="参数信息" icon="BarChartOutline" :level="2" />
    <variable-list :data="variablesReactive" />
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import VariableList from "@/views/logs/common/VariableList";
export default {
  components: {
    VariableList,
  },
  setup() {
    const variablesReactive = reactive([
      {
        name: "MySQL 版本",
        extra: "version",
        readonly: true,
      },
      {
        name: "InnoDB 版本",
        extra: "innodb_version",
        readonly: true,
      },
      {
        name: "IO 读线程数",
        extra: "innodb_read_io_threads",
        readonly: true,
      },
      {
        name: "IO 写线程数",
        extra: "innodb_write_io_threads",
        readonly: true,
      },
      {
        name: "Purge 线程数",
        extra: "innodb_purge_threads",
        readonly: true,
      },
      {
        name: "缓冲池大小",
        extra: "innodb_buffer_pool_size",
        readonly: false,
        unit: "B",
      },
      {
        name: "缓冲池实例个数",
        extra: "innodb_buffer_pool_instances",
        readonly: true,
        unit: "个",
      },
      {
        name: "缓冲池 midpoint 位置",
        extra: "innodb_old_blocks_pct",
        readonly: false,
        unit: "%",
      },
      {
        name: "缓冲池 mid 页置顶等待时间",
        extra: "innodb_old_blocks_time",
        readonly: false,
        unit: "毫秒",
      },
      {
        name: "重做日志缓冲大小",
        extra: "innodb_log_buffer_size",
        unit: "B",
        readonly: false,
      },
      {
        name: "Sharp Checkpoint",
        extra: "innodb_fast_shutdown",
        readonly: false,
      },
      {
        name: "LRU 列表可用页的数量",
        extra: "innodb_lru_scan_depth",
        unit: "个",
        readonly: false,
      },
      {
        name: "缓冲池中脏页最大占比",
        extra: "innodb_max_dirty_pages_pct",
        unit: "%",
        readonly: false,
      },
      {
        name: "磁盘 IO 吞吐量",
        extra: "innodb_io_capacity",
        readonly: false,
      },
      {
        name: "自适应刷脏页",
        extra: "innodb_adaptive_flushing",
        readonly: false,
      },
      {
        name: "每次回收 Undo 页的数量",
        extra: "innodb_purge_batch_size",
        unit: "个",
        readonly: false,
      },
      {
        name: "Change Buffer 选项",
        extra: "innodb_change_buffering",
        readonly: false,
      },
      {
        name: "Change Buffer 最大缓冲占比",
        extra: "innodb_change_buffer_max_size",
        unit: "%",
        readonly: false,
      },
      {
        name: "是否开启自适应哈希索引",
        extra: "innodb_adaptive_hash_index",
        readonly: false,
      },
      {
        name: "是否开启 Native NIO",
        extra: "innodb_use_native_aio",
        readonly: true,
      },
      {
        name: "是否开启刷新邻接页",
        extra: "innodb_flush_neighbors",
        readonly: false,
      },
      {
        name: "InnoDB 恢复选项",
        extra: "innodb_force_recovery",
        readonly: true,
      },
    ]);
    return {
      variablesReactive,
    };
  },
};
</script>

<style></style>
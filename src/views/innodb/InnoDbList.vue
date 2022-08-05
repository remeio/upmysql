<template>
  <div>
    <n-tabs type="line" animated size="large">
      <n-tab-pane
        v-for="(item, index) in variablesReactive"
        :name="index"
        :tab="item.title"
        :key="index"
      >
        <variable-list :data="item.data" />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import VariableList from "@/views/server/logs/common/VariableList";
export default {
  components: {
    VariableList,
  },
  setup() {
    const variablesReactive = reactive([
      {
        title: "基本信息",
        data: [
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
        ],
      },
      {
        title: "线程相关",
        data: [
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
        ],
      },
      {
        title: "缓冲池",
        data: [
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
        ],
      },
      {
        title: "表空间文件",
        data: [
          {
            name: "表空间文件路径",
            extra: "innodb_data_file_path",
            readonly: true,
          },
          {
            name: "是否开启独立表空间",
            extra: "innodb_file_per_table",
            readonly: false,
          },
          {
            name: "文件格式",
            extra: "innodb_file_format",
            readonly: false,
          },
          {
            name: "默认页的大小",
            extra: "innodb_page_size",
            readonly: true,
            unit: "B",
          },
        ],
      },
      {
        title: "重做日志文件",
        data: [
          {
            name: "重做日志文件大小",
            extra: "innodb_log_file_size",
            unit: "B",
            readonly: true,
          },
          {
            name: "组内重做日志文件个数",
            extra: "innodb_log_files_in_group",
            unit: "个",
            readonly: true,
          },
          {
            name: "日志镜像文件组的数量",
            extra: "innodb_mirrored_log_groups",
            unit: "个",
            readonly: true,
          },
          {
            name: "重做日志文件路径",
            extra: "innodb_log_group_home_dir",
            readonly: true,
          },
          {
            name: "重做日志刷盘机制",
            extra: "innodb_flush_log_at_trx_commit",
          },
        ],
      },
      {
        title: "索引",
        data: [
          {
            name: "自适应刷脏页",
            extra: "innodb_adaptive_flushing",
            readonly: false,
          },
          {
            name: "统计信息是否持久化",
            extra: "innodb_stats_persistent",
            readonly: false,
          },
        ],
      },
      {
        title: "其他特性",
        data: [
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
          {
            name: "foregin_key_checks",
            extra: "外键检查",
            readonly: false,
          },
        ],
      },
    ]);
    return {
      variablesReactive,
    };
  },
};
</script>

<style></style>

<template>
  <div>
    <up-icon-header value="描述" icon="InformationCircleOutline" :level="2" />
    <p>
      The slow query log consists of SQL statements that take more than
      <b>long_query_time</b> seconds to execute and require at least
      <b>min_examined_row_limit</b> rows to be examined.
    </p>
    <up-icon-header value="参数信息" icon="BarChartOutline" :level="2" />
    <variable-list :data="variablesReactive" />
    <up-icon-header value="日志跟踪" icon="AnalyticsOutline" :level="2" />
    <up-table :query="queryTable" :columns="tableColumns" />
    <n-modal v-model:show="showInfoModalRef" title="SQL 详情" preset="dialog">
      <n-code :code="infoRowReactive.data.sql_text" language="sql" inline />
    </n-modal>
  </div>
</template>

<script>
import { reactive, h, ref } from "vue";
import VariableList from "@/views/server/logs/common/VariableList";
import LOCAL_CONFIG from "@/config";
import moment from "moment";
import executeSql from "@/dao";
import { NButton, NCode, useMessage } from "naive-ui";
export default {
  components: {
    VariableList,
  },
  setup() {
    const message = useMessage();
    // 详情
    const showInfoModalRef = ref(false);
    const infoRowReactive = reactive({ data: {} });
    const openInfoFunc = (r) => {
      showInfoModalRef.value = true;
      infoRowReactive.data = r;
    };
    const tableColumns = [
      {
        title: "时间",
        key: "start_time",
        sorter: true,
      },
      {
        title: "查询耗时",
        key: "query_time",
        sorter: true,
        width: 100,
      },
      {
        title: "加锁时间",
        key: "lock_time",
        sorter: true,
        width: 100,
      },

      {
        title: "插入ID",
        key: "insert_id",
        sorter: true,
      },
      {
        title: "上次插入 ID",
        key: "last_insert_id",
        sorter: true,
      },
      {
        title: "线程 ID",
        key: "thread_id",
        sorter: true,
      },

      {
        title: "来源",
        key: "user_host",
        sorter: true,
        ellipsis: {
          tooltip: true,
        },
      },
      {
        title: "发送行数",
        key: "rows_sent",
        sorter: true,
      },
      {
        title: "扫描行数",
        key: "rows_examined",
        sorter: true,
      },
      {
        title: "数据库",
        key: "db",
        sorter: true,
        ellipsis: {
          tooltip: true,
        },
      },
      {
        title: "执行语句",
        key: "sql_text",
        ellipsis: true,
        render(r) {
          return h(NCode, {
            code: r.sql_text,
            language: "sql",
            inline: true,
          });
        },
      },
      {
        title: "操作",
        key: "action",
        width: 100,
        render(row) {
          return h(
            NButton,
            {
              size: "small",
              onClick: () => openInfoFunc(row),
            },
            { default: () => "查看SQL" }
          );
        },
      },
    ];

    // 分页查询
    const queryTable = function (currentPage, pageSize, sorter) {
      console.log(sorter);
      let order = "order by start_time desc";
      if (sorter && sorter.order) {
        order = "order by " + sorter.key + " " + sorter.order;
      }
      const offset = (currentPage - 1) * pageSize;
      return new Promise((resolve, reject) => {
        executeSql("select count(1) as count from mysql.slow_log").then(
          (res) => {
            executeSql(
              "select start_time, user_host, query_time, lock_time, rows_sent, rows_examined, db, last_insert_id, server_id, thread_id, convert(sql_text using utf8) as sql_text from mysql.slow_log " +
                order +
                " limit " +
                offset +
                ", " +
                pageSize
            ).then(
              (result) => {
                result.forEach((r) => {
                  r.start_time = moment(r.start_time).format(
                    "yyyy-MM-DD HH:mm:ss SSS"
                  );
                });
                resolve({ data: result, total: res[0].count });
              },
              () => {
                message.error("查询失败");
                reject();
              }
            );
          },
          () => {
            message.error("查询失败");
            reject();
          }
        );
      });
    };

    // 系统变量列表
    const variablesReactive = reactive([
      { name: "是否开启慢查询日志", extra: "slow_query_log" },

      { name: "慢查询阈值", extra: "long_query_time", unit: "秒" },

      {
        name: "是否记录未使用索引的查询",
        extra: "log_queries_not_using_indexes",
      },
      {
        name: "每分钟记录的未使用索引的SQL次数的阈值",
        extra: "log_throttle_queries_not_using_indexes",
        unit: "次每分",
      },
      { name: "扫描行数阈值", extra: "min_examined_row_limit", unit: "行" },
      { name: "日志输出格式", extra: "log_output" },
      { name: "慢查询日志文件路径", extra: "slow_query_log_file" },
      { name: "是否包含管理语句", extra: "log_slow_admin_statements" },

      { name: "是否记录额外信息", extra: "log_slow_extra" },
      { name: "日志时间戳", extra: "log_timestamps" },
      {
        name: "主从复制是否复制慢查询（MySQL 8.0.26）",
        extra: "log_slow_replica_statements",
      },
      { name: "主从复制是否复制慢查询", extra: "log_slow_slave_statements " },
    ]);
    return {
      variablesReactive,
      queryTable,
      tableColumns,
      LOCAL_CONFIG,
      showInfoModalRef,
      infoRowReactive,
    };
  },
};
</script>

<style></style>

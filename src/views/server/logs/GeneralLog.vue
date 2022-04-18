<template>
  <div>
    <up-icon-header value="描述" icon="InformationCircleOutline" :level="2" />
    <p>
      Established <b>client connections</b> and <b>statements</b> received from
      clients.
    </p>
    <up-icon-header value="参数信息" icon="BarChartOutline" :level="2" />
    <variable-list :data="variablesReactive" />
    <up-icon-header value="日志跟踪" icon="AnalyticsOutline" :level="2" />
    <up-table :query="queryTable" :columns="tableColumns" />
    <n-modal v-model:show="showInfoModalRef" title="SQL 详情" preset="dialog">
      <n-code :code="infoRowReactive.data.argument" language="sql" inline />
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
        key: "event_time",
        sorter: true,
      },
      {
        title: "来源",
        key: "user_host",
        sorter: true,
      },
      {
        title: "命令类型",
        key: "command_type",
        sorter: true,
      },
      {
        title: "线程 ID",
        key: "thread_id",
        sorter: true,
      },

      {
        title: "执行语句",
        key: "argument",
        ellipsis: true,
        render(r) {
          return h(NCode, {
            code: r.argument,
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
      let order = "order by event_time desc";
      if (sorter && sorter.order) {
        order = "order by " + sorter.key + " " + sorter.order;
      }
      const offset = (currentPage - 1) * pageSize;
      return new Promise((resolve, reject) => {
        executeSql("select count(1) as count from mysql.general_log").then(
          (res) => {
            executeSql(
              "select event_time, user_host, thread_id, server_id, command_type, convert(argument using utf8) as argument from mysql.general_log " +
                order +
                " limit " +
                offset +
                ", " +
                pageSize
            ).then(
              (result) => {
                result.forEach((r) => {
                  r.event_time = moment(r.event_time).format(
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
      { name: "是否开启查询日志", extra: "general_log" },
      { name: "日志输出格式", extra: "log_output" },
      { name: "日志是否关闭", extra: "sql_log_off" },
      { name: "查询日志文件路径", extra: "general_log_file" },
      { name: "日志时间戳", extra: "log_timestamps" },
      { name: "日志时区", extra: "time_zone" },
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

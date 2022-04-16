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
          <n-gi v-for="item in items" :key="item.name">
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
        <up-table :query="queryFunc" :columns="columns" />
      </n-tab-pane>
      <n-tab-pane name="the beatles" tab="Slow Query Log">
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="Binary Log"> 七里香 </n-tab-pane>
    </n-tabs>
    <n-modal v-model:show="showModal" title="SQL 详情" preset="dialog">
      <n-descriptions label-placement="left" size="large" column="1">
        <n-descriptions-item label="来源">
          {{ row.data.user_host }}
        </n-descriptions-item>
        <n-descriptions-item label="线程 ID">
          {{ row.data.thread_id }}
        </n-descriptions-item>
        <n-descriptions-item label="服务 ID">
          {{ row.data.server_id }}
        </n-descriptions-item>
        <n-descriptions-item label="SQL 语句">
          <n-code :code="row.data.argument" language="sql" inline />
        </n-descriptions-item>
      </n-descriptions>
    </n-modal>
  </div>
</template>

<script>
import { onMounted, reactive, h, ref } from "vue";
import { UpIconHeader, UpCard, UpIcon, UpTable } from "@/components/common";
import LOCAL_CONFIG from "@/config";
import moment from "moment";
import query from "@/dao";
import { NButton, NCode } from "naive-ui";
export default {
  components: {
    UpCard,
    UpIconHeader,
    UpIcon,
    UpTable,
  },
  setup() {
    let showModal = ref(false);
    let row = reactive({ data: {} });
    let items = reactive([
      { name: "是否开启 General log", extra: "general_log" },
      { name: "日志输出格式", extra: "log_output" },
      { name: "当前SQL日志是否关闭", extra: "sql_log_off" },
      { name: "SQL文件路径", extra: "general_log_file" },
    ]);
    onMounted(() => {
      console.log(query);
      query("show variables").then((resu) => {
        console.log(resu);
        console.log(items);
        // resu.forEach(element => {
        //   items.push({
        //     name: element.Variable_name,
        //     value: element.Value
        //   })
        // });
        items.forEach((r) => {
          r.value = resu.filter((s) => {
            return s.Variable_name == r.extra;
          })[0].Value;
        });
      });
    });

    let queryFunc = function (currentPage, pageSize) {
      query("set session sql_log_off='ON'");
      let offset = (currentPage - 1) * pageSize;
      return new Promise((resolve) => {
        query(
          "select event_time, user_host, thread_id, server_id, command_type, convert(argument using utf8) as argument from mysql.general_log order by event_time desc limit " +
            offset +
            ", " +
            pageSize
        ).then((resu) => {
          resu.forEach((element) => {
            element.event_time = moment(element.event_time).format(
              "yyyy-MM-DD HH:mm:ss SSS"
            );
          });
          query("select count(1) as count from mysql.general_log").then((s) => {
            resolve({ data: resu, total: s[0].count });
          });

          // resu.forEach(element => {
          //   items.push({
          //     name: element.Variable_name,
          //     value: element.Value
          //   })
          // });
        });
      });
    };
    let columns = [
      {
        title: "时间",
        key: "event_time",
      },
      {
        title: "来源",
        key: "user_host",
      },
      {
        title: "命令类型",
        key: "command_type",
        width: "100",
      },
      {
        title: "线程 ID",
        key: "thread_id",
        width: "100",
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
        render(r) {
          return h(
            NButton,
            {
              size: "small",
              onClick: () => {
                showModal.value = true;
                row.data = r;
              },
            },
            { default: () => "详情" }
          );
        },
      },
    ];
    return {
      items,
      queryFunc,
      columns,
      LOCAL_CONFIG,
      showModal,
      row,
    };
  },
};
</script>

<style></style>

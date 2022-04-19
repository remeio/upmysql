<template>
  <div>
    <up-icon-header value="连接参数" icon="BarChartOutline" :level="2" />
    <variable-list :data="variablesReactive" />
    <up-icon-header value="连接信息" icon="BarChartOutline" :level="2" />
    <n-data-table
      :columns="columnsReactive"
      :data="dataReactive"
      :loading="loadingRef"
    />
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import executeSql from "@/dao";
import { NTag, useMessage } from "naive-ui";
import { h, onMounted } from "@vue/runtime-core";
import VariableList from "@/views/server/logs/common/VariableList";
export default {
  components: {
    VariableList,
  },
  setup() {
    const message = useMessage();
    const columnsReactive = reactive([
      {
        title: "ID",
        key: "Id",
      },
      {
        title: "来源",
        key: "Host",
      },
      {
        title: "数据库",
        key: "db",
      },
      {
        title: "命令行",
        key: "Command",
        render(r) {
          return h(
            NTag,
            {
              type: "success",
              size: "small",
            },
            () => r.Command
          );
        },
      },
      {
        title: "连接时间",
        key: "Time",
      },
      {
        title: "状态",
        key: "State",
      },
      {
        title: "信息",
        key: "Info",
      },
    ]);
    const dataReactive = reactive([]);
    const loadingRef = ref(false);
    const query = () => {
      loadingRef.value = true;
      executeSql("show processlist").then(
        (res) => {
          console.log(res);
          dataReactive.length = 0;
          res.forEach((element) => {
            dataReactive.push(element);
          });
          loadingRef.value = false;
        },
        () => {
          loadingRef.value = false;
          message.error("查询连接失败");
        }
      );
    };
    const variablesReactive = reactive([
      {
        name: "连接超时时间",
        extra: "connect_timeout",
        readonly: false,
        unit: "秒",
      },
      {
        name: "连接空闲时间",
        extra: "wait_timeout",
        readonly: false,
        unit: "秒",
      },
    ]);
    onMounted(() => {
      query();
    });
    return {
      columnsReactive,
      dataReactive,
      loadingRef,
      variablesReactive,
    };
  },
};
</script>

<style></style>

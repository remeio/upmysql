<template>
  <div>
    <up-icon-header value="事务状态" icon="BarChartOutline" :level="2" />
    <variable-list :data="variablesReactive" />
    <up-icon-header value="事务信息" icon="BarChartOutline" :level="2" />
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
import moment from "moment";
import VariableList from "@/views/server/logs/common/VariableList";
export default {
  components: {
    VariableList,
  },
  setup() {
    const message = useMessage();
    const variablesReactive = reactive([
      {
        name: "事务隔离级别",
        extra: "transaction_isolation",
        readonly: false,
      },
      {
        name: "只读事务",
        extra: "transaction_read_only",
        readonly: false,
      },
      {
        name: "InnoDB 锁等待超时",
        extra: "innodb_lock_wait_timeout",
        readonly: false,
        unit: "秒",
      },
      {
        name: "锁等待超时",
        extra: "lock_wait_timeout",
        readonly: false,
        unit: "毫秒",
      },
       {
        name: "是否开启死锁检测",
        extra: "innodb_deadlock_detect",
        readonly: false,
        unit: "",
      },
    ]);
    const renderTag = function (r) {
      return h(
        NTag,
        {
          type: "success",
          size: "small",
        },
        () => r
      );
    };
    const columnsReactive = reactive([
      {
        title: "事务ID",
        key: "trx_id",
      },
      {
        title: "事务状态",
        key: "trx_state",
        render(r) {
          return renderTag(r.trx_state);
        },
      },
      {
        title: "线程ID",
        key: "trx_mysql_thread_id",
      },
      {
        title: "开始时间",
        key: "trx_started",
        render(r) {
          return moment(r.trx_started).format("yyyy-MM-DD HH:mm:ss SSS");
        },
      },
      {
        title: "使用的表",
        key: "trx_tables_in_use",
      },
      {
        title: "锁住的表",
        key: "trx_tables_locked",
      },
      {
        title: "锁住的行",
        key: "trx_rows_locked",
      },
      {
        title: "修改的行",
        key: "trx_rows_modified",
      },
      {
        title: "隔离级别",
        key: "trx_isolation_level",
        render(r) {
          return renderTag(r.trx_isolation_level);
        },
      },
    ]);
    const dataReactive = reactive([]);
    const loadingRef = ref(false);
    const query = () => {
      loadingRef.value = true;
      executeSql("SELECT * FROM `information_schema`.`INNODB_TRX`").then(
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
          message.error("查询引擎信息失败");
        }
      );
    };
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

<style UpTable></style>

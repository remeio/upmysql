<template>
  <div>
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
export default {
  setup() {
    const message = useMessage();
    const renderTag = function (r, key) {
      return h(
        NTag,
        {
          type:
            r[key] === "YES"
              ? "success"
              : r[key] === "DEFAULT"
              ? "info"
              : "error",
          size: "small",
        },
        () =>
          r[key] === "YES" ? "支持" : r[key] === "DEFAULT" ? "默认" : "不支持"
      );
    };
    const columnsReactive = reactive([
      {
        title: "引擎",
        key: "Engine",
      },
      {
        title: "支持",
        key: "Support",
        render(r) {
          return renderTag(r, "Support");
        },
      },
      {
        title: "描述",
        key: "Comment",
        ellipsis: {
          tooltip: true,
        },
      },
      {
        title: "事务",
        key: "Transactions",
        render(r) {
          return renderTag(r, "Transactions");
        },
      },
      {
        title: "XA事务",
        key: "XA",
        render(r) {
          return renderTag(r, "XA");
        },
      },
      {
        title: "保存点",
        key: "Savepoints",
        render(r) {
          return renderTag(r, "Savepoints");
        },
      },
    ]);
    const dataReactive = reactive([]);
    const loadingRef = ref(false);
    const query = () => {
      loadingRef.value = true;
      executeSql("show engines").then(
        (res) => {
          console.log(res);
          dataReactive.length = 0;
          res.forEach((element) => {
            dataReactive.push(element);
          });
          loadingRef.value = false;
        },
        () => {
          loadingRef.value = true;
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
    };
  },
};
</script>

<style UpTable></style>

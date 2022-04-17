<template>
  <up-icon-header value="执行SQL" icon="InformationCircleOutline" :level="2" />
  <n-grid :cols="1" :y-gap="24">
    <n-gi :span="1">
      <n-input
        type="textarea"
        v-model:value="sqlRef"
        :row-key="id"
        placeholder="请输入要执行的 SQL"
        :loading="loadingRef"
      />
    </n-gi>
    <n-gi :span="1">
      <n-card title="执行结果：">
        <n-scrollbar x-scrollable>
          <div style="white-space: nowrap; padding: 8px">
            <n-code :code="resultRef" :language="'json'" word-wrap inline />
          </div>
        </n-scrollbar>
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script>
import executeSql from "@/dao";
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useMessage } from "naive-ui";
export default {
  setup() {
    const message = useMessage();
    const sqlRef = ref("");
    const resultRef = ref("");
    const loadingRef = ref(false);
    const query = () => {
      loadingRef.value = true;
      executeSql(sqlRef.value.substring(0, sqlRef.value.length - 1)).then(
        (res) => {
          resultRef.value = JSON.stringify(JSON.parse(JSON.stringify(res)), null, "\t");
          message.success("执行成功");
          loadingRef.value = false;
        },
        ({ sqlMessage }) => {
          resultRef.value = sqlMessage;
          message.error("执行失败");
          loadingRef.value = false;
        }
      );
    };
    watch(sqlRef, (newVal) => {
      if (newVal.substring(newVal.length - 1, newVal.length) === ";") {
        query();
      }
    });
    return {
      query,
      sqlRef,
      loadingRef,
      resultRef,
    };
  },
};
</script>

<style></style>

<template>
  <div>
    <n-grid
      :x-gap="12"
      :y-gap="12"
      :cols="LOCAL_CONFIG.style.gridCols"
      style="margin: 4px"
    >
      <n-gi v-for="item in data" :key="item[key]">
        <up-card
          @click.stop="onClickVariable(item)"
          :label="item.name"
          :value="valueComputedFunc(item.value)"
          :extra="item.extra"
          size="small"
          ><up-icon
            icon="Ellipse"
            :color="colorComputedFunc(item.value)"
            v-if="showSwitchComputedFunc(item.value)" /></up-card></n-gi
    ></n-grid>
    <variable-modal :data="variable" v-model="showModal" />
  </div>
</template>

<script>
import { UpCard, UpIcon } from "@/components/common";
import LOCAL_CONFIG from "@/config";
import { reactive, ref } from "@vue/reactivity";
import VariableModal from "./VariableModal.vue";
import { onMounted, provide } from "@vue/runtime-core";
import executeSql from "@/dao";
import { useMessage } from "naive-ui";
export default {
  components: {
    UpCard,
    UpIcon,
    VariableModal,
  },
  props: {
    data: {
      type: Array,
      default: null,
    },
    key: {
      type: String,
      default: "extra",
    },
  },
  setup(props) {
    const message = useMessage();
    const colorComputedFunc = (value) => (value == "ON" ? "green" : "red");
    const showSwitchComputedFunc = (value) => value == "ON" || value == "OFF";
    const valueComputedFunc = (value) => (value ? value : "-");
    const variable = reactive({ data: {} });
    const showModal = ref(false);
    const onClickVariable = function (item) {
      variable.data = item;
      showModal.value = true;
    };
    const whenChangSuccess = (newVal) => {
      variable.data.value = newVal;
    };
    const queryVariablesFunc = () => {
      executeSql("show global variables").then(
        (res) => {
          props.data.forEach((v) => {
            v.value = res.filter((r) => {
              return r.Variable_name == v.extra;
            })[0].Value;
          });
        },
        () => message.error("查询参数信息失败")
      );
    };
    onMounted(() => {
      queryVariablesFunc();
    });
    provide("whenChangSuccess", whenChangSuccess);
    return {
      LOCAL_CONFIG,
      colorComputedFunc,
      showSwitchComputedFunc,
      valueComputedFunc,
      onClickVariable,
      variable,
      showModal,
    };
  },
};
</script>

<style></style>

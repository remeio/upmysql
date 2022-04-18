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
          @click.stop="clickVariable(item)"
          :label="item.name"
          :value="getVariableValueForShowing(item)"
          :extra="item.extra"
          size="small"
        >
          <n-tag
            type="success"
            size="small"
            round
            v-if="item.readonly && item.readonly === true"
          >
            只读 </n-tag
          ><up-icon
            v-else-if="getStatusOfSwitch(item.value)"
            icon="Ellipse"
            :color="getTheColorOfIcon(item.value)" /></up-card></n-gi
    ></n-grid>
    <variable-modal :data="variablesReactive" v-model="showModalRef" />
  </div>
</template>

<script>
import LOCAL_CONFIG from "@/config";
import { reactive, ref, onMounted, provide } from "vue";
import VariableModal from "./VariableModal.vue";
import executeSql from "@/dao";
import { useMessage } from "naive-ui";
export default {
  components: {
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
    status: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const message = useMessage();
    const getTheColorOfIcon = (value) => (value == "ON" ? "green" : "red");
    const getStatusOfSwitch = (value) => value == "ON" || value == "OFF";
    const getVariableValueForShowing = (item) => {
      if (item.value) {
        if (item.unit) {
          return item.value + " (" + item.unit + ")";
        }
        return item.value;
      }
      return "-";
    };
    const variablesReactive = reactive({ data: {} });
    const showModalRef = ref(false);
    const queryVariables = () => {
      executeSql(
        "show global " + (props.status === true ? "status" : "variables")
      ).then(
        (res) => {
          props.data.forEach((v) => {
            let tmp = res.filter((r) => {
              return r.Variable_name == v.extra;
            });
            if (tmp && tmp.length === 1) {
              v.value = tmp[0].Value;
            } else {
              v.value = "不支持";
            }
          });
        },
        () => message.error("查询参数信息失败")
      );
    };
    onMounted(() => {
      queryVariables();
    });
    const clickVariable = function (item) {
      if (props.status === true || (item.readonly && item.readonly === true)) {
        return;
      }
      variablesReactive.data = item;
      showModalRef.value = true;
    };
    const whenChangSuccess = (newVal) => {
      variablesReactive.data.value = newVal;
    };
    provide("whenChangSuccess", whenChangSuccess);
    return {
      LOCAL_CONFIG,
      getTheColorOfIcon,
      getStatusOfSwitch,
      getVariableValueForShowing,
      clickVariable,
      variablesReactive,
      showModalRef,
    };
  },
};
</script>

<style></style>

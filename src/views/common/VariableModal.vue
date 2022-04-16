<template>
  <n-modal :show="showModal">
    <n-card style="width: 400px" title="修改配置">
      <n-form ref="formRef" :label-width="80" :model="formData" :rules="rules">
        <n-form-item label="配置项">
          {{ formData.name }}
        </n-form-item>
        <n-form-item label="额外信息">
          {{
            formData.extra == null || formData.extra == ""
              ? "-"
              : formData.extra
          }}
        </n-form-item>
        <n-form-item label="配置值">
          <n-switch
            checked-value="ON"
            unchecked-value="OFF"
            v-model:value="formData.value"
            v-if="formData.value == 'ON' || formData.value == 'OFF'"
          />
          <n-input
            v-else
            v-model:value="formData.value"
            placeholder="输入配置值"
          />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="end">
          <n-button @click="showModal = false">取消</n-button>
          <n-button type="primary" @click="submitForm" ghost>确定</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script>
import { computed, reactive, ref, watch } from "vue";
import { useMessage } from "naive-ui";
import executeSql from "@/dao";
export default {
  setup(props, context) {
    const message = useMessage();
    const formData = reactive({});
    const rules = reactive({
      value: [
        {
          required: true,
          message: "请输入配置值",
          validator(rule, value) {
            console.log("sads");
            if (!value) {
              return new Error("需要年龄");
            } else if (!/^\d*$/.test(value)) {
              return new Error("年龄应该为整数");
            } else if (Number(value) < 18) {
              return new Error("年龄应该超过十八岁");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
    });
    const formRef = ref(null);
    let showModal = computed({
      get: () => {
        return props.modelValue;
      },
      set: (val) => context.emit("update:modelValue", val),
    });
    watch(props.data, (data) => {
      const n = data.data;
      formData.name = n.name;
      formData.value = n.value;
      formData.extra = n.extra;
    });
    const submitForm = function () {
      formRef.value.validate((errors) => {
        console.log(errors);
        if (errors) {
          return;
        }
        executeSql(
          "set global " + formData.extra + "='" + formData.value + "'"
        ).then(
          function () {
            message.success("设置成功");
            showModal.value = false;
          },
          function () {
            message.error("设置失败");
          }
        );
      });
    };
    return {
      rules,
      formRef,
      formData,
      submitForm,
      showModal,
    };
  },
  props: {
    data: {
      type: Object,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>

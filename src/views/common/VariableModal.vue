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
        <n-form-item label="配置值" path="value">
          <n-switch
            checked-value="ON"
            unchecked-value="OFF"
            v-model:value="formData.value"
            v-if="formData.value == 'ON' || formData.value == 'OFF'"
          />
          <n-input-number
            v-else-if="
              !isNaN(formData.value) &&
              formData &&
              formData.value != null &&
              formData.value != ''
            "
            v-model:value="formData.value"
            clearable
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
import { computed, inject, reactive, ref, watch } from "vue";
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
    watch(showModal, (r) => {
      if (r) {
        const n = props.data.data;
        formData.name = n.name;
        formData.value = n.value;
        formData.extra = n.extra;
      }
    });
    watch(props.data, (data) => {
      const n = data.data;
      formData.name = n.name;
      formData.value = n.value;
      formData.extra = n.extra;
    });
    const whenChangSuccess = inject("whenChangSuccess");
    const submitForm = function () {
      formRef.value.validate((errors) => {
        if (errors) {
          return;
        }
        let tmp = formData.value;
        if (isNaN(formData.value)) {
          tmp = "'" + tmp + "'";
        }
        executeSql("set global " + formData.extra + "=" + tmp).then(
          function () {
            message.success("设置成功");
            showModal.value = false;
            whenChangSuccess(formData.value);
          },
          function ({ sqlMessage }) {
            message.error("设置失败 [" + sqlMessage + "]");
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

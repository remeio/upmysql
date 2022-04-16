<template>
  <n-modal :show="showModalRef">
    <n-card style="width: 400px" title="修改配置">
      <n-form
        ref="formRef"
        :label-width="80"
        :model="formDataReactive"
        :rules="rulesReactive"
      >
        <n-form-item label="配置项">
          {{ formDataReactive.name }}
        </n-form-item>
        <n-form-item label="额外信息">
          {{
            formDataReactive.extra == null || formDataReactive.extra == ""
              ? "-"
              : formDataReactive.extra
          }}
        </n-form-item>
        <n-form-item label="配置值" path="value">
          <n-switch
            checked-value="ON"
            unchecked-value="OFF"
            v-model:value="formDataReactive.value"
            v-if="
              formDataReactive.value == 'ON' || formDataReactive.value == 'OFF'
            "
          />
          <n-input-number
            v-else-if="
              !isNaN(formDataReactive.value) &&
              formDataReactive &&
              formDataReactive.value != null &&
              formDataReactive.value != ''
            "
            v-model:value="formDataReactive.value"
            clearable
          />
          <n-input
            v-else
            v-model:value="formDataReactive.value"
            placeholder="输入配置值"
          />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="end">
          <n-button @click="showModalRef = false">取消</n-button>
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
    const formDataReactive = reactive({});
    const rulesReactive = reactive({
      value: [
        {
          required: true,
          message: "请输入配置值",
          trigger: ["input", "blur"],
        },
      ],
    });
    const formRef = ref(null);
    let showModalRef = computed({
      get: () => {
        return props.modelValue;
      },
      set: (val) => context.emit("update:modelValue", val),
    });
    watch(showModalRef, (r) => {
      if (r) {
        const n = props.data.data;
        formDataReactive.name = n.name;
        formDataReactive.value = n.value;
        formDataReactive.extra = n.extra;
      }
    });
    watch(props.data, (data) => {
      const n = data.data;
      formDataReactive.name = n.name;
      formDataReactive.value = n.value;
      formDataReactive.extra = n.extra;
    });
    const whenChangSuccess = inject("whenChangSuccess");
    const submitForm = function () {
      formRef.value.validate((errors) => {
        if (errors) {
          return;
        }
        let tmp = formDataReactive.value;
        if (isNaN(formDataReactive.value)) {
          tmp = "'" + tmp + "'";
        }
        executeSql("set global " + formDataReactive.extra + "=" + tmp).then(
          function () {
            message.success("设置成功");
            showModalRef.value = false;
            whenChangSuccess(formDataReactive.value);
          },
          function ({ sqlMessage }) {
            message.error("设置失败 [" + sqlMessage + "]");
          }
        );
      });
    };
    return {
      rulesReactive,
      formRef,
      formDataReactive,
      submitForm,
      showModalRef,
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

<template>
  <div>
    <n-tabs type="line" animated size="large">
      <n-tab-pane name="general_log" tab="Literal Values">
        <literal-values />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script>
import LiteralValues from "./LiteralValues.vue";
export default {
  components: {
    LiteralValues,
  },
};
</script>

<style></style>

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
          :label="item.name"
          :value="a"
          :extra="item.extra"
          size="small"
        ></up-card></n-gi
    ></n-grid>
  </div>
</template>

<script>
export default {};
</script>

<style></style>

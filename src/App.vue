<template>
  <div id="app">
    <n-config-provider :hljs="hljs" :theme="theme ? null : darkTheme">
      <n-loading-bar-provider>
        <n-dialog-provider>
          <n-message-provider>
            <n-layout has-sider position="absolute">
              <n-layout-sider
                bordered
                collapse-mode="width"
                :width="240"
                :collapsed-width="64"
                :collapsed="collapsed"
                show-trigger
                @collapse="collapsed = true"
                @expand="collapsed = false"
                :native-scrollbar="nativeScrollbar"
              >
                <n-grid :cols="12" style="text-align: center; margin-top: 48px">
                  <n-gi :span="12"
                    ><n-avatar
                      round
                      :size="40"
                      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                  /></n-gi>
                </n-grid>
                <n-divider dashed></n-divider>
                <n-menu
                  :collapsed="collapsed"
                  :collapsed-width="64"
                  :collapsed-icon-size="22"
                  :options="routerConfig"
                />
                <n-divider dashed></n-divider>
                <n-grid :cols="12" style="text-align: center">
                  <n-gi :span="12"
                    ><n-button
                      text
                      style="font-size: 24px"
                      v-if="theme"
                      @click="switchTheme"
                    >
                      <n-icon size="24" color="black">
                        <SunnyOutline /> </n-icon></n-button
                    ><n-button
                      text
                      style="font-size: 24px"
                      v-else
                      @click="switchTheme"
                    >
                      <n-icon size="20" color="white">
                        <CloudyNight /> </n-icon></n-button
                  ></n-gi>
                </n-grid>
              </n-layout-sider>
              <n-layout
                embedded
                :native-scrollbar="nativeScrollbar"
                :content-style="layoutContentStyle"
              >
                <n-grid :cols="12">
                  <n-gi :span="12" style="margin-bottom: 12px">
                    <n-breadcrumb>
                      <n-breadcrumb-item
                        :key="index"
                        href="#"
                        v-for="(item, index) in routerNameDict[
                          this.$route.path
                        ]"
                      >
                        {{ item }}
                      </n-breadcrumb-item>
                    </n-breadcrumb>
                  </n-gi>
                  <n-gi :span="12">
                    <router-view />
                    <n-back-top :right="100" />
                  </n-gi>
                </n-grid>
              </n-layout>
            </n-layout>
          </n-message-provider>
        </n-dialog-provider>
      </n-loading-bar-provider>
    </n-config-provider>
  </div>
</template>

<script>
import { routerConfig, routerNameDict } from "@/router/router";
import { reactive, ref, provide, computed } from "vue";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);
import { darkTheme } from "naive-ui";
import { CloudyNight, SunnyOutline } from "@vicons/ionicons5";

export default {
  components: {
    CloudyNight,
    SunnyOutline,
  },
  setup() {
    let collapsed = ref(true);
    let nativeScrollbar = ref(false);
    let layoutContentStyle = reactive({
      padding: "24px",
    });
    const theme = ref(true);
    const themeColor = computed(() => (theme.value ? "black" : "white"));
    const switchTheme = () => {
      theme.value = !theme.value;
    };
    provide("appThemeColor", themeColor);
    return {
      collapsed,
      nativeScrollbar,
      layoutContentStyle,
      routerConfig,
      routerNameDict,
      hljs,
      theme,
      darkTheme,
      switchTheme,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

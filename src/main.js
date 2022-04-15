import { createApp } from "vue";
import App from "./App.vue";

// naive-ui 插件
import naive from "naive-ui";
// 路由插件
import { router } from "@/router/router";
// 剪切板插件
import VueClipboard from "vue-clipboard-plus";
VueClipboard.config.autoSetContainer = true;
// 代码高亮插件
import VueHighlightJS from "vue-highlightjs";
import "highlight.js/styles/atom-one-dark.css";

// 创建 APP
const app = createApp(App);
// 使用插件
app.use(naive).use(VueHighlightJS).use(VueClipboard).use(router);
// 挂载
app.mount("#app");

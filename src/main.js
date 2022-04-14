import { createApp } from "vue";
import App from "./App.vue";

// naive-ui 插件
import naive from "naive-ui";
// 路由插件
import { router } from "@/router/router";

// 创建 APP
const app = createApp(App);
// 使用插件
app.use(naive).use(router);
// 挂载
app.mount("#app");

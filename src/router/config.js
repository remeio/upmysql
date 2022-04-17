const routerConfig = [
  {
    label: "MySQL",
    key: "mysql",
    icon: "CubeOutline",
    children: [
      {
        type: "group",
        label: "实用工具",
        key: "utils",
        children: [
          {
            label: "执行 SQL",
            key: "execute_sql",
            icon: "FlashOutline",
            component: import("@/views/utils/SqlExecute.vue"),
          },
        ],
      },
      {
        type: "group",
        label: "服务端管理",
        key: "server",
        children: [
          {
            label: "服务端日志",
            key: "logs",
            icon: "AnalyticsOutline",
            component: import("@/views/logs/Logs.vue"),
          },
          {
            label: "存储引擎",
            key: "engines",
            icon: "HelpBuoyOutline",
            component: import("@/views/server/EngineList.vue"),
          },
        ],
      },
    ],
  },
];

export { routerConfig };

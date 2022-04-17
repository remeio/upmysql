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
            icon: "AnalyticsOutline",
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
            label: "Server Logs",
            key: "logs",
            icon: "AnalyticsOutline",
            component: import("@/views/logs/Logs.vue"),
          },
        ],
      },
    ],
  },
];

export { routerConfig };

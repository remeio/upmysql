const routerConfig = [
  {
    label: "MySQL",
    key: "mysql",
    icon: "CubeOutline",
    children: [
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

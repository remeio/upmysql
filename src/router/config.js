const routerConfig = [
  {
    label: "MySQL",
    key: "mysql",
    icon: "CubeOutline",
    children: [
      {
        type: "group",
        label: "服务端管理",
        key: "variable",
        children: [
          {
            label: "MySQL Server Logs",
            key: "logs",
            icon: "BarChartOutline",
            component: import("@/views/logs/Logs.vue"),
          },
        ],
      },
    ],
  },
];

export { routerConfig };

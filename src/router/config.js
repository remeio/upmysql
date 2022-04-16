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
            label: "日志",
            key: "innodb_buffer_pool",
            icon: "BarChartOutline",
            component: import("@/views/logs/Logs.vue"),
          },
        ],
      },
    ],
  },
];

export { routerConfig };

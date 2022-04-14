const routerConfig = [
  {
    label: "MySQL",
    key: "mysql",
    icon: "CubeOutline",
    children: [
      {
        type: "group",
        label: "参数配置",
        key: "variable",
        children: [
          {
            label: "InnoDB 缓冲池",
            key: "innodb_buffer_pool",
            icon: "BarChartOutline",
            component: import("@/views/InnodbBufferPoolStats.vue"),
          },
        ],
      },
    ],
  },
];

export { routerConfig };

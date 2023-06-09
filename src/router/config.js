const routerConfig = [
  {
    label: "MySQL",
    key: "mysql",
    icon: "CubeOutline",
    children: [
      {
        type: "group",
        label: "InnoDB 存储引擎",
        key: "innodb",
        children: [
          {
            label: "参数列表",
            key: "list",
            icon: "FlashOutline",
            component: () => import("@/views/innodb/InnoDbList.vue"),
          },
          {
            label: "事务状态",
            key: "trx",
            icon: "BarcodeOutline",
            component: () => import("@/views/innodb/InnoDbTrx.vue"),
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
            component: () => import("@/views/server/logs/Logs.vue"),
          },
          {
            label: "存储引擎",
            key: "engines",
            icon: "HelpBuoyOutline",
            component: () => import("@/views/server/EngineList.vue"),
          },
          {
            label: "连接管理",
            key: "processlist",
            icon: "LinkOutline",
            component: () => import("@/views/server/ProcessList.vue"),
          },
        ],
      },
      {
        type: "group",
        label: "实用工具",
        key: "utils",
        children: [
          {
            label: "执行 SQL",
            key: "execute_sql",
            icon: "FlashOutline",
            component: () => import("@/views/utils/SqlExecute.vue"),
          },
        ],
      },
    ],
  },
];

export { routerConfig };

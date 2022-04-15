<template>
  <div>
    <n-tabs type="line" animated size="large">
      <n-tab-pane name="oasis" tab="General Query Log">
        <up-icon-header value="参数信息" icon="BarChartOutline" level="2" />
        <n-grid
          :x-gap="12"
          :y-gap="12"
          :cols="LOCAL_CONFIG.style.gridCols"
          style="margin: 4px"
        >
          <n-gi v-for="item in items" :key="item.name">
            <up-card
              :label="item.name"
              :value="item.value"
              :extra="item.extra"
              size="small"
              ><up-icon
                icon="Ellipse"
                :color="item.value == 'ON' ? 'green' : 'red'"
                v-if="
                  item.value == 'ON' || item.value == 'OFF'
                " /></up-card></n-gi
        ></n-grid>
        <up-icon-header value="日志跟踪" icon="BarChartOutline" level="2" />
        <up-table :query="queryFunc" :columns="columns" />
      </n-tab-pane>
      <n-tab-pane name="the beatles" tab="Slow Query Log">
        Hey Jude
      </n-tab-pane>
      <n-tab-pane name="jay chou" tab="Binary Log"> 七里香 </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { UpIconHeader, UpCard, UpIcon, UpTable } from "@/components/common";
import LOCAL_CONFIG from "@/config";
import query from "@/dao";
export default {
  components: {
    UpCard,
    UpIconHeader,
    UpIcon,
    UpTable,
  },
  setup() {
    let items = reactive([]);
    onMounted(() => {
      console.log(query);
      query("show variables").then((resu) => {
        console.log(resu);
        console.log(items);
        // resu.forEach(element => {
        //   items.push({
        //     name: element.Variable_name,
        //     value: element.Value
        //   })
        // });
      });
    });

    let queryFunc = function (currentPage, pageSize) {
      query("set session sql_log_off='ON'");
      let offset = (currentPage - 1) * pageSize;
      return new Promise((resolve) => {
        query(
          "select event_time as a, convert(argument using utf8) as text from mysql.general_log order by event_time desc limit " +
            offset +
            ", " +
            pageSize
        ).then((resu) => {
          console.log(resu);
          console.log(items);
          let data = [];
          resu.forEach((element) => {
            data.push({
              column1: element.event_time,
              column2: element.text,
            });
          });
          query("select count(1) as count from mysql.general_log").then((s) => {
            resolve({ data: data, total: s[0].count });
          });

          // resu.forEach(element => {
          //   items.push({
          //     name: element.Variable_name,
          //     value: element.Value
          //   })
          // });
        });
      });
    };
    let columns = [
      {
        title: "时间",
        key: "column1",
        sorter: true,
      },
      {
        title: "执行语句",
        key: "column2",
      },
    ];
    return {
      items,
      queryFunc,
      columns,
      LOCAL_CONFIG,
    };
  },
};
</script>

<style></style>

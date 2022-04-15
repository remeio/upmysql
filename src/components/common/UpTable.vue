<template>
  <n-data-table
    remote
    ref="table"
    :columns="columns"
    :data="data"
    :loading="loading"
    :pagination="pagination"
    :row-key="rowKey"
    @update:sorter="handleSorterChange"
    @update:page="handlePageChange"
  />
</template>

<script>
import { ref, reactive, onMounted } from "vue";

export default {
  props: {
    columns: {
      type: Array,
    },
    query: {
      type: Function,
    },
  },
  setup(props) {
    const dataRef = ref([]);
    const loadingRef = ref(false);
    const paginationReactive = reactive({
      page: 1,
      pageCount: 1,
      pageSize: 10,
      prefix({ itemCount }) {
        return `总数 ${itemCount}`;
      },
    });

    let queryData = function (currentPage) {
      console.log("ss");
      debugger;
      if (!loadingRef.value) {
        loadingRef.value = true;
        props
          .query(
            currentPage ? currentPage : paginationReactive.page,
            paginationReactive.pageSize
          )
          .then((data) => {
            dataRef.value = data.data;
            paginationReactive.page = currentPage
              ? currentPage
              : paginationReactive.page;
            paginationReactive.pageCount = data.pageCount;
            paginationReactive.itemCount = data.total;
            loadingRef.value = false;
          });
      }
    };
    onMounted(() => {
      queryData();
    });

    return {
      data: dataRef,
      pagination: paginationReactive,
      loading: loadingRef,
      rowKey(rowData) {
        return rowData.column1;
      },
      handleSorterChange() {
        queryData();
      },
      handlePageChange(currentPage) {
        queryData(currentPage);
      },
    };
  },
};
</script>

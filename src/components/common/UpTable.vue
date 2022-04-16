<template>
  <n-data-table
    remote
    ref="table"
    :columns="columns"
    :data="data"
    :loading="loading"
    :pagination="pagination"
    :row-key="rowKey"
    :max-height="300"
    @update:sorter="handleSorterChange"
    @update:page="handlePageChange"
    @update:page-size="handlePageSizeChange"
  />
</template>

<script>
import { ref, reactive, onMounted } from "vue";

export default {
  name: "UpTable",
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
      pageSizes: [10, 50, 100],
      showSizePicker: true,
      prefix({ itemCount }) {
        return `总数 ${itemCount}`;
      },
    });
    const sorterReactive = reactive({ key: null, order: false });

    const queryDataFunc = function (currentPage) {
      if (!loadingRef.value) {
        loadingRef.value = true;
        props
          .query(
            currentPage ? currentPage : paginationReactive.page,
            paginationReactive.pageSize,
            sorterReactive
          )
          .then(
            (data) => {
              dataRef.value = data.data;
              paginationReactive.page = currentPage
                ? currentPage
                : paginationReactive.page;
              paginationReactive.pageCount = data.pageCount;
              paginationReactive.itemCount = data.total;
              loadingRef.value = false;
            },
            () => {
              loadingRef.value = false;
            }
          );
      }
    };
    onMounted(() => {
      queryDataFunc();
    });

    return {
      data: dataRef,
      pagination: paginationReactive,
      loading: loadingRef,
      rowKey(rowData) {
        return rowData.id;
      },
      handleSorterChange(sorter) {
        sorterReactive.key = sorter.columnKey;
        if (sorter.sorter === false) {
          sorterReactive.order = false;
        } else {
          sorterReactive.order = sorter.order === "ascend" ? "asc" : "desc";
        }
        queryDataFunc();
      },
      handlePageChange(currentPage) {
        queryDataFunc(currentPage);
      },
      handlePageSizeChange(currentPageSize) {
        paginationReactive.pageSize = currentPageSize;
      },
    };
  },
};
</script>

<template>
  <div class="orders">
    <div class="container">
      <h1 class="h1">Заказы</h1>
      <OrderStatuses v-model="filters['filterEQ[status]']" />
      <OrderList :orders="data" />
      <UiPagination
        class="orders-pagination"
        :meta="meta"
        v-model="filters.page"
        :limit="1"
      />
    </div>
  </div>
</template>

<script setup>
const { filters } = useFilters({
  initialFilters: {
    page: 1,
    "filterEQ[status]": ORDERING_STATUS[1],
  },
});

const { data, meta } = await useApi({
  name: "orderings.getAll",
  params: {
    // extends: "ordering_products.product",
    limit: 12,
  },
  filters,
  init: true,
});
</script>

<style lang="scss" scoped>
.orders {
  &-pagination {
    margin-top: 24px;
  }
}
</style>

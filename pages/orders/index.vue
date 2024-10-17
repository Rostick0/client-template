<template>
  <div class="orders">
    <div class="container">
      <h1 class="h1">Заказы</h1>
      <OrderStatuses v-model="filters['filterEQ[status]']" />
      <OrderList :orders="data" />
      <UiPagination
        :meta="meta"
        v-model="filters.page"
       
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

useSeoMeta({
  title: `Мои заказы`,
});
</script>

<style lang="scss" scoped>
.orders {
}
</style>

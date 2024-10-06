<template>
  <div class="orders">
    <div class="container">
      <OrderStatuses v-model="filters['filterEQ[status]']" />
      <OrderList :orders="data" />
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

const { data } = await useApi({
  name: "orderings.getAll",
  params: {
    extends: "ordering_products.product",
    limit: 6,
  },
  filters,
  init: true,
});
</script>

<style lang="scss" scoped>
.orders {
}
</style>

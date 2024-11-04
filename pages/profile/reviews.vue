<template>
  <div class="profile-reviews" id="reviews">
    <h2 class="h2">Купленные товары без отзыва</h2>
    <ProductPreReviews :products="data" />
    <UiPagination
      :meta="meta"
      v-model="filters.page"
      :onClickPage="scrollToSelector('#reviews')"
    />
  </div>
</template>

<script setup>
const { filters } = useFilters({
  initialFilters: {
    page: 1,
  },
});

const { data, meta } = await useApi({
  name: "products.getAll",
  params: {
    doesntHave: "my_review",
    "filterNEQ[my_buy.id]": false,
    limit: 8,
  },
  filters,
  init: true,
});

definePageMeta({
  layout: "profile",
});
</script>

<style lang="scss" scoped>
.profile-reviews {
  scroll-margin: 80px;
}
</style>

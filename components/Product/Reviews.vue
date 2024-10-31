<template>
  <div class="product-reviews">
    <template v-if="myReview">
      <ProductReview :review="myReview" />
      <br />
    </template>
    <ProductReview
      v-for="review in reviews"
      :key="review?.id"
      :review="review"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  reviews: Array,
  myReview: Object,
});
// const reviews = [0, 1, 2, 3].map(() => props.reviews?.[0]);
</script>

<style lang="scss" scoped>
.product {
  &-reviews {
    display: grid;
    grid-gap: 20px;
  }
}
</style>

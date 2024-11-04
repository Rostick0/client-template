<template>
  <div class="pre-reviews">
    <ProductPreReview
      v-for="product in products"
      :key="product?.id"
      :product="product"
      :favoriteProductIsExists="favoriteProductIsExists"
      :favoriteProductToggle="favoriteProductToggle"
      :cartProductIsExists="cartProductIsExists"
      :cartProductToggle="cartProductToggle"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  products: Array,
});

const { favoriteProductIsExists, favoriteProductToggle } = useFavorite();
const { cartProductIsExists, cartProductToggle } = useCart();
</script>

<style lang="scss" scoped>
.pre-reviews {
  display: grid;
  row-gap: 20px;
}
</style>

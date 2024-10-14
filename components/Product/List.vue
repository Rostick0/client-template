<template>
  <div class="product-list">
    <ProductItem
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
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 256px);
  grid-gap: 20px;
}
</style>

<template>
  <div class="product-list">
    <ProductItem
      v-for="product in products"
      :key="product?.id"
      :product="product"
      :favoriteProductIsExists="favoriteProductIsExists"
      :favoriteProductToggle="favoriteProductToggle"
      :productIsExists="productIsExists"
      :productAdd="productAdd"
      :productDelete="productDelete"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  products: Array,
});

const {
  productIsExists: favoriteProductIsExists,
  productToggle: favoriteProductToggle,
} = useFavorite();

const { productIsExists, productAdd, productDelete } = useCart();
</script>

<style lang="scss" scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 256px);
  grid-gap: 20px;
}
</style>

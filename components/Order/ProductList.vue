<template>
  <div class="product-list">
    <OrderProductItem
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
}
</style>

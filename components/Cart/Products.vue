<template>
  <div class="car-products">
    <CartProduct
      v-for="product in products"
      :key="product?.id"
      :product="product"
      :favoriteProductIsExists="favoriteProductIsExists"
      :favoriteProductToggle="favoriteProductToggle"
      :cartProductIsExists="cartProductIsExists"
      :cartProductToggle="cartProductToggle"
      :cartProductRemove="cartProductRemove"
      @updateCount="(...vals) => emits('updateCount', ...vals)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  products: Array,
  cartProductRemove: Function,
});

const emits = defineEmits(["updateCount"]);

const { favoriteProductIsExists, favoriteProductToggle } = useFavorite();

const { cartProductIsExists, cartProductToggle } = useCart();
</script>

<style lang="scss" scoped>
.car-products {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  flex-grow: 1;
}
</style>

<template>
  <div class="car-products">
    <template v-if="!products?.length">
      <UiEmpty>
        Вы ничего не добавили в избранное <br />Хотите это&nbsp;<NuxtLink
          class="link"
          to="/catalog"
          >исправить?</NuxtLink
        ></UiEmpty
      >
    </template>
    <FavoriteProduct
      v-else
      v-for="product in products"
      :key="product?.id"
      :product="product"
      :favoriteProductIsExists="favoriteProductIsExists"
      :favoriteProductToggle="favoriteProductToggle"
      :cartProductIsExists="cartProductIsExists"
      :cartProductToggle="cartProductToggle"
      :favoriteProductRemove="favoriteProductRemove"
      @updateCount="(...vals) => emits('updateCount', ...vals)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  products: Array,
  favoriteProductRemove: Function,
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

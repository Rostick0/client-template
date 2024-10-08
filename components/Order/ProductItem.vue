<template>
  <ProductColumnItem :="props">
    <template #action-addication>
      <div class="product__btns">
        <UiButton class="product__btn" variant="green"
          >Связь с продавцом</UiButton
        >
        <NuxtLink class="d-flex" :to="`/review/${product?.id}`">
          <UiButton class="product__btn">Оставить отзыв</UiButton>
        </NuxtLink>
      </div>
    </template>
  </ProductColumnItem>
</template>

<script setup>
const props = defineProps({
  product: Object,
  favoriteProductIsExists: Function,
  favoriteProductToggle: Function,
  cartProductIsExists: Function,
  cartProductToggle: Function,
});
</script>

<style lang="scss" scoped>
.product {
  &__btns {
    display: grid;
    row-gap: 4px;
  }

  &__btn {
    justify-content: center;
    padding: 4px 8px;
    width: 100%;
  }
}
</style>

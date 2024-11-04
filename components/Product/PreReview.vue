<template>
  <div class="pre-review">
    <ProductColumnItem
      :product="product"
      :favoriteProductIsExists="favoriteProductIsExists"
      :favoriteProductToggle="favoriteProductToggle"
      :cartProductIsExists="cartProductIsExists"
      :cartProductToggle="cartProductToggle"
    >
      <template #action-addication>
        <NuxtLink class="d-flex" :to="`/review/${product?.id}`">
          <UiButton>Оставить отзыв</UiButton>
        </NuxtLink>
      </template>
    </ProductColumnItem>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
  favoriteProductIsExists: Object,
  favoriteProductToggle: Object,
  cartProductIsExists: Object,
  cartProductToggle: Object,
});
</script>

<template>
  <div class="product-review-adding">
    <UiTypography
      class="product-review-adding__title"
      fontSize="6"
      fontWeight="700"
      >Хотите поделиться мнением о товаре?</UiTypography
    >
    <NuxtLink :to="`/review/${product?.id}`">
      <UiButton>Добавить отзыв</UiButton>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
});
</script>

<style lang="scss" scoped>
.product-review-adding {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}
</style>

<template>
  <ProductColumnItem :="props">
    <template #action-addication>
      <div class="product-item-actions__btns">
        <UiButton class="product-item-actions__btn">Связь с продавцом</UiButton>
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
.product-item {
  border-radius: 8px;
  display: flex;
  column-gap: 20px;
  padding: 20px;

  &-image {
    display: flex;
    width: 100%;
    max-width: 192px;

    &__inner {
      padding-top: 100%;
      position: relative;
      width: 100%;
    }
  }

  &-img {
    object-fit: contain;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &-info {
    flex-grow: 1;
  }

  &-actions {
    display: flex;
    align-items: flex-start;
    column-gap: 14px;

    &__icons {
      display: flex;
      column-gap: 10px;
    }

    &__btn {
      padding: 4px 6px;
      //   display: flex;
    }
  }
}
</style>

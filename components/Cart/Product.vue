<template>
  <ProductColumnItem :="props" :price="price">
    <template #info-center>
      <CartInputCounter
        :modelValue="product?.localCount"
        :maxValue="product?.count"
        @update:modelValue="(count) => emits('updateCount', product?.id, count)"
      />
    </template>
  </ProductColumnItem>
</template>

<script setup>
const props = defineProps({
  product: Object,
  favoriteProductIsExists: Function,
  favoriteProductToggle: Function,
});

const emits = defineEmits(["updateCount"]);

const price = computed(() =>
  formatNumber(props.product?.price * props.product?.localCount)
);
</script>

<style lang="scss" scoped>
.car-product {
  border-radius: 8px;
  display: flex;
  column-gap: 20px;
  padding: 20px;
  position: relative;

  &::before {
    border-radius: 8px;
  }

  &__image {
    width: 100%;
    max-width: 192px;

    &_inner {
      display: flex;
      padding-top: 100%;
      position: relative;
    }
  }

  &__img {
    object-fit: contain;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    &_top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    &_center {
      display: flex;
      justify-content: space-between;
    }

    &_bottom {
      margin-top: auto;
      // flex-grow: 1;
    }
  }

  &__name {
    font-weight: 500;
  }

  &__actions {
    display: flex;
    column-gap: 10px;
  }

  &__favorite_icon {
    &.active {
      fill: rgb(var(--color-blue-light));
    }
  }
}
</style>

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
  cartProductIsExists: Function,
  cartProductToggle: Function,
  cartProductRemove: Function,
});

const emits = defineEmits(["updateCount"]);

const price = computed(() =>
  formatFloatNumber(props.product?.price * props.product?.localCount)
);
</script>

<style lang="scss" scoped></style>

<template>
  <ProductColumnItem :="props">
    <template #info-center>
      <!-- <CartInputCounter
        :modelValue="product?.localCount"
        :maxValue="product?.count"
        @update:modelValue="(count) => emits('updateCount', product?.id, count)"
      /> -->
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
  favoriteProductRemove: Function,
});

// const emits = defineEmits(["updateCount"]);
</script>

<style lang="scss" scoped></style>

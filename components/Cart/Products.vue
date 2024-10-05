<template>
  <div class="car-products">
    <CartProduct
      v-for="product in products"
      :key="product?.id"
      :product="product"
      @updateCount="(...vals) => emits('updateCount', ...vals)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  products: Array,
});

const emits = defineEmits(["updateCount"]);
</script>

<style lang="scss" scoped>
.car-products {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  flex-grow: 1;

 
}
</style>

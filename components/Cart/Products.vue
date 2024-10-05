<template>
  <div class="car-products">
    <CartProduct
      v-for="product in products"
      :key="product?.id"
      :product="product"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  products: Array,
});
</script>

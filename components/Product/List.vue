<template>
  <div class="product-list">
    <ProductItem
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

<style lang="scss" scoped>
.product-list {
    display: grid;
    row-gap: 20px;
}
</style>
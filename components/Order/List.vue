<template>
  <div class="orders">
    <OrderItem v-for="order in orders" :key="order?.id" :order="order" />
  </div>
</template>

<script setup>
const props = defineProps({
  orders: Array,
});
</script>

<style lang="scss" scoped>
.orders {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>

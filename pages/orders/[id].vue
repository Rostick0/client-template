<template>
  <div class="order">
    <div class="container">
      <div class="order-top">
        <h1 class="h1">Заказ №{{ id }}</h1>
      </div>
      <div class="order-center">
        <div class="order-info"></div>
      </div>
      <div class="order-bottom">
        <div class="order-products">
          <ProductList :products="products" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "~/api";

const route = useRoute();
const id = route.params?.id;

const data = await api.orderings
  .get({
    id,
    params: {
      extends: "ordering_products.product",
    },
  })
  .then((res) => res?.data);

const products = data?.ordering_products?.map((item) => item?.product);
// console.log(data);
</script>

<style lang="scss" scoped>
.order {
}
</style>

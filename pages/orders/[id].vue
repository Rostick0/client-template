<template>
  <div class="order">
    <div class="container">
      <h1 class="h1">Заказ №{{ id }}</h1>
    </div>
  </div>
</template>

<script setup>
import api from "~/api";

const route = useRoute();
const id = route.params?.id;

const data = await api.orderings
  .get({ id, params: {} })
  .then((res) => res?.data);

console.log(data);
</script>

<style lang="scss" scoped>
.order {
}
</style>

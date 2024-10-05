<template>
  <div class="cart">
    <div class="container">
      <h1 class="h1">Корзина</h1>
      <div class="">
        <CartProducts :products="data" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { cartProductIds } = useCart();

const { data, get } = await useApi({
  name: "products.getAll",
  params: {
    extends: "images.image",
    "filterIN[id]": cartProductIds.value?.join(),
  },
});

await get();
</script>

<style lang="scss" scoped>
.cart {
}
</style>

<template>
  <div class="cart">
    <div class="container">
      <h1 class="h1">Корзина</h1>
      <div class="cart__content">
        <CartProducts
          :products="data"
          :cartProductRemove="cartProductRemove"
          @updateCount="updateCount"
        />
        <CartPayment :cartProduct="cartProduct" :products="data" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { cartProduct } = useCart();

const { data, get } = await useApi({
  name: "products.getAll",
  params: {
    extends: "images.image",
    "filterIN[id]": cartProduct.value?.map((item) => item?.id).join(),
  },
});
await get();

data.value = data.value
  ? [...data.value].map((item) => ({
      ...item,
      localCount: cartProduct.value?.find((el) => el?.id === item?.id)
        ?.localCount,
    }))
  : [];

const updateCount = (productId, count) =>
  (data.value[
    data.value.findIndex((item) => item?.id === productId)
  ].localCount = count);

const cartProductRemove = (productId) => {
  const dataTemp = [...data.value];
  dataTemp.splice(
    data.value.findIndex((item) => item?.id === productId),
    1
  );
  data.value = dataTemp;
};

useSeoMeta({
  title: `Моя корзина`,
});
</script>

<style lang="scss" scoped>
.cart {
  &__content {
    display: flex;
    align-items: flex-start;
    column-gap: 32px;
  }
}
</style>

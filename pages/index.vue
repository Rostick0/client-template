<template>
  <div class="page-main">
    <div class="container">
      <div class="page-main__container">
        <div class="page-main__slider">
          <MainSlider />
        </div>
        <div class="page-main__item">
          <h2 class="h2">Новинки</h2>
          <ProductList class="page-main__products" :products="products" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "~/api";

const products = await api.products
  .getAll({
    params: {
      //   "filterEQ[name]": route.params?.catalog_name,
      sort: "id",
      limit: 5,
    },
  })
  .then((res) => res?.data);

// const posts = await api.

useSeoMeta({
  title: `JShoP - товары на любой вкус и цвет`,
});
</script>

<style lang="scss" scoped>
.page-main {
  &__container {
    display: flex;
    flex-direction: column;
    row-gap: 52px;
  }

  &__products {
    display: flex;
    padding: 10px 10px 20px;
    margin: -10px -10px -20px;
    overflow: auto;
  }
}
</style>

<style lang="scss">
.page-main {
  .product {
    flex-shrink: 0;
    width: 256px;
  }
}
</style>

<template>
  <div class="page-main">
    <div class="container">
      <div class="page-main__container">
        <div class="page-main__slider">
          <MainSlider />
        </div>

        <!-- {{ categories }} -->
        <div class="page-main__item">
          <div class="page-main__item_top">
            <h2>Категории</h2>
          </div>
          <MainCategories
            :categories="categories"
          />
        </div>

        <div class="page-main__item">
          <div class="page-main__item_top">
            <h2>Новинки</h2>
          </div>
          <ProductList class="page-main__shadows-elems" :products="products" />
        </div>

        <div class="page-main__item">
          <div class="page-main__item_top">
            <h2>Последние новости</h2>
          </div>
          <PostList class="page-main__shadows-elems" :posts="posts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "~/api";

const categories = await api.categories
  .getAll({
    params: {
      extends: "image.image",
      //   "filterEQ[name]": route.params?.catalog_name,
      sort: "id",
      limit: 5,
    },
  })
  .then((res) => res?.data);

const products = await api.products
  .getAll({
    params: {
      //   "filterEQ[name]": route.params?.catalog_name,
      sort: "id",
      limit: 5,
    },
  })
  .then((res) => res?.data);

const posts = await api.products
  .getAll({
    params: {
      //   "filterEQ[name]": route.params?.catalog_name,
      sort: "id",
      limit: 4,
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

  &__item {
    &_top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
    }
  }

  &__shadows-elems {
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

  .post {
    flex-shrink: 0;
    width: 330px;
    // df
  }
}
</style>

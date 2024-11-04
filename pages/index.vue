<template>
  <div class="page-main">
    <div class="container">
      <div class="page-main__container">
        <div class="page-main__slider">
          <MainSlider :slides="slides" />
        </div>

        <div class="page-main__item">
          <div class="page-main__item_top">
            <h2>Каталог</h2>
            <NuxtLink class="link" to="/catalog">Ещё</NuxtLink>
          </div>
          <CategoryList
            class="page-main__shadows-elems"
            :categories="categories"
          />
        </div>

        <div class="page-main__item">
          <div class="page-main__item_top">
            <h2>Новинки</h2>
          </div>
          <ProductList
            class="page-main__shadows-elems page-main__flex"
            :products="products"
          />
        </div>

        <div class="page-main__item">
          <div class="page-main__item_top">
            <h2>Производители</h2>
            <NuxtLink class="link" to="/vendors">Ещё</NuxtLink>
          </div>
          <VendorList class="page-main__shadows-elems" :vendors="vendors" />
        </div>

        <div class="page-main__item">
          <div class="page-main__item_top">
            <h2>Последние новости</h2>
            <NuxtLink class="link" to="/posts">Ещё</NuxtLink>
          </div>
          <PostList
            class="page-main__shadows-elems page-main__flex"
            :posts="posts"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "~/api";

const slides = await api.slides
  .getAll({
    params: {
      extends: "image.image",
    },
  })
  .then((res) => res?.data);

// console.log(slides);

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

const posts = await api.posts
  .getAll({
    params: {
      sort: "id",
      limit: 4,
    },
  })
  .then((res) => res?.data);

const vendors = await api.vendors
  .getAll({
    params: {
      sort: "id",
      limit: 8,
    },
  })
  .then((res) => res?.data);

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

  &__flex {
    display: flex;
  }

  &__shadows-elems {
    flex-wrap: nowrap;
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

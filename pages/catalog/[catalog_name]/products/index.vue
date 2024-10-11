<template>
  <!-- {{ data }} -->
  <div class="catalog">
    <div class="container">
      <!-- <h1 class="h1 catalog__h1">{{ $t(data?.[0]) }}</h1> -->
      <div class="catalog-content">
        <div class="catalog-content__filter"></div>
        <div class="catalog-content__products">
          <ProductList :products="data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "~/api";

const route = useRoute();

// const { data: catalogData, get: catalogGet } = await useApi({
//   name: "categories.getAll",
//   params: {
//     "filterEQ[name]": route.params?.catalog_name,
//     limit: 1,
//   },
// });
// await catalogGet();

const catalogData = await api.categories.getAll({
  params: {
    "filterEQ[name]": route.params?.catalog_name,
    limit: 1,
  },
});

if (!catalogData?.data?.[0]) throw navigateTo("/404");

const { data, get } = await useApi({
  name: "products.getAll",
  params: {
    "filterEQ[category.name]": route.params?.catalog_name,
  },
});
await get();
</script>

<style lang="scss" scoped>
.catalog {
  &-content {
    display: flex;
    align-items: flex-start;
    column-gap: 32px;

    &__products {
      flex-grow: 1;
    }
  }
}
</style>

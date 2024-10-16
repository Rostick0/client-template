<template>
  <div class="catalog">
    <div class="container">
      <div class="catalog__top">
        <h1 class="catalog__h1 h1">{{ $t(catalogData?.name) }}</h1>
        {{ withNumWord(meta?.total, ["товар", "товара", "товаров"]) }}
      </div>
      <div class="catalog-content">
        <div class="catalog-content__left">
          <CatalogFilter :filters="filtersProperties" />
        </div>
        <div class="catalog-content__right">
          <CatalogSort
            :sorts="sorts"
            :sort="filters.sort"
            @updateSort="updateSort"
          />
          <ProductList :products="data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "~/api";
import debounce from "lodash/debounce";

const route = useRoute();

// const { data: catalogData, get: catalogGet } = await useApi({
//   name: "categories.getAll",
//   params: {
//     "filterEQ[name]": route.params?.catalog_name,
//     limit: 1,
//   },
// });
// await catalogGet();

const catalogData = await api.categories
  .getAll({
    params: {
      "filterEQ[name]": route.params?.catalog_name,
      limit: 1,
    },
  })
  .then((res) => res?.data?.[0]);

// if (!catalogData) throw navigateTo("/404");

const { filters } = useFilters({
  initialFilters: {
    sort: "id",
  },
});

const { data: propertiesData, get: propertiesGet } = await useApi({
  name: "properties.getAll",
  params: {
    "filterEQ[property_categories.category.name]": catalogData?.name,
    extends: "property_values,property_type",
  },
});
await propertiesGet();

const filtersProperties = ref(setProperties(propertiesData.value));

watch(
  () => filtersProperties.value,
  debounce((cur) => {
    const data = setPropertyValues(cur);

    const {
      "filterSomeEQ[product_properties]": filterSomeEQ,
      "filterSomeIN[product_properties]": filterSomeIN,
      ...otherFilters
    } = filters.value;

    filters.value = { ...otherFilters, ...data };
  }, 500),
  {
    deep: 3,
  }
);

const { data, get, meta } = await useApi({
  name: "products.getAll",
  params: {
    "filterEQ[category.name]": route.params?.catalog_name,
  },
  filters,
});
await get();

const sorts = [
  {
    name: "По цене",
    value: "price",
  },
  {
    name: "По новизне",
    value: "id",
  },
  {
    name: "По названию",
    value: "title",
  },
  {
    name: "По рейтингу",
    value: "raiting",
  },
];

const updateSort = (value) => {
  if (filters.value.sort?.replace?.("-", "") === value) {
    filters.value.sort = filters.value.sort?.startsWith?.("-", 0)
      ? value
      : "-" + value;
    return;
  }

  filters.value.sort = value;
};
</script>

<style lang="scss" scoped>
.catalog {
  &__top {
    margin-bottom: 40px;
  }

  &__h1 {
    margin-bottom: 0;
  }

  &-content {
    display: flex;
    align-items: flex-start;
    column-gap: 40px;

    &__right {
      flex-grow: 1;
    }
  }
}
</style>

<template>
  <div class="catalog">
    <div class="container">
      <div class="catalog__top">
        <h1 class="catalog__h1 h1">{{ catalogData?.name }}</h1>
        {{ withNumWord(meta?.total ?? 0, ["товар", "товара", "товаров"]) }}
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
          <UiPagination :meta="meta" v-model="filters.page" />
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
      "filterEQ[link_name]": route.params?.catalog_name,
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
    "filterEQ[property_categories.category.link_name]": catalogData?.name,
    extends: "property_values,property_type",
  },
});
await propertiesGet();

const min_price = {
  name: "filterGEQ[price]",
  type: "input",
  modelValue: null,
  is_property: false,

  bind: {
    label: "Цена (₽)",
    placeholder: "От",
    maska: "#S.##",
    maskaTokens: "S:[0-9]:multiple",
  },
};

const max_price = {
  name: "filterLEQ[price]",
  type: "input",
  modelValue: null,
  is_property: false,

  bind: {
    placeholder: "До",
    maska: "#S.##",
    maskaTokens: "S:[0-9]:multiple",
    type: "number",
  },
};

const filtersProperties = ref({
  properties: setProperties(propertiesData.value),
  other: [[min_price, max_price]],
});

watch(
  () => filtersProperties.value,
  debounce((cur) => {
    const properties = setPropertyValues(cur.properties);
    const other = setOtherValues(cur.other);

    const filterData = {
      page: filters.value.page,
      sort: filters.value.sort,
      ...properties,
      ...other,
    };

    filters.value = filterData;
  }, 750),
  {
    deep: 4,
  }
);

const { data, get, meta } = await useApi({
  name: "products.getAll",
  params: {
    "filterEQ[category.link_name]": route.params?.catalog_name,
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

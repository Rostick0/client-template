<template>
  <div class="container">
    <h1 class="h1">{{ category?.name }}</h1>
    <VFormComponent :field="name" />
    <br />
    <CategoryList class="page-main__shadows-elems" :categories="data" />
    <UiPagination :meta="meta" v-model="filters.page" />
  </div>
</template>

<script setup>
import api from "~/api";
import debounce from "lodash/debounce";

const route = useRoute();
// const category = laptops_accessories

const category = await api.categories
  .getAll({
    params: {
      "filterEQ[link_name]": route.params.catalog_name,
      extendsCount: "products,children",
    },
  })
  .then((res) => res?.data?.[0]);

if (isCategoryWithProducts(category)) {
  navigateTo(route.path + "/products");
}

const { filters } = useFilters({
  withQueryParams: true,
  withInitQueryParams: true,
});

const { data, get } = await useApi({
  name: "categories.getAll",
  params: {
    extends: "image.image",
    "filterEQ[parent_id]": category?.id,
  },
  filters,
});
await get();

const name = ref({
  type: "text",
  name: "filterLIKE[name]",
  rules: "max:255",
  modelValue: filters.value["filterLIKE[name]"],

  bind: {
    label: "Напишите название категории",
    placeholder: "Поиск категории",
  },
});

watch(
  () => name.value.modelValue,
  debounce((cur) => {
    filters.value[name.value.name] = cur;
    filters.value.page = 1;
  }, 500)
);
</script>

<style lang="scss" scoped>
.catalog {
}
</style>

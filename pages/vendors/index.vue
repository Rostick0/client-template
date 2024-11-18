<template>
  <div class="container">
    <h1 class="h1">Бренды</h1>
    <VFormComponent :field="name" />
    <br />
    <VendorList :vendors="data" />
    {{ meta }}
    <UiPagination :meta="meta" v-model="filters.page" />
  </div>
</template>

<script setup>
import debounce from "lodash/debounce";

const { filters } = useFilters({
  withQueryParams: true,
  withInitQueryParams: true,
});

const { data, get, meta } = await useApi({
  name: "vendors.getAll",
  params: {
    limit: 35,
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
    label: "Напишите название производителя",
    placeholder: "Поиск производителя",
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

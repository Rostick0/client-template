<template>
  <div class="container">
    <h1 class="h1">Категории</h1>
    <!-- <VFormComponent :field="name" /> -->
    <CategoryList class="page-main__shadows-elems" :categories="data" />
    <UiPagination :meta="meta" v-model="filters.page" />
  </div>
  <!-- {{data}} -->
</template>

<script setup>
const { filters } = useFilters({
  initialFilters: {},
});

const { data, get } = await useApi({
  name: "categories.getAll",
  params: {
    extends: "image.image",
  },
});
await get();

// const name = ref({
//   type: "text",
//   name: "name",
//   rules: "required|max:255",
//   modelValue: "Мой новый заказ",

//   bind: {
//     placeholder: "",
//   },
// });
</script>

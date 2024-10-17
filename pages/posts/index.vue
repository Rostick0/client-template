<template>
  <div class="posts">
    <div class="container">
      <!-- <CatalogSort
        :sorts="sorts"
        :sort="filters.sort"
        @updateSort="updateSort"
      /> -->
      <PostList :posts="data" />
      <UiPagination :meta="meta" v-model="filters.page" />
    </div>
  </div>
</template>

<script setup>
const { filters } = useFilters({
  initialFilters: {
    sort: "id",
    page: 1,
  },
});

const { data, get, meta } = await useApi({
  name: "posts.getAll",
  params: {
    // extends: "property_values,property_type",
  },
  filters,
});
await get();
</script>

<style lang="scss" scoped>
.posts {
}
</style>

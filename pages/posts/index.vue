<template>
  <div class="posts">
    <div class="container">
      <PostRubrics
        :rubrics="rubricsData"
        :rubricIdActive="filters['filterEQ[rubric_id]']"
        @updateRubric="(id) => (filters['filterEQ[rubric_id]'] = id)"
      />
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
    // "filterEQ[rubric_id]": null,
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

const { data: rubricsData, get: rubricsGet } = await useApi({
  name: "rubrics.getAll",
  params: {},
});
await rubricsGet();
</script>

<style lang="scss" scoped>
.posts {
}
</style>

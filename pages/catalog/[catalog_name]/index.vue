<template>
  {{ data }}
  <div class="catalog">
    <div class="container">
          
    </div>
  </div>
</template>

<script setup>
const { data, get } = await useApi({
  name: "categories.getAll",
  params: {
    // extends: "image",
  },
});

await get();
</script>

<style lang="scss" scoped>
.catalog {
}
</style>

<template>1</template>

<script setup>
// const a =
const route = useRoute();

const id = route.params["product-id"];

useSeoMeta({
  title: `Отзыв на продукт #${id}`,
});
</script>

<template>
  <div class="post-list">
    <PostItem v-for="post in posts" :key="post?.id" :post="post" />
  </div>
</template>

<script setup>
const props = defineProps({
  posts: Array,
});
</script>

<style lang="scss" scoped>
.post-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 330px);
  grid-gap: 20px;
}
</style>

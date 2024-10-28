<template>
  <div class="post-info">
    <PostItemInfoTop :post="post" />
    <h1 class="post-info__title">{{ post?.title }}</h1>
    <p class="post-info__description">{{ post?.description }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  post: Object,
});
</script>

<style lang="scss" scoped>
.post-info {
  margin-bottom: 20px;

  &__title {
    margin-bottom: 12px;
  }

  &__description {
  }
}
</style>

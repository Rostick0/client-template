<template>
  <div class="post box-shadow-default-hover">
    <NuxtLink class="post-image" :to="`/posts/${post?.link_name}`">
      <div class="post-image__inner">
        <img
          class="post-img"
          :src="post?.main_image?.image?.path_webp"
          :alt="post?.title"
          v-lazy-load
          decoding="async"
          loading="lazy"
          width="285"
          height="188"
        />
      </div>
    </NuxtLink>
    <div class="post-info">
      <PostItemInfoTop :post="post" />
      <NuxtLink class="post-info__title" :to="`/posts/${post?.link_name}`">
        {{ post?.title }}
      </NuxtLink>
      <p class="post-info__description">{{ post?.description }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  post: Object,
});
</script>

<style lang="scss" scoped>
.post {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 20px;
  height: fit-content;

  &-image {
    display: flex;
    width: 100%;

    &__inner {
      padding-top: 66%;
      width: 100%;
      position: relative;
    }
  }

  &-img {
    object-fit: contain;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &-info {
    flex-grow: 1;

    &__title {
      display: inline-block;
      font-weight: 500;
      margin-bottom: 8px;
    }

    &__review {
      font-size: 14px;
      margin-bottom: 10px;
      // font-weight: 500;
    }
  }
}
</style>

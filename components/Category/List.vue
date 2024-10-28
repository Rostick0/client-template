<template>
  <div class="categories">
    <NuxtLink
      class="category box-shadow-default-hover"
      v-for="category in categories"
      :key="category?.id"
      :to="`/catalog/${category?.link_name}/products`"
    >
      <div class="category__image">
        <img
          class="category__img"
          :src="category?.image?.image?.path_webp"
          :alt="category?.name"
          v-lazy-load
          decoding="async"
          loading="lazy"
          width="290"
          height="174"
        />
      </div>
      <div class="category__title">{{ category?.name }}</div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  categories: Array,
});
</script>

<style lang="scss" scoped>
.categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}

.category {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;

  &__image {
    padding-top: 60%;
    margin-bottom: 10px;
    position: relative;
    width: 100%;
  }

  &__img {
    display: flex;
    object-fit: contain;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div class="product box-shadow-default-hover">
    <div class="product-image">
      <div class="product-image__inner">
        <img
          class="product-img"
          :src="product?.main_image?.image?.path_webp"
          :alt="product?.title"
          v-lazy-load
          decoding="async"
          loading="lazy"
        />
      </div>
    </div>
    <div class="product-info">
      <div class="product-info__top">
        <NuxtLink
          class="product-info__title"
          :to="`/products/${product?.link_name}`"
          >{{ product?.title }}</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
});
</script>

<style lang="scss" scoped>
.product {
  border-radius: 8px;
  display: flex;
  padding: 20px;

  &-image {
    display: flex;
    width: 100%;
    max-width: 240px;

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
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>

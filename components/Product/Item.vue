<template>
  <div class="product box-shadow-default-hover">
    <NuxtLink class="product-image" :to="`/products/${product?.link_name}`">
      <div class="product-image__inner">
        <img
          class="product-img"
          :src="product?.main_image?.image?.path_webp"
          :alt="product?.title"
          v-lazy-load
          decoding="async"
          loading="lazy"
          width="200"
          height="132"
        />
      </div>
    </NuxtLink>
    <div class="product-info">
      <div class="product-info__prices">
        <span class="product-info__price"
          >{{ formatNumber(product?.price) }}&nbsp;₽</span
        >
        <del class="product-info__price-del" v-if="product?.old_price"
          >{{ formatNumber(product?.old_price) }}&nbsp;₽</del
        >
      </div>
      <NuxtLink
        class="product-info__title"
        :to="`/products/${product?.link_name}`"
        >{{ product?.title }}</NuxtLink
      >
      <div class="product-info__review">
        <IconStar />&nbsp;{{ formatFloatNumber(product?.raiting) }}
      </div>
      <div class="product-info__action">
        <UiButton
          class="product-info__action_btn d-flex"
          @click="favoriteProductToggle(product?.id)"
          variant="outlined"
          title="Добавить в избранное"
        >
          <IconFavorite />
        </UiButton>
        <UiButton
          class="product-info__action_btn d-flex"
          @click="cartProductToggle({ productId: product?.id })"
          title="Добавить в корзину"
        >
          <IconCart v-if="cartProductIsExists(product?.id)" />
          <IconDelete v-else />
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
  favoriteProductIsExists: Function,
  favoriteProductToggle: Function,
  cartProductIsExists: Function,
  cartProductToggle: Function,
});
</script>

<style lang="scss" scoped>
.product {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 20px;
  height: fit-content;

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
    font-weight: 500;

    &__prices {
      display: flex;
      align-items: center;
      column-gap: 8px;
    }

    &__price {
      color: rgb(var(--color-blue-light));
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 2px;

      &-del {
        color: rgb(var(--color-red), 0.8);
        font-size: 14px;
      }
    }

    &__title {
      display: inline-block;
      margin-bottom: 8px;
    }

    &__review {
      font-size: 14px;
      margin-bottom: 10px;
      // font-weight: 500;
    }

    &__action {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 8px;

      &_btn {
        border-radius: 4px;
        justify-content: center;
        padding: 6px;
      }
    }
  }
}
</style>

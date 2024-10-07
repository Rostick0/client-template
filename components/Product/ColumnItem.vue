<template>
  <div class="car-product box-shadow-default-hover">
    <div class="car-product__image">
      <div class="car-product__image_inner">
        <img
          class="car-product__img"
          :src="product?.main_image?.image?.path_webp"
          :alt="product?.title"
          v-lazy-load
          decoding="async"
          loading="lazy"
          width="192"
          height="192"
        />
      </div>
    </div>
    <div class="car-product__info">
      <div class="car-product__info_top">
        <NuxtLink
          class="car-product__name"
          :to="`/products/${product?.link_name}`"
        >
          {{ product?.title }}
        </NuxtLink>
        <div class="">
          <div class="car-product__actions">
            <button class="d-flex" @click="favoriteProductToggle(product?.id)">
              <IconFavorite
                class="car-product__favorite_icon"
                :class="{ active: favoriteProductIsExists(product?.id) }"
              />
            </button>
            <button
              class="d-flex"
              @click="
                cartProductIsExists(product?.id) &&
                  props?.cartProductRemove?.(product?.id),
                  cartProductToggle({ productId: product?.id, localCount: 1 })
              "
            >
              <IconDelete v-if="cartProductIsExists(product?.id)" />
              <IconCart v-else fill="rgb(var(--color-blue-light))" />
            </button>
          </div>
          <slot name="action-addication" />
        </div>
      </div>
      <div class="car-product__info_center">
        <div class="">
          <slot name="info-center" />
        </div>
        <div class="car-product__price">
          {{ price ?? product?.price }}&nbsp;₽
        </div>
      </div>
      <div class="car-product__info_bottom">
        <div class="car-product__count">
          В наличии:&nbsp;<strong>{{ product?.count }}</strong>
        </div>
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
  cartProductRemove: Function,
  price: [String, Number],
});
</script>

<style lang="scss" scoped>
.car-product {
  border-radius: 8px;
  display: flex;
  column-gap: 20px;
  padding: 20px;
  position: relative;

  &::before {
    border-radius: 8px;
  }

  &__image {
    width: 100%;
    max-width: 192px;

    &_inner {
      display: flex;
      padding-top: 100%;
      position: relative;
    }
  }

  &__img {
    object-fit: contain;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    &_top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    &_center {
      display: flex;
      justify-content: space-between;
    }

    &_bottom {
      margin-top: auto;
      // flex-grow: 1;
    }
  }

  &__name {
    font-weight: 500;
  }

  &__actions {
    display: flex;
    column-gap: 10px;
  }

  &__favorite_icon {
    &.active {
      fill: rgb(var(--color-blue-light));
    }
  }
}
</style>

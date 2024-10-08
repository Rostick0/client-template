<template>
  <div class="car box-shadow-default-hover">
    <div class="car__image">
      <div class="car__image_inner">
        <img
          class="car__img"
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
    <div class="car__info">
      <div class="car__info_top">
        <NuxtLink
          class="car__name"
          :to="`/products/${product?.link_name}`"
        >
          {{ product?.title }}
        </NuxtLink>
        <div class="">
          <div class="car__actions">
            <button class="d-flex" @click="favoriteProductToggle(product?.id)">
              <IconFavorite
                class="car__favorite_icon"
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
        </div>
      </div>
      <div class="car__info_center">
        <div class="">
          <slot name="info-center" />
        </div>
        <div class="car__price">
          <del class="car__price_del">{{ product?.old_price }}</del>
          <div class="car__price_current">
            {{ price ?? product?.price }}&nbsp;₽
          </div>
        </div>
      </div>
      <div class="car__info_bottom">
        <div class="car__count">
          В наличии:&nbsp;<strong>{{ product?.count }}</strong>
        </div>
        <slot name="action-addication" />
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
.car {
  border-radius: 8px;
  display: flex;
  column-gap: 16px;
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
      margin-bottom: 10px;
    }

    &_center {
      display: flex;
      justify-content: space-between;
    }

    &_bottom {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: auto;
    }
  }

  &__name {
    font-size: 18px;
    font-weight: 500;
  }

  &__price {
    display: flex;
    align-items: flex-end;
    column-gap: 6px;

    &_del {
      color: rgb(var(--color-red));
      font-size: 14px;
    }

    &_current {
      font-weight: 700;
    }
  }

  &__actions {
    display: flex;
    column-gap: 4px;
  }

  &__favorite_icon {
    &.active {
      fill: rgb(var(--color-blue-light));
    }
  }
}
</style>

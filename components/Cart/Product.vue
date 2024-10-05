<template>
  <div class="car-product">
    <div class="car-product__image">
      <div class="car-product__image_inner">
        <img
          class="car-product__img"
          :src="product?.images?.[0]?.image?.path_webp"
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
        <div class="car-product__name">
          {{ product?.title }}
        </div>
        <div class="car-product__actions">
          <button class="d-flex" @click="favoriteProductToggle(product?.id)">
            <IconFavorite
              class="car-product__favorite_icon"
              :class="{ active: favoriteProductIsExists(product?.id) }"
            />
          </button>
          <button class="d-flex">
            <IconDelete />
          </button>
        </div>
      </div>
      <div class="car-product__info_center">
        <CartInputCounter />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
});

const { productDelete } = useCart();
const {
  productIsExists: favoriteProductIsExists,
  productToggle: favoriteProductToggle,
} = useFavorite();

// const isFavorite = ref(favoriteProductIsExists(props.product?.id));
</script>

<style lang="scss" scoped>
.car-product {
  display: flex;
  align-items: flex-start;
  column-gap: 20px;

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

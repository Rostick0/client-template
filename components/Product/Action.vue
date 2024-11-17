<template>
  <div class="product-action">
    <div class="product-price">
      <del class="product-price__del" v-if="product?.old_price">
        {{ formatNumber(product?.old_price) }}&nbsp;₽
      </del>
      <div class="product-price__value">
        {{ formatNumber(product?.price) }}&nbsp;₽
      </div>
    </div>
    <UiButton
      class="product__favorite"
      :variant="favoriteProductIsExists(product?.id) ? 'standart' : 'outlined'"
      @click="favoriteProductToggle(product?.id)"
    >
      <IconFavorite
        class="product__favorite_svg"
        :class="{ active: favoriteProductIsExists(product?.id) }"
      />
    </UiButton>
    <UiButton
      class="product__btn-cart"
      v-if="cartProductIsExists(product?.id)"
      @click="navigateTo('/cart')"
    >
      <span>В корзине</span>
    </UiButton>
    <UiButton
      class="product__btn-cart"
      v-else
      @click="cartProductAdd({ productId: product?.id })"
    >
      <IconCart />
      <span>Купить</span>
    </UiButton>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
});

const { cartProductIsExists, cartProductAdd } = useCart();
const { favoriteProductIsExists, favoriteProductToggle } = useFavorite();
</script>

<style lang="scss" scoped>
.product {
  &-action {
    display: flex;
    align-items: center;
    column-gap: 10px;
    margin-top: auto;
  }

  &-price {
    flex-grow: 1;
    font-weight: 700;

    &__del {
      color: rgb(var(--color-red));
      display: inline-block;
      font-size: 12px;
      margin-bottom: 2px;
    }

    &__value {
      font-size: 20px;
    }
  }

  &__favorite {
    padding: 0.75rem;

    &_svg {
      &.active {
        stroke: rgb(var(--color-white));
      }
    }
  }

  &__btn-cart {
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    // min-width: 138px;
    min-width: 116px;
  }
}
</style>

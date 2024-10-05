<template>
  <div class="product-action">
    <div class="product-price">
      <del class="product-price__del" v-if="product?.old_price">
        {{ formatNumber(product?.price) }}&nbsp;₽
      </del>
      <div class="product-price__value">
        {{ formatNumber(product?.old_price ?? product?.price) }}&nbsp;₽
      </div>
    </div>
    <UiButton
      class="product__favorite"
      :variant="cookieProductIsExists(product?.id) ? 'standart' : 'outlined'"
      @click="cookieProductToggle(product?.id)"
    >
      <IconFavorite
        class="product__favorite_svg"
        :class="{ active: cookieProductIsExists(product?.id) }"
      />
    </UiButton>
    <UiButton
      class="product__btn-cart"
      v-if="productIsExists(product?.id)"
      @click="navigateTo('/cart')"
    >
      <span>В корзине</span>
    </UiButton>
    <UiButton class="product__btn-cart" v-else @click="productAdd(product?.id)">
      <IconCart />
      <span>Купить</span>
    </UiButton>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
});

const { productIsExists, productAdd } = useCart();
const {
  productIsExists: cookieProductIsExists,
  productToggle: cookieProductToggle,
} = useFavorite();
</script>

<style lang="scss" scoped>
.product {
  &-action {
    display: flex;
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

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
    <UiButton class="product__favorite" variant="outlined">
      <IconFavorite />
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

const { cookieProductIds, productIsExists, productAdd } = useCart();
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

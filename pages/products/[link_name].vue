<template>
  <div class="product">
    <div class="container">
      <h1 class="product__title">{{ product?.title }}</h1>
      <div class="product-top">
        <div class="product-image">
          <div class="product-image__relative">
            <div class="product-image__absolute">
              <ProductSlider :product="product" :images="product?.images" />
            </div>
          </div>
        </div>
        <div class="product-short-info">
          <ProductShortInfo />
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
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                  stroke="rgb(var(--color-blue-light))"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </UiButton>
            <UiButton class="product__btn-cart">
              <svg
                class="svg-fill"
                fill="rgb(var(--color-white))"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 28.145 28.145"
              >
                <circle cx="9.026" cy="22.371" r="2.086" />
                <circle cx="25.016" cy="22.371" r="2.086" />
                <path
                  d="M28.145,7.746c0-0.033-0.016-0.061-0.018-0.094c-0.008-0.071-0.021-0.137-0.041-0.203
			c-0.021-0.064-0.043-0.125-0.072-0.183c-0.031-0.059-0.067-0.109-0.109-0.161c-0.042-0.054-0.086-0.102-0.139-0.146
			c-0.049-0.042-0.101-0.074-0.157-0.106c-0.063-0.035-0.125-0.064-0.195-0.087c-0.03-0.01-0.054-0.031-0.085-0.038
			c-0.04-0.009-0.076,0.001-0.115-0.002c-0.039-0.003-0.072-0.022-0.111-0.022L6.939,6.701c-0.015,0-0.027,0.008-0.042,0.009
			L6.213,4.432C6.081,3.991,5.674,3.688,5.214,3.688H1.043C0.467,3.688,0,4.155,0,4.731c0,0.576,0.467,1.043,1.043,1.043h3.396
			l3.949,13.162c0.132,0.441,0.539,0.742,0.999,0.742h15.294c0.49,0,0.912-0.338,1.019-0.816l2.42-10.888
			c0.009-0.038-0.002-0.075,0.002-0.113C28.127,7.821,28.145,7.786,28.145,7.746z M23.846,17.592H10.163L7.521,8.786l18.281,0.003
			L23.846,17.592z"
                />
              </svg>
              <span>Купить</span>
            </UiButton>
          </div>
          <div class="product-count">
            В наличии:&nbsp;<strong>{{ product?.count }}</strong>
          </div>
          <!-- <h1 class="product-short-info__title">{{ product?.title }}</h1> -->
        </div>
      </div>
      <div class="product-bottom">
        <ProductContent :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "~/api";

const route = useRoute();

const fetchProduct = await api.products.getAll({
  params: {
    extends: "images.image,category,vendor,user",
    "filterEQ[link_name]": route.params?.link_name,
  },
});

const product = await fetchProduct?.data?.[0];

if (!product) throw { statusCode: 404 };
</script>

<style lang="scss" scoped>
.product {
  &__title {
    margin-bottom: 20px;
  }

  &-top {
    display: flex;
    column-gap: 28px;
    margin-bottom: 60px;
  }

  &-image {
    display: flex;

    width: 100%;
    max-width: 600px;

    &__relative {
      padding-top: 100%;
      position: relative;
      width: 100%;
    }

    &__absolute {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  &-short-info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

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
    column-gap: 10px;
  }

  &-count {
    margin-top: 10px;
  }
}
</style>

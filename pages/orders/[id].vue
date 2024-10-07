<template>
  <div class="order">
    <div class="container">
      <div class="order-top">
        <h1 class="h1">Заказ №{{ id }}</h1>
      </div>
      <OrderStatusBackground class="order-center" :status="data?.status">
        <div class="order-info">
          <ul class="order-info-list">
            <li class="order-info-item">
              <div class="order-info-item__name">Дата заказа:</div>
              <div class="order-info-item__value">
                <time
                  class="product-review-user__date"
                  :datetime="data?.created_at"
                >
                  {{ moment(data?.created_at).format("DD.MM.YY HH:mm:ss") }}
                </time>
              </div>
            </li>
            <li class="order-info-item">
              <div class="order-info-item__name">Адрес:</div>
              <div class="order-info-item__value">
                {{ data?.address }}
              </div>
            </li>
          </ul>
        </div>
        <div class="order-actions">
          <!-- <button class="order-actions__btn">Связаться с продавцом</button> -->
          <button class="order-actions__btn" @click="copyLink">
            Поделиться заказом
          </button>
          <!-- <button>Связаться с продавцем</button> -->
        </div>
      </OrderStatusBackground>
      <div class="order-bottom">
        <h2 class="order-bottom__title">Товары</h2>
        <div class="order-products">
          <OrderProductList :products="products" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";
import api from "~/api";

const route = useRoute();
const id = route.params?.id;

const data = await api.orderings
  .get({
    id,
    params: {
      extends: "ordering_products.product",
    },
  })
  .then((res) => res?.data);

const products = data?.ordering_products?.map((item) => item?.product);
// console.log(data);

const copyLink = () => navigator.clipboard.writeText(window.location.href);

// useHead();
useSeoMeta({
  title: `Заказ №${id}`,
});
</script>

<style lang="scss" scoped>
.order {
  &-center {
    border-radius: 8px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px;
  }

  &-info {
    &-list {
      display: grid;
      row-gap: 4px;
      font-size: 14px;
    }

    &-item {
      display: flex;
      column-gap: 5px;
    }
  }

  &-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    row-gap: 5px;

    &__btn {
      color: rgb(var(--color-white));
      display: flex;
      font-weight: 700;
    }
  }
}
</style>

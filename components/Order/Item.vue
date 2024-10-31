<template>
  <div class="order box-shadow-default-hover">
    <OrderStatusBackground class="order-top" :status="order?.status">
      <NuxtLink class="order__title" :to="`/profile/orders/${order?.id}`">
        Заказ №{{ order?.id }} от&nbsp;{{
          moment(order?.created_at)?.format("DD.MM.YY")
        }}
      </NuxtLink>
      <div class="order__right">
        <div class="order__status">
          {{ $t(order?.status) }}
        </div>
      </div>
    </OrderStatusBackground>
    <div class="order-center">
      <ul class="order-info">
        <li class="order-info__item">
          <div class="order-info__item_title">Название:</div>
          <div class="order-info__item_value">{{ order?.name }}</div>
        </li>
        <li class="order-info__item">
          <div class="order-info__item_title">Оплачено:</div>
          <div class="order-info__item_value">
            {{ formatNumber(order?.price) }}&nbsp;₽
          </div>
        </li>
        <li class="order-info__item">
          <div class="order-info__item_title">Адрес:</div>
          <div class="order-info__item_value">
            {{ order?.address }}
          </div>
        </li>
        <li class="order-info__item" v-if="order?.reason">
          <div class="order-info__item_title">Причина отказа:</div>
          <div class="order-info__item_value">
            {{ order?.reason ?? "От вас воняет" }}
          </div>
        </li>
      </ul>
    </div>
    <div class="order-bottom">
      <NuxtLink :to="`/profile/orders/${order?.id}`">
        <UiButton class="order-btn">Детали</UiButton>
      </NuxtLink>
      <NuxtLink
        v-if="order?.status === 'draft'"
        :to="`/profile/orders/edit/${order?.id}`"
      >
        <UiButton class="order-btn" variant="outlined">Изменить</UiButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  order: Object,
});
</script>

<style lang="scss" scoped>
.order {
  border-radius: 8px;

  &-top {
    border-radius: 8px 8px 0 0;
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    padding: 16px 20px;
  }

  &__status {
    &::first-letter {
      text-transform: uppercase;
    }
  }

  &-center {
    padding: 16px 20px;
  }

  &__title {
    color: inherit;
    display: inline-block;
    font-size: 20px;
    text-decoration: underline;
  }

  &-info {
    display: grid;
    row-gap: 4px;

    &__item {
      display: flex;
      align-items: center;
      column-gap: 4px;
      font-size: 14px;

      &_value {
        font-weight: 700;
      }
    }
  }

  &-bottom {
    display: flex;
    column-gap: 12px;
    padding: 4px 20px 16px;
  }

  &-btn {
    border-radius: 6px;
    font-size: 14px;
    font-weight: 700;
    padding: 6px 12px;
  }
}
</style>

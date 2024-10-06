<template>
  <div class="order box-shadow-default-hover">
    <div class="order-top" :class="[order?.status]">
      <NuxtLink class="order__title" :to="`/orders/${order?.id}`">
        Заказ №{{ order?.id }} от&nbsp;{{
          moment(order?.created_at)?.format("DD.MM.YY")
        }}
      </NuxtLink>
      <div class="order__right">
        <div class="order__status">
          {{ order?.status }}
        </div>
      </div>
    </div>
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
      <NuxtLink :to="`/orders/${order?.id}`">
        <UiButton class="order-btn">Детали</UiButton>
      </NuxtLink>
      <NuxtLink v-if="order?.status === 'draft'" :to="`/orders/edit/${order?.id}`" >
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
    color: rgb(var(--color-white));
    display: flex;
    justify-content: space-between;
    padding: 16px 20px;

    &.draft {
      background-color: rgb(var(--color-grey), 0.5);
    }

    &.pending {
      background-color: rgb(var(--color-yellow), 0.95);
    }

    &.canceled {
      background-color: rgb(var(--color-red-light), 0.95);
    }

    &.working {
      background-color: rgb(var(--color-blue), 0.9);
    }

    &.completed {
      background-color: rgb(var(--color-green), 0.95);
    }

    &.rejected {
      background-color: rgb(var(--color-red), 0.95);
    }
  }

  &-center {
    padding: 16px 20px;
  }

  &__title {
    color: inherit;
    display: inline-block;
    font-size: 20px;
    font-weight: 700;
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

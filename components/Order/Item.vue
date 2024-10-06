<template>
  <div class="order box-shadow-default-hover">
    <!-- {{ order }} -->
    <div class="order-top">
      <div class="order-top__left">
        <span>
          Заказ <b>№{{ order?.id }}</b> -&nbsp;{{
            moment(order?.created_at)?.format("DD.MM.YY")
          }}
        </span>
        <div class="order-top__price">
          Оплачено:&nbsp;<b>{{ formatNumber(order?.price) }}</b>
        </div>
      </div>
      <div class="order-top__right">
        <div class="order-top__status">{{ order.status }}</div>
      </div>
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
  //   padding: 20px;
  // padding: 0 0 20px 20px;
  //   padding-bottom: 20px;

  &-top {
    // background-color: rgb(var(--color-blue-light), 0.2);
    // color: rgb(var(--color-white));
    border-radius: 8px 8px 0 0;
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
}
</style>

<template>
  <ul class="product-short-info__list">
    <li class="product-short-info__item">
      <div class="product-short-info__item_title">Процессор:</div>
      &nbsp;
      <div class="product-short-info__item_value">
        Intel Core i7 14650HX 1.6 ГГц (5.2 ГГц, в режиме Turbo)
      </div>
    </li>
    <li class="product-short-info__item">
      <div class="product-short-info__item_title">Графический процессор:</div>
      &nbsp;
      <div class="product-short-info__item_value">
        NVIDIA GeForce RTX 4070 для ноутбуков - 8 ГБ
      </div>
    </li>
    <li class="product-short-info__item">
      <div class="product-short-info__item_title">Диск SSD:</div>
      &nbsp;
      <div class="product-short-info__item_value">1024 ГБ</div>
    </li>
  </ul>
</template>

<script setup></script>

<style lang="scss" scoped>
.product-short-info {
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    font-size: 14px;
  }

  &__item {
    display: flex;

    &_title {
      color: rgb(var(--color-grey));
      flex-shrink: 0;
      font-weight: 500;
    }
  }
}
</style>

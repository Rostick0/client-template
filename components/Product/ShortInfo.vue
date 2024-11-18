<template>
  <ul class="product-short-info__list">
    <li
      class="product-short-info__item"
      v-for="property in properties"
      :key="property?.id"
    >
      <div class="product-short-info__item_title">
        {{ property?.property?.name }}:
      </div>
      &nbsp;
      <div
        class="product-short-info__item_value"
        v-if="property?.property?.type === 'input'"
      >
        {{ (property?.value + " " + (property?.property?.unit ?? "")).trim() }}
      </div>
      <div
        class="product-short-info__item_value"
        v-else-if="property?.property?.type === 'checkbox'"
      >
        Да
      </div>
      <div
        class="product-short-info__item_value"
        v-else-if="property?.property?.type === 'select'"
      >
        {{ property?.property_value?.value }}
      </div>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  properties: Array,
});
</script>

<style lang="scss" scoped>
.product-short-info {
  &__list {
    display: grid;
    // display: flex;
    // flex-direction: column;
    row-gap: 4px;
    font-size: 14px;
    margin-bottom: 10px;
  }

  &__item {
    display: flex;
    // column-gap: 1px;

    &_title {
      color: rgb(var(--color-grey));
      flex-shrink: 0;
      font-weight: 500;
    }
  }
}
</style>

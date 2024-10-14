<template>
  <div class="filter box-shadow-default">
    <div class="filter__inputs">
      <VFormComponent v-for="item in filters" :key="item?.name" :field="item" />
    </div>
    <div class="filter__actions">
      <UiButton class="filter__btn">Все фильтры</UiButton>
      <div class="filter__btn_clear" role="button">Очистить</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  filters: Array,
});
</script>

<style lang="scss" scoped>
.filter {
  border-radius: 8px;
  padding: 20px;
  min-width: 256px;

  &__inputs {
    display: grid;
    row-gap: 16px;
  }

  &__actions {
    margin-top: 20px;
  }

  &__btn {
    justify-content: center;
    margin-bottom: 10px;
    width: 100%;

    &_clear {
      cursor: pointer;
      color: rgb(var(--color-red));
      font-size: 14px;
      width: fit-content;
    }
  }
}
</style>

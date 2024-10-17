<template>
  <div class="filter box-shadow-default">
    <div class="filter__inputs">
      <template v-for="item in filters" :key="item?.name" :field="item">
        <template v-if="Array.isArray(item)">
          <div class="filter__inputs_field">
            <VFormComponent
              v-for="elem in item"
              :key="elem?.id"
              :field="elem"
            />
          </div>
        </template>
        <VFormComponent v-else :field="item" />
      </template>
    </div>
    <div class="filter__actions">
      <!-- <UiButton class="filter__btn">Все фильтры</UiButton> -->
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
  max-width: 256px;
  min-width: 256px;
  width: 100%;
  // min-width: 256px;

  &__inputs {
    display: grid;
    row-gap: 16px;

    &_field {
      display: grid;
      column-gap: 10px;
      grid-template-columns: repeat(2, 1fr);
    }
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

<template>
  <div class="profile-statistics">
    <!-- {{ data }} -->
    <NuxtLink class="profile-statistics__item profile-statistics-item" to="#">
      <div class="profile-statistics-item__title">Покупки</div>
      <div class="profile-statistics-item__info">
        <span>Потрачено: {{ data?.total_sum }}₽</span>
        <span>Товаров: {{ data?.buy_count }}</span>
      </div>
    </NuxtLink>
    <NuxtLink class="profile-statistics__item profile-statistics-item" to="#">
      <div class="profile-statistics-item__title">Оценки товаров</div>
      <div class="profile-statistics-item__info">
        <span>Оценены: {{ data?.comments_sum }}₽</span>
        <span>Без оценки: {{ data?.buy_count }}</span>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
});
</script>

<style lang="scss" scoped>
.profile-statistics {
  display: flex;
  grid-gap: 10px;
  flex-wrap: wrap;

  &-item {
    border: 2px solid rgb(var(--color-grey-light));
    display: inline-flex;
    flex-direction: column;
    border-radius: 8px;
    transition-property: border-color;
    transition-duration: 0.3s;
    padding: 12px;
    width: 100%;
    max-width: 300px;

    &:hover {
      border-color: rgb(var(--color-blue-light));
    }

    &__title {
      font-weight: 500;
      margin-bottom: 8px;
    }

    &__info {
      display: flex;
      flex-direction: column;
      row-gap: 4px;
    }
  }
}
</style>

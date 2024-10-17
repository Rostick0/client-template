<template>
  <div class="catalog-content__sorts box-shadow-default">
    <button
      class="catalog-content__sorts_btn"
      :class="{
        active: sort?.replace?.('-', '') === item.value,
      }"
      v-for="item in sorts"
      :key="item.value"
      @click="emits('updateSort', item.value)"
    >
      {{ item.name }}
      <span
        class="catalog-content__sorts_btn_arrow"
        v-if="sort?.replace?.('-', '') === item.value"
      >
        {{ sort?.startsWith?.("-", 0) ? "↓" : "↑" }}
      </span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  sorts: Array,
  sort: String,
});

const emits = defineEmits(["updateSort"]);
</script>

<style lang="scss" scoped>
.catalog-content__sorts {
  border-radius: 8px;
  display: flex;
  column-gap: 12px;
  padding: 14px 20px;
  margin-bottom: 28px;

  &_btn {
    position: relative;
    transition-property: color;
    transition-duration: 0.3s;

    &.active {
      font-weight: 700;
    }

    &:hover {
      color: rgb(var(--color-blue-light));
    }

    &_arrow {
      font-family: "Roboto";
    }
  }
}
</style>

<template>
  <div class="order-statuses">
    <button
      class="order-statuses__item"
      :class="{ active: modelValue === status }"
      v-for="status in ORDERING_STATUS"
      :key="status"
      @click="emits('update:modelValue', status)"
    >
      {{ status }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
});

const emits = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
.order-statuses {
  display: flex;
  column-gap: 16px;
  margin-bottom: 20px;

  &__item {
    padding-bottom: 5px;
    position: relative;
    overflow: hidden;
    transition: 0.3s;

    &::after {
      background-color: rgb(var(--color-blue-light));
      content: "";
      display: flex;
      position: absolute;
      bottom: 1px;
      opacity: 0;
      transition: 0.3s;
      transform: translateX(-100%);
      width: 100%;
      height: 2px;
    }

    &.active {
      color: rgb(var(--color-blue-light));

      &::after {
        opacity: 1;
        transform: translateX(0);
      }
    }

    &::first-letter {
      text-transform: uppercase;
    }
  }
}
</style>

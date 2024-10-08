<template>
  <button class="btn" v-bind="$attrs" :class="[color, variant]">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { type ButtonHTMLAttributes } from "vue";

defineComponent({
  inheritAttrs: false,
});

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  variant?: "standard" | "outlined";
  color?: "standard" | "yellow" | "red" | "green";
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.btn {
  background-color: rgb(var(--color-blue-light));
  color: rgb(var(--color-white));
  border: 1px solid transparent;
  border-radius: 0.33rem;
  display: inline-flex;
  font-size: 0.875rem;
  transition: 0.3s;
  padding: 0.75rem 1.25rem;

  &.outlined {
    background-color: transparent;
    color: rgb(var(--color-blue-light));
    border-color: rgb(var(--color-blue-light));
  }

  &.yellow {
    background-color: rgb(var(--color-yellow));
  }

  &.green {
    background-color: rgb(var(--color-green));
  }
}
</style>

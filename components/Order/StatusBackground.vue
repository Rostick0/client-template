<template>
  <div class="status-bg" :class="[status]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
// const props = defineProps({
//   status:,
// });

interface Props {
  status:
    | "draft"
    | "pending"
    | "canceled"
    | "working"
    | "completed"
    | "rejected";
}

const prosp = defineProps<Props>();
</script>

<style lang="scss" scoped>
.status-bg {
  color: rgb(var(--color-white));

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
</style>

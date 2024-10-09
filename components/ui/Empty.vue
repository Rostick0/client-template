<template>
  <div class="empty">
    <div class="empty-inner">
      <slot v-if="$slots.default" />
      <template v-else>Пусто</template>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.empty {
  color: rgb(var(--color-grey), 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 18px;
  // font-weight: 700;
  min-height: 256px;
}
</style>

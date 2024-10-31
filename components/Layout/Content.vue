<template>
  <div class="wrapper">
    <LayoutHeader />
    <main class="main">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.wrapper {
  &__footer {
    &_join {
      padding: 6px 16px;
      font-weight: 700;
      width: fit-content;
    }
  }
}

.main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 40px 0;
}
</style>

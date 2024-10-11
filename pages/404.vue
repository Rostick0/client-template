<template>
  <div class="error">
    <div class="error-page">
      <h2 class="title">Error: 404</h2>
      <div class="error-page__content">
        <div class="">Page not found</div>
      </div>
      <NuxtLink to="/">
        <UiButton>Go main</UiButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
if (process.server) {
  const event = useRequestEvent();
  setResponseStatus(event, 404);
}
</script>

<style lang="scss" scoped>
@import "./../assets/styles/pages/error";
</style>

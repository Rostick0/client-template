<template>
  <NuxtLayout>
    <div class="error">
      <div class="error-page">
        <h2 class="title">Error: {{ error?.statusCode }}</h2>
        <div class="error-page__content">
          <div class="">{{ error?.message }}</div>
          <div class="" v-if="error?.stack" v-html="error?.stack"></div>
        </div>
        <NuxtLink to="/">
          <UiButton>Go main</UiButton>
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const error = useError();

const { accessToken, user, getUser } = await useAuth();
if (accessToken.value && !user.value) {
  await getUser();
}
</script>

<style lang="scss" scoped>
@import "./assets/styles/pages/error";
</style>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
await import("moment/dist/locale/ru");

await import("vue-toastification/dist/index.css");

useCartInit();
useFavoriteInit();

const { accessToken, user, getUser } = await useAuth();
if (accessToken.value && !user.value) {
  await getUser();
}

const { addMessage } = useTempMessage();

onMounted(() => {
  initSocket(window, accessToken.value);
  socketListenAll(window, user.value, addMessage);
});
</script>

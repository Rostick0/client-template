<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { configure, defineRule } = await import("vee-validate");
const { email, min, max, required, size, image, min_value, max_value } =
  await import("@vee-validate/rules");
const { localize } = await import("@vee-validate/i18n");

await import("vue-toastification/dist/index.css");

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
defineRule("size", size);
defineRule("image", image);
defineRule("min_value", min_value);
defineRule("max_value", max_value);

configure({
  generateMessage: localize("ru", {
    messages: {
      required: "Поле обязательно для заполнения",
      email: "Введён некорректный email",
      between: "Поле должно быть между 0:{min}, 1:{max}",
      min: "Поле должно содержать минимум 0:{min} символов",
      max: "Поле должно содержать максимум 0:{max} символов",
      confirmed: "Поле должно быть подтверждено",
      size: "Размер загружаемого файла не должен быть больше {size} KB",
      image: "Файл должен быть изображением",
      min_value: "Минимальное значение у поля - 0:{min}",
      max_value: "Максимальное значение у поля - 0:{max_value}",
    },
  }),
});

const { accessToken, user, getUser } = await useAuth();
if (accessToken.value && !user.value) {
  await getUser();
}
</script>

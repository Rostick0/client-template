<template>
  <div class="form-auth">
    <div class="container">
      <div class="form-auth__container">
        <form class="form-auth__form box-shadow-default" @submit="onSubmit">
          <div class="form-auth__inputs">
            <VFormComponent :field="name" />
            <VFormComponent :field="email" />
            <VFormComponent :field="password" />
          </div>
          <UiButton class="form-auth__btn">Получиь код авторизации</UiButton>
          <!-- <UiButton class="form-auth__btn">Регистрация</UiButton> -->
        </form>
        <NuxtLink class="link" to="/login">Войти</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";

const name = ref({
  type: "text",
  name: "name",
  rules: "required|max:255",
  modelValue: "",

  bind: {
    label: "Ваше имя",
    placeholder: "Введите ваше имя",
  },
});

const email = ref({
  type: "text",
  name: "email",
  rules: "required|email|max:255",
  modelValue: "",

  bind: {
    label: "Ваш email",
    placeholder: "Введите ваш e-mail",
  },
});

const password = ref({
  type: "text",
  name: "password",
  rules: "required|max:255",
  modelValue: "",

  bind: {
    label: "Пароль",
    placeholder: "Введите пароль",
  },
});

const { handleSubmit, setErrors } = useForm();
const { login } = await useAuth();

const onSubmit = handleSubmit(async (data) => {
  // const res = await api.auth.login(data);
  const errors = login(data, true);

  if (res?.error) {
    warningPopup("Произошла ошибка");
    setErrors(errors?.errors);
    return;
  }

  success("Заказ создан");
  emits("clearCart", true);
});

useSeoMeta({
  title: `Вход в аккаунт`,
});
</script>

<style lang="scss" scoped>
@import "./../assets/styles/components/auth-form";
</style>

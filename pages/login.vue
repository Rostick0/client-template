<template>
  <div class="form-auth">
    <div class="container">
      <div class="form-auth__container">
        <form class="form-auth__form box-shadow-default" @submit="onSubmit">
          <div class="form-auth__inputs">
            <VFormComponent :field="email" />
            <VFormComponent :field="password" />
          </div>
          <UiButton class="form-auth__btn">Войти</UiButton>
        </form>
        <div>
          <span>Отсутствует акаунт?</span>&nbsp;<NuxtLink
            class="link"
            to="/register"
            >Создать</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";

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
    type: "password",
  },
});

const { handleSubmit, setErrors } = useForm();
const { login } = await useAuth();

const onSubmit = handleSubmit(async (data) => {
  const errors = await login(data, true);

  if (errors) {
    warningPopup("Произошла ошибка");
    setErrors(errors?.errors);
    return;
  }

  success("Вход выполнен");
});

useSeoMeta({
  title: `Вход в аккаунт`,
});
</script>

<style lang="scss" scoped>
@import "./../assets/styles/components/auth-form";
</style>

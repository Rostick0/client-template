<template>
  <div class="form-auth">
    <div class="container">
      <div class="form-auth__container">
        <form class="form-auth__form box-shadow-default" @submit="onSubmit">
          <template v-if="!isSendedCode">
            <div class="form-auth__inputs">
              <VFormComponent :field="name" />
              <VFormComponent :field="email" />
              <VFormComponent :field="password" />
            </div>
            <UiButton class="form-auth__btn">Регистрация</UiButton>
          </template>
          <VFormComponent v-else :field="code" />
        </form>
        <div>
          <span>Есть акаунт?</span>&nbsp;
          <NuxtLink class="link" to="/login">Войти</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import debounce from "lodash/debounce";
import { useForm } from "vee-validate";
import api from "~/api";

const isSendedCode = ref(false);

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
  rules: "required|min:8|max:255",
  modelValue: "",

  bind: {
    label: "Пароль",
    placeholder: "Введите пароль",
  },
});

const code = ref({
  type: "text",
  name: "code",
  rules: "required|max:6",
  modelValue: "",

  bind: {
    maska: "######",
    label:
      "Вам потребуется подтвердить свой аккаунт, введите код из указанной почты",
    placeholder: "Введите код",
  },
});

const { handleSubmit, setErrors } = useForm();
const { register } = await useAuth();

const formValues = ref({});

const onSubmit = handleSubmit(async (data) => {
  const res = await api.emailCode.create({
    data: {
      email: data?.email,
      type: "register",
    },
  });

  if (res?.error) {
    warningPopup("Произошла ошибка");
    setErrors(res?.errorResponse?.data?.errors);
    return;
  }

  formValues.value = data;
  isSendedCode.value = true;
});

watch(
  () => code.value.modelValue,
  debounce(async (code) => {
    if (code?.length < 6) return;

    const errors = await register(
      {
        ...formValues.value,
        code,
      },
      true
    );

    if (errors?.errors?.email) {
      isSendedCode.value = false;
      name.value.modelValue = formValues.value?.name;
      email.value.modelValue = formValues.value?.email;
      warningPopup(errors?.errors?.email);
      return;
    }

    if (errors) {
      warningPopup("Произошла ошибка");
      setErrors(errors?.errors);
      return;
    }

    formValues.value = {};
    success("Регистрация прошла успешно");
  })
);

useSeoMeta({
  title: `Вход в аккаунт`,
});
</script>

<style lang="scss" scoped>
@import "./../assets/styles/components/auth-form";
</style>

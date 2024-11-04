<template>
  <div class="profile-settings">
    <h2 class="h2">Настройки</h2>
    <form class="profile-settings__item" @submit="onSubmit">
      <div class="profile-settings__inputs">
        <VFormComponent :field="email_new" />
        <VFormComponent v-if="isSendedCode" :field="code" />
      </div>
      <UiButton v-if="!isSendedCode">Обновить</UiButton>
    </form>
  </div>
</template>

<script setup>
import debounce from "lodash/debounce";
import { useForm } from "vee-validate";
import api from "~/api";

const user = useState("user");

const isSendedCode = ref(false);

const email_new = ref({
  type: "text",
  name: "email_new",
  rules: "required|email|max:255",
  modelValue: user.value?.email,

  bind: {
    label: "Ваш email",
    placeholder: "Введите ваш e-mail",
  },
});

const code = ref({
  type: "text",
  name: "code",
  rules: "required|max:6",
  modelValue: "",

  bind: {
    maska: "######",
    label: "Введите код подтверждения из вашей почты",
    placeholder: "Введите код",
  },
});

const { handleSubmit, setErrors } = useForm();

const onSubmit = handleSubmit(async ({ email_new }) => {
  const res = await api.emailCode.create({
    data: {
      email: user.value?.email,
      email_new,
      type: "update_email",
    },
  });

  if (res?.error) {
    warningPopup("Произошла ошибка");
    setErrors(res?.errorResponse?.data?.errors);
    return;
  }

  isSendedCode.value = true;
});

watch(
  () => code.value.modelValue,
  debounce(async (code) => {
    if (code?.length < 6) return;

    const res = await api.users.updateEmail({
      data: {
        email: email_new.value.modelValue,
        email_old: user.value?.email,
        code,
      },
    });

    if (res?.error) {
      warningPopup("Произошла ошибка");
      setErrors(res?.errorResponse?.data?.errors);
      return;
    }

    success("Почта изменена!");
    user.value.email = email_new.value.modelValue;
    isSendedCode.value = false;
  })
);

definePageMeta({
  layout: "profile",
});
</script>

<style lang="scss" scoped>
.profile-settings {
  &__item {
    max-width: 256px;
  }

  &__inputs {
    margin-bottom: 10px;
  }
}
</style>

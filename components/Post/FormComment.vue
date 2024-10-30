<template>
  <form class="post-form-comment" @submit="onSubmit">
    <VFormComponent :field="text" />
    <UiButton>Отправить</UiButton>
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import api from "~/api";

const props = defineProps({
  postId: Number,
});

const emits = defineEmits(["createComment"]);

const text = ref({
  type: "textarea",
  name: "text",
  rules: "required|max:255",
  modelValue: "",

  bind: {
    placeholder: "Ваш комментарий",
    rows: 1,
    leftIcon: "das",
  },
});

const { handleSubmit, setErrors, setFieldError, resetForm } = useForm();

const onSubmit = handleSubmit(async (values) => {
  // const res = await api.comments.create({
  //   data: {
  //     ...values,
  //     model: "App\\Models\\Post",
  //     id: props?.postId,
  //     extends: "user.image.image",
  //   },
  // });
  // if (res?.error) {
  //   warningPopup("Произошла ошибка");
  //   setErrors(res?.errorResponse?.data?.errors);
  //   return;
  // }
  text.value.modelValue = "";

  nextTick(() => {
    resetForm();
    // resetForm();
  });
  // success("Комментарий создан!");
  // emits("createComment", res?.data);
});
</script>

<style lang="scss" scoped>
.post-form-comment {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 10px;
}
</style>

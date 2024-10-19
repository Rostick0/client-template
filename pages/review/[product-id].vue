<template>
  <div class="review">
    <div class="container">
      <div class="review__container">
        <form @submit="onSubmit">
          <VFormComponent :field="dignities" />
          <VFormComponent :field="disadvantages" />
          <VFormComponent :field="comment" />
          <VFormComponent :field="images" />
          <UiButton>Сохранить</UiButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import api from "~/api";

// 'mark' => 'required|numeric|min:1|max:5',

const route = useRoute();

const id = route.params["product-id"];

const dignities = ref({
  type: "textarea",
  name: "dignities",
  rules: "max:300",
  // modelValue: user.value?.dignities ?? "",
  modelValue: "",

  bind: {
    label: "Достоинства",
    placeholder: "Почему вам понравился товар",
  },
});

const disadvantages = ref({
  type: "textarea",
  name: "disadvantages",
  rules: "max:300",
  // modelValue: user.value?.disadvantages ?? "",
  modelValue: "",

  bind: {
    label: "Недостатки",
    placeholder: "Что хотелось бы улучшить",
  },
});

const comment = ref({
  type: "textarea",
  name: "comment",
  rules: "max:300",
  // modelValue: user.value?.comment ?? "",
  modelValue: "",

  bind: {
    label: "Комментарий",
    placeholder: "Ваши впечатления",
  },
});

const images = ref({
  type: "multiple-photo-loader",
  name: "images",
  modelValue:
    // data?.images?.map?.((i) => ({
    //   ...i.image,
    //   path: i?.image?.path + "?w=350&h=350",
    // })) ??
    [],

  bind: {
    label: "Фотографии",
  },
});

// const review = await api.reviews.get({});

const { handleSubmit, setErrors } = useForm();

const onSubmit = handleSubmit(async (values) => {
  const res = await api.reviews.create({ values });
});

useSeoMeta({
  title: `Отзыв на продукт #${id}`,
});
</script>

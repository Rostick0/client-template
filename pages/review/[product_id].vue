<template>
  <div class="review">
    <div class="container">
      <div class="review__container">
        <div class="review__top">
          {{ isCreated ? 'Редактирование' : 'Создание' }} отзыва на товар&nbsp;<NuxtLink
            class="link"
            :to="`/products/${product?.link_name}`"
            >{{ product?.title }}</NuxtLink
          >
        </div>
        <form class="review__form" @submit="onSubmit">
          <VFormComponent :field="mark" />
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
import useImage from "~/composables/useImage";
import api from "~/api";

const route = useRoute();
const router = useRouter();

const id = route.params["product_id"];

const product = await api.products.get({ id }).then((res) => res?.data);
const review = ref(
  await api.reviews.getByProductId({
    id,
    params: {
      extends: "images.image,product",
    },
  })
);
const isCreated = computed(() => !!review.value);

const mark = ref({
  type: "stars",
  name: "mark",
  rules: "required",
  modelValue: review.value?.mark ?? "",

  bind: {
    label: "Оценка",
  },
});

const dignities = ref({
  type: "textarea",
  name: "dignities",
  rules: "max:300",
  modelValue: review.value?.dignities ?? "",

  bind: {
    label: "Достоинства",
    placeholder: "Почему вам понравился товар",
  },
});

const disadvantages = ref({
  type: "textarea",
  name: "disadvantages",
  rules: "max:300",
  modelValue: review.value?.disadvantages ?? "",

  bind: {
    label: "Недостатки",
    placeholder: "Что хотелось бы улучшить",
  },
});

const comment = ref({
  type: "textarea",
  name: "comment",
  rules: "max:300",
  modelValue: review.value?.comment ?? "",

  bind: {
    label: "Комментарий",
    placeholder: "Ваши впечатления",
  },
});

const images = ref({
  type: "multiple-photo-loader",
  name: "images",
  modelValue:
    review.value?.images?.map?.((i) => ({
      ...i.image,
      path: i?.image?.path + "?w=350&h=350",
    })) ?? [],

  bind: {
    label: "Фотографии",
  },
});

const { getImageIdsFrom } = useImage();

const { handleSubmit, setErrors, values } = useForm();

const onSubmit = handleSubmit(async ({ images, ...values }) => {
  const images_load = await getImageIdsFrom(images);

  const data = { ...values, images: images_load, product_id: id };

  const res = isCreated.value
    ? await api.reviews.update({ id: review.value.id, data })
    : await api.reviews.create({ data });

  if (res?.error) {
    warningPopup(res?.errorResponse?.data?.message);

    if (res?.errorResponse?.data?.errors)
      setErrors(res?.errorResponse?.data?.errors);

    return;
  }

  success(isCreated?.value ? "Отзыв изменён!" : "Отзыв добавлен");

  setTimeout(() => {
    router.go(-1);
  }, 750);
});

useSeoMeta({
  title: `Отзыв на продукт #${id}`,
});
</script>

<style lang="scss" scoped>
.review {
  &__top {
    font-size: 18px;
    margin-bottom: 28px;
  }

  &__form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 20px;
  }
}
</style>

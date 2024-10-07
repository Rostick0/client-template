<template>
  <form class="payment box-shadow-default" @submit="onSubmit">
    <div class="payment__title">В корзине</div>
    <div class="payment__counter">
      Количество товаров: {{ cartProduct?.length }}
    </div>

    <div class="payment__inputs">
      <VFormComponent :field="name" />
      <VFormComponent :field="date" />
      <VFormComponent :field="address" />
    </div>

    <div class="payment__sum">{{ sum }}&nbsp;₽</div>
    <UiButton class="payment__btn">Оплатить</UiButton>
  </form>
</template>

<script setup>
import moment from "moment";
import { useForm } from "vee-validate";
import api from "~/api";

const props = defineProps({
  cartProduct: Array,
  products: Array,
});

const sum = computed(() =>
  formatNumber(
    props.products?.reduce(
      (sum, current) => sum + current?.price * current?.localCount,
      0
    )
  )
);

const user = useState("user");

const { handleSubmit } = useForm();

const name = ref({
  type: "text",
  name: "name",
  rules: "required|max:255",
  modelValue: user.value?.name ?? "",

  bind: {
    placeholder: "Ваше имя",
  },
});

const defaultTime = moment().add("days", 7).toISOString();
const date = ref({
  type: "date",
  name: "date",
  rules: "required",
  modelValue: defaultTime,

  bind: {
    autoApply: true,
    enableTimePicker: false,
    monthNameFormat: "long",
    minDate: defaultTime,
  },
});

const address = ref({
  type: "text",
  name: "address",
  rules: "required|max:255",
  modelValue: user.value?.address ?? "",

  bind: {
    placeholder: "Ваш адрес",
  },
});

const onSubmit = handleSubmit(async (values) => {
  console.log(props.products);
  console.log(values);

  //   const res = api.orderings.create({})
});
</script>

<style lang="scss" scoped>
.payment {
  border-radius: 8px;
  padding: 20px;
  min-width: 300px;

  &__title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 4px;
  }

  &__counter {
    font-size: 14px;
  }

  &__inputs {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    margin: 10px 0;
  }

  &__sum {
    font-weight: 700;
    font-size: 24px;
    margin: 16px 0 8px;
  }

  &__btn {
    justify-content: center;
    width: 100%;
  }
}
</style>

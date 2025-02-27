<template>
  <div class="payment">
    <form class="payment__inner box-shadow-default" @submit="onSubmit">
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
    <button @click="emits('saveDraft')">Сохранить как черновик</button>
  </div>
</template>

<script setup>
import moment from "moment";
import { useForm } from "vee-validate";
import api from "~/api";

const props = defineProps({
  cartProduct: Array,
  products: Array,
});

const emits = defineEmits(["clearCart", "saveDraft"]);

const sum = computed(() =>
  formatFloatNumber(
    props.products?.reduce(
      (sum, current) => sum + +current?.price * +current?.localCount,
      0
    )
  )
);

const user = useState("user");

const name = ref({
  type: "text",
  name: "name",
  rules: "required|max:255",
  modelValue: "Мой новый заказ",

  bind: {
    label: "Название заказа",
    placeholder: "Введите названние заказа",
  },
});

const defaultTime = moment().add(7, "days").toISOString();
const date = ref({
  type: "date",
  name: "date",
  rules: "required",
  modelValue: defaultTime,

  bind: {
    label: "Предполагаемая дата доставки",
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
    label: "Адрес доставки",
    placeholder: "Введите адрес получения",
  },
});

const { handleSubmit, setErrors } = useForm();

const onSubmit = handleSubmit(async ({ date, ...values }) => {
  const data = {
    ...values,
    status: "pending",
    date: moment(date).format("YYYY-MM-DD"),
    product_ids: "",
    product_quantity: "",
  };
  let productIds = "",
    productQuantity = "";

  props.products?.forEach?.((item) => {
    if (item?.id) {
      productIds += `${item.id},`;
      productQuantity += `${item?.localCount ?? 1},`;
    }
  });

  productIds = productIds.substring(0, productIds.length - 1);
  productQuantity = productQuantity.substring(0, productQuantity.length - 1);

  data["product_ids"] = productIds;
  data["product_quantity"] = productQuantity;

  const res = await api.orderings.create({ data });

  if (res?.error) {
    warningPopup("Произошла ошибка");
    setErrors(res?.errorResponse?.data?.errors);
    return;
  }

  success("Заказ создан");
  emits("clearCart", true);
});
</script>

<style lang="scss" scoped>
.payment {
  &__inner {
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    min-width: 300px;
  }

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

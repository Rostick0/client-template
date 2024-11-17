<template>
  <div class="product__switches">
    <template v-for="(item, i) in switches">
      <div
        class="product__switch"
        :class="{ active: activeSwitchIndex === i }"
        v-if="!item?.hide_show"
        @click="activeSwitchIndex = i"
      >
        {{ item.name }}
      </div>
    </template>
  </div>
  <div class="product__content">
    <div v-show="activeSwitchIndex === 0">
      <ProductSpecifications :product="product" />
    </div>
    <div v-show="activeSwitchIndex === 1" v-html="product?.description"></div>
    <div v-show="activeSwitchIndex === 2">
      <ProductReviewAdding :product="product" />
      <ProductReviews :reviews="reviews" :myReview="product?.my_review" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
});

const user = useState("user");

const {
  data: reviews,
  get: getReviews,
  meta: metaReviews,
} = await useApi({
  name: "reviews.getAll",
  params: {
    extends: "user.image.image",
    "filterNEQ[user_id]": user.value?.id,
    "filterEQ[product_id]": props.product?.id,
  },
});
await getReviews();

const activeSwitchIndex = ref(0);

const switches = [
  {
    name: "Характеристики",
  },
  {
    name: "О товаре",
    hide_show: !props.product?.description,
  },
  {
    name: `Отзывы (${
      metaReviews.value?.total + (props.product?.my_review ? 1 : 0) ?? 0
    })`,
  },
];
</script>

<style lang="scss" scoped>
.product {
  &__switches {
    display: flex;
    column-gap: 30px;
    margin-bottom: 20px;
  }

  &__switch {
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-weight: 500;
    transition: 0.3s;
    padding-bottom: 5px;

    &.active {
      border-color: rgb(var(--color-blue-light));
      color: rgb(var(--color-blue-light));
    }
  }
}
</style>

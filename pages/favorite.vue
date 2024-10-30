<template>
  <div class="favorite">
    <div class="container">
      <div class="favorite__top h1">
        <h1>Избранное</h1>
        <UiButton
          v-if="isShowBtnAdderCart"
          @click="addProductsToCart(), (isShowBtnAdderCart = false)"
          >Добавить все товары в корзину</UiButton
        >
      </div>
      <div class="favorite__content">
        <FavoriteProducts
          :products="data"
          :favoriteProductRemove="favoriteProductRemove"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import debounce from "lodash/debounce";
const { cartProduct, cartProductAdd, cartProductIsExists } = useCart();
const { favoriteProductIds } = useFavorite();

const { data, get } = await useApi({
  name: "products.getAll",
  params: {
    "filterIN[id]": favoriteProductIds.value.join(),
  },
});
await get();

const favoriteProductRemove = (productId) => {
  const dataTemp = [...data.value];
  console.log(dataTemp);
  dataTemp.splice(
    data.value.findIndex((item) => item?.id === productId),
    1
  );
  data.value = dataTemp;
};

const checkEveryCartProducts = () =>
  data.value.every((item) => item?.id && cartProductIsExists(item?.id));

const isShowBtnAdderCart = ref(!checkEveryCartProducts());

watch(
  () => cartProduct.value,
  debounce(() => {
    isShowBtnAdderCart.value = !checkEveryCartProducts();
  }, 750)
);

const addProductsToCart = () =>
  data.value?.forEach(
    (item) => item?.id && cartProductAdd({ productId: item.id })
  );

useSeoMeta({
  title: `Избранные товары`,
});
</script>

<style lang="scss" scoped>
.favorite {
  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__content {
    display: flex;
    align-items: flex-start;
    column-gap: 32px;
  }
}
</style>

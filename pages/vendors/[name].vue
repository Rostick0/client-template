<template>
  <div class="vendor">
    <div class="container">
      <div class="vendor__content">
        <div class="vendor__image">
          <div class="vendor__image_inner">
            <img
              class="vendor__img"
              :src="vendor?.main_image?.image?.path_webp"
              :alt="vendor?.name"
              v-lazy-load
              decoding="async"
              loading="lazy"
              width="290"
              height="174"
            />
          </div>
        </div>
        <div class="vendor__text">
          <h1 class="vendor__title">{{ vendor?.name }}</h1>
          <p class="vendor__description">{{ vendor?.description }}</p>
        </div>
      </div>
      <div class="">
        <h2 class="h2">Продукты компании</h2>
        <ProductList :products="data" />
      </div>
      <!-- <pre>
    {{ vendor }}
    </pre> -->
    </div>
  </div>
</template>

<script setup>
import api from "~/api";

const route = useRoute();

const vendor = await api.vendors
  .getAll({
    params: {
      "filterEQ[name]": route.params?.name,
      limit: 1,
    },
  })
  .then((res) => res?.data?.[0]);

console.log(vendor);

const { data, get } = await useApi({
  name: "products.getAll",
  params: {
    "filterLIKE[vendor_id]": vendor?.id,
  },
});
await get();
</script>

<style lang="scss" scoped>
.vendor {
  &__content {
    display: flex;
    align-items: flex-start;
    column-gap: 20px;
    margin-bottom: 40px;
  }

  &__image {
    width: 100%;
    max-width: 300px;

    &_inner {
      display: flex;
      padding-top: 80%;
      position: relative;
      width: 100%;
    }
  }

  &__img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &__title {
    margin-bottom: 10px;
  }
}
</style>

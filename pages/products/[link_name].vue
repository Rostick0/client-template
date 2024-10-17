<template>
  <div class="product">
    <div class="container">
      <h1 class="product__title h1">{{ product?.title }}</h1>
      <div class="product-top">
        <div class="product-image">
          <div class="product-image__relative">
            <div class="product-image__absolute">
              <ProductSlider :product="product" :images="product?.images" />
            </div>
          </div>
        </div>
        <div class="product-short-info">
          <ProductShortInfo :properties="propertiesTop" />
          <ProductAction :product="product" />
          <div class="product-count">
            В наличии:&nbsp;<strong>{{ product?.count }}</strong>
          </div>
          <!-- <h1 class="product-short-info__title">{{ product?.title }}</h1> -->
        </div>
      </div>
      <div class="product-bottom">
        <ProductContent :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "~/api";

const route = useRoute();

const fetchProduct = await api.products.getAll({
  params: {
    extends:
      "images.image,category,vendor,user,product_properties.property.property_type,product_properties.property_value",
    "filterEQ[link_name]": route.params?.link_name,
  },
});

const product = await fetchProduct?.data?.[0];

const propertiesTop = product?.product_properties?.filter(
  (item) => true || item?.property?.is_top
);

// if (!product) throw { statusCode: 404 };

useSeoMeta({
  title: `Купить ${product?.title} на JShoP`,
});
</script>

<style lang="scss" scoped>
.product {
  &-top {
    display: flex;
    column-gap: 28px;
    margin-bottom: 60px;
  }

  &-image {
    display: flex;

    width: 100%;
    max-width: 600px;

    &__relative {
      padding-top: 100%;
      position: relative;
      width: 100%;
    }

    &__absolute {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  &-short-info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &-count {
    margin-top: 10px;
  }
}
</style>

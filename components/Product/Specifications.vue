<template>
  <div class="product-specifications">
    <figure class="product-specifications__figure" v-for="item in groupBy">
      <figcaption class="product-specifications__figcaption">
        {{ item?.group }}
      </figcaption>
      <ProductShortInfo class="product-specifications__short-info" :properties="item.value" />
    </figure>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
});

const groupBy = computed(() =>
  groupByInArray(
    props.product?.product_properties,
    "property.property_type.name"
  )
);
</script>

<style lang="scss" scoped>
.product-specifications {
  &__figcaption {
    // font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  &__short-info {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

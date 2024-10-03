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
    <div v-show="activeSwitchIndex === 1">{{ product?.description }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
});

const activeSwitchIndex = ref(0);

const switches = [
  {
    name: "Характеристик",
  },
  {
    name: "О товаре",
    hide_show: !props.product?.description,
  },
  {
    name: "Отзывы",
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

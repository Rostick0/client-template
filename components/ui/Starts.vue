<template>
  <div class="stars">
    <button
      class="star"
      v-for="item in arrayStars"
      :key="item"
      @click.prevent="emits('update:modelValue', item + 1)"
    >
      <IconStar class="star__icon" :class="{ active: item < modelValue }" />
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Number,
  count: {
    type: Number,
    default: 5,
  },
});

const emits = defineEmits(["update:modelValue"]);

const arrayStars = computed(() => [...Array(props.count).keys()]);
</script>

<style lang="scss" scoped>
.stars {
  display: flex;
  column-gap: 2px;
}

.star {
  display: inline-flex;

  &__icon {
    transition-property: fill;
    transition-duration: 0.3s;

    &.active {
      fill: rgb(var(--color-yellow));
    }
  }
}
</style>

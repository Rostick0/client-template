<template>
  <ul class="pagination" v-if="number > 1">
    <li v-if="page > 1 && $slots.leftIcon" @click="setPage(page - 1)">
      <slot name="leftIcon"></slot>
    </li>
    <li class="pagination-item" v-for="idx of items" :key="idx">
      <button
        class="pagination-btn"
        :class="{
          active: idx === modelValue,
        }"
        @click="setPage(idx), onClickPage?.()"
        :disabled="!+idx"
      >
        <span>{{ idx }}</span>
      </button>
    </li>
    <li
      v-if="page <= meta?.total && $slots.rightIcon"
      @click="setPage(page + 1)"
    >
      <slot name="rightIcon"></slot>
    </li>
  </ul>
</template>

<script setup>
// const padding = 2;

const props = defineProps({
  onClickPage: Function,
  padding: {
    type: [Number, String],
    default: 4,
  },
  meta: {
    type: Object,
    default: null,
  },
  modelValue: {
    type: [Number, null],
    default: 1,
  },
});

const page = ref(1);
const emit = defineEmits(["update:modelValue"]);

const setPage = (val) => {
  emit("update:modelValue", val);
};

const { meta, modelValue } = toRefs(props);

const number = computed(() =>
  Math.floor(props?.meta?.total / props?.meta?.per_page)
);

const items = computed(() => {
  const start = (() => {
    const result = [];
    result.push(modelValue.value);
    for (let i = 1; i <= props.padding; i++) {
      const target = modelValue.value - i;
      if (target > 0) result.push(target);
    }
    if (modelValue.value - props.padding - 1 - 1 === 1) result.push(2);
    if (modelValue.value - props.padding - 1 - 1 > 1) result.push("…");
    if (modelValue.value - props.padding > 1) result.push(1);
    return result;
  })();
  const end = (() => {
    const result = [];
    for (let i = 1; i <= props.padding; i++) {
      const target = modelValue.value + i;
      if (target <= number.value) result.push(target);
    }
    if (number.value - modelValue.value - props.padding - 1 === 1)
      result.push(number.value - 1);
    if (number.value - modelValue.value - props.padding - 1 > 1)
      result.push("…");
    if (number.value - (modelValue.value + props.padding - 1) > 1)
      result.push(number.value);
    return result;
  })();

  return start.reverse().concat(end);
});
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 6px;
  justify-content: center;
  margin-top: 24px;

  &-btn {
    border-radius: inherit;
    color: inherit;
    font-size: 14px;
    padding: 8px;
    min-width: 32px;

    &:disabled {
      cursor: no-drop;
    }

    &.active {
      background-color: rgb(var(--color-dark));
      cursor: default;
    }
  }

  &-item {
    background-color: rgb(var(--color-blue-light));
    color: rgb(var(--color-white));
    border-radius: 4px;
    display: flex;
    justify-content: center;
    text-align: center;
    transition: 0.3s;

    &:hover {
      background-color: rgb(var(--color-blue-light), 0.8);
    }
  }
}
</style>

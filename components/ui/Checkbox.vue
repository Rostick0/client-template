<template>
  <UiControl :invalid="!!errorMessage" :message="errorMessage || message">
    <label class="control__checkbox checkbox" :class="{ active: modelValue }">
      <input
        hidden
        v-bind="$attrs"
        class="checkbox__input"
        type="checkbox"
        :checked="modelValue"
        @input="handleChange"
      />
      <span class="checkbox__icon">✓</span>
      <span class="checkbox__label" v-if="label">
        {{ label }}
      </span>
    </label>
  </UiControl>
</template>
<script setup>
defineComponent({
  inheritAttrs: false,
});

const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  label: String,
  modelValue: [Boolean, Number, String],
  message: String,
  placeholder: String,
  errorMessage: String,
  onChange: Function,
  deps: [Array, Object, String, Number],
  onDepsChange: {
    type: Function,
  },
  forceDeps: Boolean,
  innerConvertTo: Function,
});

function handleChange(event) {
  emits(
    "update:modelValue",
    props?.innerConvertTo?.(event.target.checked) ?? event.target.checked
  );
  props?.onChange?.(event);
}

const ctx = computed(() => ({
  modelValue: props.modelValue,
  handleChange,
  updateModelValue: (value) => emits("update:modelValue", value),
}));

watch(
  () => props.deps,
  (cur, prev) => {
    if (
      Array.isArray(prev)
        ? prev.find((item) => item !== undefined)
        : prev !== undefined
    ) {
      props?.onDepsChange?.(ctx.value);
    }
  },
  {
    deep: true,
    immediate: props.forceDeps,
  }
);
</script>

<style lang="scss" scoped>
.checkbox {
  padding: 0.75rem 0;
  display: flex;
  display: flex;
  align-items: center;
  transition: 0.3s;

  &.active {
    .checkbox__icon {
      background-color: rgb(var(--color-blue-light));
      color: rgb(var(--color-white));
    }
  }

  &__icon {
    border: 1px solid rgb(var(--color-blue-light));
    border-radius: 3px;
    color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 12px;
    padding-top: 1px;
    transition-property: background-color, color;
    transition-duration: 0.3s;
    width: 16px;
    height: 16px;
  }

  &__label {
    transition: 0.3s;
    font-size: 0.875rem;
    margin-left: 0.5rem;
  }
}
</style>

<template>
  <input
    v-bind="$attrs"
    :placeholder="placeholder"
    class="control__field"
    :class="{ invalid: !!errorMessage || invalid }"
    v-maska
    :data-maska="maska"
    :data-maska-tokens="maskaTokens"
    :data-maska-reversed="dataMaskaReversed"
    @change="handleChange"
    @input="handleInput"
    :value="modelValue"
  />
</template>

<script setup>
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String,
  invalid: Boolean,
  placeholder: String,
  maska: String,
  dataMaskaReversed: Boolean,
  maskaTokens: String,
  errorMessage: String,
  onChange: Function,
  deps: [Array, Object, String, Number],
  // small | standard | big
  onDepsChange: {
    type: Function,
  },
  forceDeps: Boolean,
});
function handleInput(event) {
  emits("update:modelValue", event.target.value || undefined);
}

function handleChange(event) {
  props?.onChange?.(event);
}

const ctx = computed(() => ({
  modelValue: props.modelValue,
  handleChange,
  handleInput,
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
.control__field {
  border: 1px solid rgb(var(--color-blue-light));
  border-radius: 0.33rem;
  font-size: 1rem;
  padding: 0.75rem 1.25rem;
  width: 100%;

  &::placeholder {
    color: rgb(var(--color-grey), 0.5);
  }
}
</style>

<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage || invalid"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <UiField
      :="$attrs"
      :modelValue="modelValue"
      @update:modelValue="(val) => emits('update:modelValue', val)"
    />
  </UiControl>
</template>

<script setup>
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: String,
  invalid: Boolean,
  rightIcon: String,
  message: String,
  label: String,
  errorMessage: String,
});
</script>

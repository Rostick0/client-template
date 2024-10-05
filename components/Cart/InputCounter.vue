<template>
  <div class="input-counter">
    <button class="input-counter__btn input-counter__decrement">-</button>
    <input
      class="input-counter__input"
      type="number"
      :value="modelValue"
      ref="input"
    />
    <button class="input-counter__btn input-counter__increment">+</button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Number,
  maxValue: Number,
});

const input = ref();

const validateInput = (value) => {
  if (value < 1 || isNaN(value)) return 1;

  if (props.maxValue && value > props.maxValue) return value;

  return value;
};

onMounted(() => {
  input.value.oninput = () => {
    input.value.value = validateInput(input.value.value);

    nextTick(() => {
      input.value.style.width = input.value.value.length + 1.5 + "ch";
    });
  };
});
</script>

<style lang="scss" scoped>
.input-counter {
  border: 1px solid rgb(var(--color-grey), 0.75);
  border-radius: 8px;
  display: flex;
  overflow: hidden;

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 20px;
    font-weight: 700;
    width: 20px;
    height: 20px;
  }

  &__input {
    border: 1px solid rgb(var(--color-grey), 0.75);
    border-top: none;
    border-bottom: none;
    font-weight: 500;
    padding: 0 4px;
    width: 1ch;
    min-width: 20px;
  }
}
</style>

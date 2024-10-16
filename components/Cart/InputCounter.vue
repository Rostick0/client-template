<template>
  <div class="input-counter">
    <button
      class="input-counter__btn input-counter__decrement"
      @click="updateValue(+modelValue - 1)"
    >
      --
    </button>
    <input
      class="input-counter__input"
      type="number"
      :value="modelValue"
      @input="(val) => updateValue(val.target.value)"
      v-maska
      data-maska-tokens="/^[0-9]*$/"
      min="1"
      :max="maxValue"
      ref="input"
    />
    <button
      class="input-counter__btn input-counter__increment"
      @click="updateValue(+modelValue + 1)"
    >
      +
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: 1,
  },
  maxValue: [Number, String],
});

const emits = defineEmits(["update:modelValue"]);

const inputValide = (value) => {
  if (!value) return "";
  
  if (value < 1 || isNaN(value)) return 1;

  if (props.maxValue && value > props.maxValue) return props.maxValue;

  return value;
};

const updateValue = (value) => emits("update:modelValue", inputValide(value));

const input = ref();

onMounted(() => {
  input.value.oninput = () => {
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

  &__decrement {
    letter-spacing: -2.5px;
  }

  &__input {
    border: 1px solid rgb(var(--color-grey), 0.75);
    border-top: none;
    border-bottom: none;
    font-weight: 500;
    text-align: center;
    padding: 0 4px;
    width: 1ch;
    min-width: 20px;
  }
}
</style>

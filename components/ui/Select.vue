<template>
  <UiControl
    :label="label"
    :hideMessage="hideMessage"
    :invalid="!!errorMessage"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <div @focusout="onFocusout" ref="wrapper" tabindex="-1" class="select">
      <div
        @keydown.enter="isOpened = !isOpened"
        class="select__field"
        tabindex="0"
        :class="{ select__active: isOpened }"
        @click="toggle"
        style="position: relative"
      >
        <template v-if="isSearchable">
          <div v-if="!isOpened" class="select__value">
            {{ (model?.value ?? model?.name ?? model?.title) || "Не выбрано" }}
          </div>
          <input
            class="select__value"
            ref="inputRef"
            @input="$emit('update:searchString', $event.target.value)"
            :value="searchString"
            v-if="isOpened"
            type="text"
          />
        </template>
        <template v-else>
          <div class="select__value">
            {{ (model?.value ?? model?.name ?? model?.title) || "Не выбрано" }}
          </div>
        </template>
      </div>
      <div
        ref="selectRef"
        v-if="isOpened"
        @scroll="handleScroll"
        class="select__options"
        @mousedown.prevent
      >
        <template v-if="options?.length">
          <div
            class="options__item"
            v-for="option in options"
            :key="option.id"
            @mousedown="handleSelect(option)"
            :class="{ selected: option?.id == model?.id }"
          >
            {{ option?.value ?? option?.name ?? option?.title }}
          </div>
        </template>
        <template v-else>
          <div class="options__notfound">Ничего не найдено</div>
        </template>
      </div>
    </div>
  </UiControl>
</template>

<script setup>
const selectRef = ref();
const props = defineProps({
  rightIcon: [String, Object, Array],
  errorMessage: String,
  message: String,
  label: String,
  searchString: [String, Number],
  isSearchable: Boolean,
  alwaysOpen: {
    type: Boolean,
    default: false,
  },
  closeAfterSelect: {
    type: Boolean,
    default: true,
  },
  hideMessage: Boolean,
  modelValue: {
    type: [Object, Number, String, Array],
  },
  options: Array,
  placeholder: [String, Number],
  withIcon: {
    default: true,
    type: Boolean,
  },
  isHideInput: {
    default: false,
    type: Boolean,
  },
  componentOption: {
    type: [Object, null],
  },
  page: {
    type: Number,
  },
  totalPages: {
    type: Number,
  },
});
const emits = defineEmits([
  "scrolledTop",
  "scrolledBottom",
  "update:modelValue",
  "update:searchString",
]);

if (props.isHideInput) {
  emits("update:searchString", null);
}

const model = computed({
  get() {
    if (!props.modelValue) return;

    return props.modelValue;
  },
  set(_value) {
    if (!_value) {
      return emits("update:modelValue", null);
    }

    if (props.modelValue?.id === _value?.id) {
      emits("update:searchString", null);
      return emits("update:modelValue", null);
    }

    return emits("update:modelValue", _value);
  },
});

const isOpened = ref(false);

const onInput = (e) => {
  emits("update:searchString", e.target.value);
  emits("update:modelValue", null);
};

watch([selectRef], () => {
  if (selectRef.value) {
    selectRef.value.scrollTo(0, selectRef.value.children[0].clientHeight / 15);
  }
});

const inputRef = ref();

const toggle = () => {
  isOpened.value = !isOpened.value;
  nextTick(() => {
    inputRef.value?.focus();
  });
};

const wrapper = ref();

const onFocusout = (e) => {
  if (!wrapper.value.contains(e.relatedTarget)) isOpened.value = false;
};

const handleSelect = (option) => {
  if (props.closeAfterSelect) {
    isOpened.value = false;
  }
  if (!props.isHideInput) {
    emits(
      "update:searchString",
      option?.value ?? option?.name ?? option?.title
    );
  }
  model.value = option;
};

const addMore = (event) => {
  emits("scrolledBottom", event.target);
};
</script>

<style lang="scss" scoped>
.select {
  border: 1px solid rgb(var(--color-blue-light));
  border-radius: 0.33rem;
  cursor: pointer;
  position: relative;

  &__field {
    width: 100%;
  }

  input {
    width: 100%;

    &::placeholder {
      line-height: 1.3;
    }
  }

  &__value {
    background-color: rgb(var(--color-white));
    border-radius: 0.33rem;
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.75rem 1.25rem;
    width: 100%;
  }

  .options {
    &__item {
      transition: 0.3s;

      &:hover {
        background-color: rgb(var(--color-blue-light));
        color: rgb(var(--color-white));
      }
      &.selected {
        background-color: rgb(var(--color-dark));
        color: rgb(var(--color-white));
      }
    }

    &__notfound {
      cursor: default;
    }
  }

  &__options {
    background-color: rgb(var(--color-white));
    border-radius: 0.33rem;
    border: 1px solid rgb(var(--color-pre-white));
    box-shadow: 0 1px 2px rgba(50, 50, 71, 0.08);
    position: absolute;
    // top: 108%;
    left: 0;
    overflow: auto;
    max-height: 20rem;
    width: 100%;
    z-index: 1000000;
  }
}

.options {
  &__item {
    appearance: none;
    border-bottom: 1px solid rgb(var(--color-pre-white));
    font-weight: 400;
    line-height: 1.3;
    padding: 0.75rem 1.25rem;
    -moz-padding-start: calc(1.25rem - 3px);
    transition: 0.3s;
    width: 100%;

    &:last-child {
      border-bottom: none;
    }
  }
}
</style>

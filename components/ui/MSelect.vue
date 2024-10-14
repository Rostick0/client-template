<template>
  <UiControl
    :label="label"
    :invalid="!!errorMessage"
    :message="errorMessage || message"
    :rightIcon="rightIcon"
  >
    <div
      @focusout="onFocusout"
      ref="wrapper"
      tabindex="-1"
      class="control__select select"
    >
      <div
        class="control__field"
        :class="{ select__active: isOpened }"
        @click="toggle"
      >
        <template v-if="isSearchable">
          <div v-if="!isOpened" class="select__value">
            {{ selectedItemsText || "Не выбрано" }}
            <!-- {{ "Выбрано " + modelValue?.length || "Не выбрано" }} -->
          </div>
          <input
            ref="inputRef"
            @input="$emit('update:searchString', $event.target.value)"
            :value="searchString"
            v-if="isOpened"
            type="text"
          />
        </template>
        <template v-else>
          <div class="select__value">
            <template v-if="selectedItemsText">{{
              selectedItemsText
            }}</template>
            <span class="select__value_placeholder" v-else>Не выбрано</span>
            <!-- {{ "Выбрано " + modelValue?.length || "Не выбрано" }} -->
          </div>
        </template>
      </div>
      <div
        v-if="isOpened"
        @scroll="handleScroll"
        class="select__options"
        @mousedown.prevent
      >
        <div
          class="options__item"
          v-for="option in sortedOptions"
          :key="option.id"
          @mousedown="handleSelect(option)"
          :class="{
            selected: modelValue?.find(
              (i) => option?.id == i?.id || option?.id == i
            ),
          }"
        >
          {{ option.value }}
        </div>
      </div>
    </div>
  </UiControl>
</template>

<script setup>
const emits = defineEmits([
  "update:modelValue",
  "update:searchString",
  "scrolledBottom",
]);

const props = defineProps({
  rightIcon: String,
  errorMessage: String,
  message: String,
  label: String,
  searchString: [String, Number],
  isSearchable: Boolean,
  placeholder: String,
  withIcon: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: Array,
    default: [],
  },
  options: Array,
});

const isOpened = ref(false);

const inputRef = ref();
const wrapper = ref();

const toggle = () => {
  isOpened.value = !isOpened.value;
  nextTick(() => {
    inputRef.value?.focus?.();
  });
};

const onFocusout = (e) => {
  if (!wrapper.value.contains(e.relatedTarget)) isOpened.value = false;
};

const handleSelect = (option) => {
  if (props.modelValue && props.modelValue?.find((i) => option.id == i.id)) {
    emits(
      "update:modelValue",
      props.modelValue?.filter((i) => i.id !== option.id)
    );
  } else {
    emits("update:modelValue", [...props.modelValue, option]);
  }
};

const sortedOptions = computed(() => {
  const options = [...(props?.options || [])];
  const modelValue = props.modelValue;

  options.sort((a, b) => {
    const firstVal = modelValue?.find?.((item) => item == a.id) ? 1 : 0;
    const secondVal = modelValue?.find?.((item) => item == b.id) ? 1 : 0;

    return secondVal - firstVal;
  });

  return options;
});

const selectedItemsText = computed(() =>
  props.modelValue
    ?.map((item) => item?.title || item?.name || item?.value || item?.slug)
    ?.join(", ")
);

const handleScroll = (event) => {
  const div = event.target;

  const scrollFromBottom =
    div.scrollHeight - (div.scrollTop + div.clientHeight);

  if (scrollFromBottom < 400) {
    emits("scrolledBottom");
  }
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

    &_placeholder {
      color: rgb(var(--color-dark), 0.5);
    }
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

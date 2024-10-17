<template>
  <div class="rubrics box-shadow-default">
    <button
      class="rubrics-item"
      :class="{ active: !rubricIdActive }"
      @click="emits('updateRubric')"
    >
      Все
    </button>
    <button
      class="rubrics-item"
      :class="{ active: rubric?.id == rubricIdActive }"
      v-for="rubric in rubrics"
      :key="rubric?.id"
      @click="emits('updateRubric', rubric?.id)"
    >
      {{ $t(rubric?.name) }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  rubrics: Array,
  rubricIdActive: Number,
});

const emits = defineEmits(["updateRubric"]);
</script>

<style lang="scss" scoped>
.rubrics {
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 10px;
  padding: 14px 20px;
  margin-bottom: 20px;

  &-item {
    transition-property: color;
    transition-duration: 0.3s;

    &:hover {
      color: rgb(var(--color-blue-light));
    }

    &.active {
      font-weight: 700;
    }

    &.clear {
      margin-left: auto;
      color: rgb(var(--color-red));
    }
  }
}
</style>

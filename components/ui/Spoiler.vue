<template>
  <div
    class="spoiler"
    itemscope
    itemprop="mainEntity"
    itemtype="https://schema.org/Question"
  >
    <div class="spoiler__switch" :class="{ active }" @click="active = !active">
      <svg
        class="spoiler__icon"
        :class="{ active }"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.825 6.91248L10 10.7291L6.175 6.91248L5 8.08748L10 13.0875L15 8.08748L13.825 6.91248Z"
          fill="rgb(var(--color-blue-light))"
        />
      </svg>
      <div class="spoiler__title" itemprop="name">
        <slot name="title" />
      </div>
    </div>
    <div
      class="spoiler__content"
      :class="{ active }"
      itemscope
      itemprop="acceptedAnswer"
      itemtype="https://schema.org/Answer"
    >
      <div class="spoiler__content_inner" itemprop="text">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script setup>
const active = ref(false);

// const route = useRoute();
</script>

<style lang="scss" scoped>
.spoiler {
  &__switch {
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 4px;
  }

  &__icon {
    flex-shrink: 0;
    transition: 0.3s;

    &.active {
      transform: rotate(180deg);
    }
  }

  &__title {
    display: flex;
    column-gap: 4px;
    font-size: 18px;
    font-weight: 700;
  }

  &__content {
    padding-left: 24px;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1);
    overflow: hidden;
    max-height: 0;

    &_inner {
      margin-top: 8px;
    }

    &.active {
      transition: max-height 1s ease-in-out;
      max-height: 2000px;
    }
  }
}
</style>

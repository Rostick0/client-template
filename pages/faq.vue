<template>
  <div class="faq">
    <div class="container">
      <div class="faq-spoilers">
        <UiSpoiler v-for="item in data" :key="item.title">
          <template #title>{{ item.title }}</template>
          <template #content>{{ item.content }}</template>
        </UiSpoiler>
      </div>
    </div>
  </div>
</template>

<script setup>
const data = [
  {
    title: "abao",
    content: "",
  },
];
</script>

<style lang="scss" scoped>
.faq {
  &-spoilers {
    display: grid;
    row-gap: 24px;
  }
}
</style>

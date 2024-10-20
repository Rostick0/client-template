<template>
  <div class="messages">
    <MessageItem
      v-for="message in messages"
      :key="message?.id"
      :message="message"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  messages: Array,
});
</script>

<style lang="scss" scoped>
.messages {
  display: grid;
  row-gap: 10px;
}
</style>

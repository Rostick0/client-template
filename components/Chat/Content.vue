<template>
  <div class="chat-content">
    <div class="chat-contet__interlocutor">
      {{ interlocutor }}
    </div>
    <MessageList :messages="messages" />
  </div>
</template>

<script setup>
const props = defineProps({
  interlocutor: Object,
  messages: Array,
});
</script>

<style lang="scss" scoped>
.chat-content {
}
</style>

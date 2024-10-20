<template>
  <div class="chats">
    <ChatItem v-for="chat in chats" :key="chat?.id" :chat="chat" />
  </div>
</template>

<script setup>
const props = defineProps({
  chats: Array,
});
</script>

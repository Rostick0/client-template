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

<style lang="scss" scoped>
.chats {
  display: grid;
  row-gap: 4px;
  // overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100% - 60.4px);
}
</style>

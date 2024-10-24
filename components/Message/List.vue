<template>
  <div class="messages">
    <template v-for="(message, index) in messages">
      <time
        class="messages__time"
        :datetime="message?.created_at"
        v-if="
          moment(message?.created_at).format('YYYY-MM-DD') !==
          moment(messages?.[index - 1]?.created_at).format('YYYY-MM-DD')
        "
        >{{ dateTimeChatFormat(message?.created_at) }}</time
      >
      <MessageItem :message="message" />
    </template>
  </div>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  messages: Array,
});
</script>

<style lang="scss" scoped>
.messages {
  display: grid;
  row-gap: 10px;
  overflow: auto;
  // max-height: 200px;

  &__time {
    background-color: rgb(var(--color-pre-white));
    border-radius: 4px;
    font-size: 13px;
    padding: 4px 8px;
    line-height: 1;
    position: sticky;
    top: 0;
    margin: 0 auto;
    width: fit-content;
  }
}
</style>

<template>
  <div class="chat-content">
    <div class="chat-content__top">
      <NuxtLink
        class="chat-content__interlocutor"
        :to="`/users/${convertNameToUrl(chat?.chat_interlocutor?.user?.name)}`"
      >
        <UserAvatar :user="chat?.chat_interlocutor?.user" />
        <strong>
          {{ chat?.chat_interlocutor?.user?.name }}
        </strong>
      </NuxtLink>
    </div>
    <div class="chat-content__center">
      <MessageList :messages="messages" />
    </div>
    <div class="chat-content__bottom">
      <ChatForm @messageAdd="messageAdd" />
    </div>
  </div>
</template>

<script setup>
import last from "lodash/last";

const props = defineProps({
  // interlocutor: Object,
  chat: Object,
  messages: Array,
});

const messages = ref(props.messages);

const messageAdd = (message) => (messages.value = [...messages.value, message]);

const tempMessages = useState("tempMessages");

watch(
  () => tempMessages.value?.length,
  (cur, prev) => {
    if (prev < 1 || cur > prev) {
      messageAdd(last(tempMessages.value));
    }
  }
);
</script>

<style lang="scss" scoped>
.chat-content {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__interlocutor {
    display: inline-flex;
    column-gap: 10px;
  }

  &__center {
    flex-grow: 1;
  }
}
</style>

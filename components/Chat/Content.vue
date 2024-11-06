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
import api from "~/api";

const props = defineProps({
  // interlocutor: Object,
  chat: Object,
  messages: Array,
});

const messages = ref(props.messages);

const scrollToBottom = () =>
  nextTick(() => {
    const messageArea = document.querySelector(
      "#messageArea-" + messages.value[0]?.id
    );

    messageArea.scrollIntoView?.();
  });
onMounted(() => {
  scrollToBottom();
});

const isTotalMessagesPages = ref(false);
const scrollAddMessages = async () => {
  chatsPage.value += 1;

  const oldChats = await api.messages.getAll({
    params: {
      ...chatsParams,
      page: chatsPage.value,
    },
  });

  if (oldChats.last_page <= chatsPage.value) isTotalChatsPages.value = true;

  chats.value = [...chats.value, ...oldChats.data];
};

const messageAdd = (message) => (messages.value = [message, ...messages.value]);
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
  row-gap: 20px;
  height: 100%;

  &__interlocutor {
    display: inline-flex;
    column-gap: 10px;
  }

  &__center {
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
}
</style>

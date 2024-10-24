<template>
  <div class="chat">
    <div class="container">
      <div class="chat-container box-shadow-default">
        <div class="chat-container__left">
          <div class="chat-container__left_search">
            <VFormComponent :field="name" />
          </div>
          <ChatList :chats="chats" />
        </div>
        <div class="chat-container__right">
          <ChatContent :chat="chat" :messages="chat?.messages" />
        </div>
      </div>
      <!-- <div class="chat__top">{{ interlocutor }}</div> -->
    </div>
  </div>
</template>

<script setup>
import last from "lodash/last";

const route = useRoute();
const id = route.query.id;

const { filters } = useFilters();

const name = ref({
  type: "text",
  name: "filterLIKE[chat_interlocutor.user.name]",
  rules: "max:255",
  modelValue: "",

  bind: {
    placeholder: "Поиск",
  },
});

watch(
  () => name.value.modelValue,
  (cur) => {
    filters.value[name.value.name] = cur?.trim?.();
  }
);

const { data: chat, get: chatGet } = await useApi({
  name: "chats.get",
  params: {
    extends: "chat_interlocutor.user.image.image,messages.images.image",
  },
  requestParams: {
    id,
  },
  filters,
});
await chatGet();

const { data: chats, get: chatsGet } = await useApi({
  name: "chats.getAll",
  params: {
    extends: "chat_interlocutor.user.image.image,message_last",
  },
  filters,
});
await chatsGet();

const tempMessages = useState("tempMessages");
watch(
  () => tempMessages.value?.length,
  (cur, prev) => {
    if (!prev || cur > prev) {
      const { chat: chatMessage, ...lastMessage } = last(tempMessages.value);

      const findedChatIndex = chats.value.findIndex(
        (item) => item?.id === chatMessage?.id
      );

      if (findedChatIndex !== -1) {
        chats.value.splice(findedChatIndex, 1);
      }

      chats.value = [
        ...chats.value,
        { ...chatMessage, message_last: lastMessage },
      ];

      // messageAdd(last(tempMessages.value));
    }
  }
);
</script>

<style lang="scss" scoped>
.chat {
  display: grid;
  flex-grow: 1;

  &-container {
    border-radius: 8px;
    display: flex;
    column-gap: 20px;
    padding: 20px;
    height: 100%;
    // max-height: calc(100dvh - 282px);

    &__left {
      min-width: 320px;

      &_search {
        margin-bottom: 16px;
      }
    }

    &__right {
      flex-grow: 1;
    }
  }
}
</style>

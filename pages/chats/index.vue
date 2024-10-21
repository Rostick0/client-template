<template>
  <div class="chat">
    <div class="container">
      <div class="chat-container box-shadow-default">
        <div class="chat-container__left">
          <ChatList :chats="chats" />
        </div>
        <div class="chat-container__right">
          <ChatContent
            :interlocutor="interlocutor"
            :messages="chat?.messages"
          />
        </div>
      </div>
      <!-- <div class="chat__top">{{ interlocutor }}</div> -->
    </div>
  </div>
</template>

<script setup>
import api from "~/api";

const route = useRoute();
const id = route.query.id;

const user = useState("user");

const chat = await api.chats
  .get({
    id,
    params: {
      extends: "chat_interlocutor.user.image.image,messages",
    },
  })
  .then((res) => res?.data);

const chats = await api.chats
  .getAll({
    params: {
      extends: "chat_interlocutor.user.image.image,message_last",
    },
  })
  .then((res) => res?.data);

const interlocutor = chat?.data?.chat_interlocutor;
</script>

<style lang="scss" scoped>
.chat {
  &-container {
    border-radius: 8px;
    padding: 20px;
  }
}
</style>

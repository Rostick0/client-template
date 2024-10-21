<template>
  <NuxtLink
    class="chat"
    :class="{ active: chat?.id == route.query?.id }"
    :to="`/chats?id=${chat?.id}`"
  >
    <div class="chat__left">
      <UserAvatar :user="chat?.chat_interlocutor?.user" />
    </div>
    <div class="chat__right">
      <div class="chat__right_top">
        <NuxtLink
          class="chat__user_name"
          :to="`/vendors/${chat?.chat_interlocutor?.user?.name?.toLowerCase()}`"
        >
          {{ chat?.chat_interlocutor?.user?.name }}
        </NuxtLink>
        <time
          class="chat__message_time"
          :datetime="chat?.message_last?.created_at"
        >
          {{
            moment(chat?.message_last?.created_at).format(
              "DD " +
                (isCurrentYear(chat?.message_last?.created_at)
                  ? "MMMM"
                  : "MM YY")
            )
          }}
        </time>
      </div>
      <div class="chat__message">
        <strong v-if="user?.id == chat?.message_last?.user_id">Вы:&nbsp;</strong
        >{{
          truncate(chat?.message_last?.content, {
            lenght: 50,
          })
        }}
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import moment from "moment";
import truncate from "lodash/truncate";

const props = defineProps({
  chat: Object,
});

const route = useRoute();

const user = useState("user");
</script>

<style lang="scss" scoped>
.chat {
  border-radius: 6px;
  display: flex;
  align-items: flex-start;
  column-gap: 10px;
  padding: 16px;
  transition-property: background-color;
  transition-duration: 0.3s;
  max-width: 320px;

  &:hover {
    background: rgb(var(--color-pre-white));
  }

  &.active {
    background: rgb(var(--color-blue-light), 0.1);
  }

  &__right {
    flex-grow: 1;

    &_top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
    }
  }

  &__user {
    &_name {
      font-weight: 700;
    }
  }

  &__message {
    font-size: 14px;
    text-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 238px;

    &_time {
      opacity: 0.75;
      font-size: 12px;
    }
  }
}
</style>

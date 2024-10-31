<template>
  <div class="product-user">
    <div class="product-user__info">
      <UserAvatar :user="user" />
      <div class="product-user__">
        {{ user?.name }}
        <div class="product-user__raiting">
          <IconStar />
          <span>{{ user?.raiting }}</span>
        </div>
      </div>
    </div>
    <div class="product-user__chat">
      <UiButton @click="onClickChat">Написать продавцу</UiButton>
    </div>
  </div>
</template>

<script setup>
import api from "~/api";

const props = defineProps({
  productId: Number,
  user: Object,
});

const onClickChat = async () => {
  const data = {
    model: "App\\Models\\Product",
    id: props.productId,
  };

  const res = await api.chats.create({ data });
};
</script>

<style lang="scss" scoped>
.product-user {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  &__info {
    display: flex;
    column-gap: 10px;
  }

  &__raiting {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  &__chat {
  }
}
</style>

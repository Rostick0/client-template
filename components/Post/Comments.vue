<template>
  <div class="post-comments">
    <div class="post-comment" v-for="comment in comments" :key="comment?.id">
      <div class="post-comment__info">
        <UserAvatar :user="comment?.user" />
        <strong class="">{{ comment?.user?.name }}</strong>
        <time class="post-comment__date" :datetime="comment?.created_at">{{
          dateTimeUsabilityFormat(comment?.created_at)
        }}</time>
      </div>
      <div class="post-comment__text">{{ comment?.text }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  comments: Array,
});
</script>

<style lang="scss" scoped>
.post-comments {
  display: grid;
  row-gap: 20px;
}

.post-comment {
  &__info {
    display: flex;
    column-gap: 8px;
    margin-bottom: 6px;
  }

  &__date {
    font-size: 14px;
    opacity: 0.75;
  }
}
</style>

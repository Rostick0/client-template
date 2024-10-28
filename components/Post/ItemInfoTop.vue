<template>
  <div class="post-info__top">
    <time class="post-info__date" :datetime="post?.created_at">
      {{ moment(post?.created_at).format(dateTimeViewType) }}
    </time>
    <div class="post-info__views">
      <IconEye width="16" height="16" />
      <span>{{ formatNumber(post?.count_view) }}</span>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  post: Object,
});
</script>

<style lang="scss" scoped>
.post-info {
  &__top {
    display: flex;
    column-gap: 6px;
    font-size: 14px;
    margin-bottom: 4px;
  }

  &__date {
    opacity: 0.75;
  }

  &__views {
    display: flex;
    column-gap: 2px;
  }
}
</style>

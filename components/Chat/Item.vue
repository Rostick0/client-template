<template>
  <div class="chat">
    <div class="chat__left">
        {{ chat?.user }}
    </div>
    <div class="chat__right"></div>
    <!-- {{ chat }} -->
  </div>
</template>

<script setup>
const props = defineProps({
  chat: Object,
});
</script>

<style lang="scss" scoped>
.chat {
}
</style>

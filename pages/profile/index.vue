<template>
  <div class="profile">
    <!-- {{ user }} -->
  </div>
</template>

<script setup>
definePageMeta({
  layout: "profile",
});

const user = useState("user");
</script>

<style lang="scss" scoped>
.profile {
}
</style>

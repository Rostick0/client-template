<template>
  <div class="profile-settings">
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
.profile-settings {
}
</style>

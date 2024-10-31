<template>
  <div class="container">
    <div class="profile-content">
      <div class="profile-content__container">
        <div class="profile-content__container_left box-shadow-default">
          <nav class="profile-content__nav">
            <NuxtLink
              class="profile-content__nav_link"
              :class="{ active: route.path == item.link }"
              v-for="item in navigations"
              :to="item.link"
              >{{ item.name }}</NuxtLink
            >
          </nav>
        </div>
        <div class="profile-content__container_right box-shadow-default">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const navigations = [
  {
    name: "Личная информация",
    link: "/profile",
  },
  {
    name: "Заказы",
    link: "/profile/orders",
  },
  {
    name: "Настройки",
    link: "/profile/settings",
  },
];
</script>

<style lang="scss" scoped>
.profile-content {
  &__container {
    display: flex;
    align-items: flex-start;
    column-gap: 40px;

    &_left {
      border-radius: 8px;
      flex-shrink: 0;
      padding: 20px;
      width: 200px;
    }

    &_right {
      border-radius: 8px;
      flex-grow: 1;
      padding: 20px;
    }
  }

  &__nav {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    &_link {
      font-size: 14px;
      transition: 0.3s;

      &.active {
        color: rgb(var(--color-blue-light));
      }
    }
  }
}
</style>

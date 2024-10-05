<template>
  <header class="header">
    <div class="container">
      <!-- <div class="header-top">1</div> -->
      <div class="header-bottom">
        <NuxtLink to="/">
          <IconLogo />
        </NuxtLink>
        <NuxtLink class="header-catalog" to="/catalog">
          <UiButton>≡ Каталог</UiButton>
        </NuxtLink>
        <div class="header-search">
          <Search />
        </div>
        <div class="header-navigation">
          <NuxtLink class="header-navigation__link" to="/favorite">
            <IconFavorite
              class="header-navigation__icon svg-stroke"
              stroke="rgb(var(--color-dark))"
              width="24"
              height="24"
            />
            <span>Избранное</span>
          </NuxtLink>
          <NuxtLink class="header-navigation__link" to="/cart">
            <IconCart
              class="header-navigation__icon svg-fill"
              fill="rgb(var(--color-dark))"
              width="24"
              height="24"
            />
            <span>Корзина</span>
          </NuxtLink>
          <NuxtLink
            class="header-navigation__link"
            :to="user ? '/profile' : '/login'"
          >
            <IconProfile
              class="header-navigation__icon svg-fill"
              fill="rgb(var(--color-dark))"
              width="24"
              height="24"
            />
            <span>{{ user ? "Профиль" : "Вход" }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const user = useState("user");
</script>

<style lang="scss" scoped>
.header {
  background-color: rgb(var(--color-white));
  box-shadow: 0 5px 15px -5px rgb(var(--color-dark), 0.25);
  position: sticky;
  top: 0;
  z-index: 2;

  &-bottom {
    display: flex;
    align-items: center;
    padding: 12px 0;
  }

  &-catalog {
    margin-left: 20px;
  }

  &-search {
    flex-grow: 1;
    padding: 0 32px;
    margin-right: auto;
  }

  &-navigation {
    display: flex;
    grid-gap: 16px;

    &__link {
      font-size: 14px;
      display: flex;
      align-items: center;
      flex-direction: column;
      row-gap: 4px;
      transition: 0.3s;

      &:hover {
        color: rgb(var(--color-blue-light));

        .svg-stroke {
          stroke: rgb(var(--color-blue-light));
        }

        .svg-fill {
          fill: rgb(var(--color-blue-light));
        }
      }
    }
  }
}
</style>

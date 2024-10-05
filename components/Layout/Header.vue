<template>
  <header class="header box-shadow-default">
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
            <div class="header-navigation__icon">
              <IconFavorite
                class="header-navigation__svg svg-stroke"
                stroke="rgb(var(--color-dark))"
                width="24"
                height="24"
              />
              <div
                class="header-navigation__icon_count"
                v-if="favoriteProductIds?.length"
              >
                {{ favoriteProductIds?.length }}
              </div>
            </div>
            <span>Избранное</span>
          </NuxtLink>
          <NuxtLink class="header-navigation__link" to="/cart">
            <div class="header-navigation__icon">
              <IconCart
                class="header-navigation__svg svg-fill"
                fill="rgb(var(--color-dark))"
                width="24"
                height="24"
              />
              <div
                class="header-navigation__icon_count"
                v-if="cartProduct?.length"
              >
                {{ cartProduct?.length }}
              </div>
            </div>
            <span>Корзина</span>
          </NuxtLink>
          <NuxtLink
            class="header-navigation__link"
            :to="user ? '/profile' : '/login'"
          >
            <div class="header-navigation__icon">
              <IconProfile
                class="header-navigation__svg svg-fill"
                fill="rgb(var(--color-dark))"
                width="24"
                height="24"
              />
            </div>
            <span>{{ user ? "Профиль" : "Вход" }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const user = useState("user");
const cartProduct = useState("cartProduct");
const favoriteProductIds = useState("favoriteProductIds");
</script>

<style lang="scss" scoped>
.header {
  background-color: rgb(var(--color-white));
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

    &__icon {
      display: flex;
      position: relative;

      &_count {
        background-color: rgb(var(--color-blue-light));
        color: rgb(var(--color-white));
        border-radius: 1rem;
        font-size: 12px;
        line-height: 1;
        text-align: center;
        padding: 2px;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -25%);
        min-width: 16px;
      }
    }
  }
}
</style>

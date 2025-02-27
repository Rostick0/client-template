<template>
  <div
    class="main-search"
    @focusin="onFocusin"
    @focusout="onFocusout"
    ref="wrapper"
    tabindex="-1"
  >
    <div class="main-search__field">
      <input
        class="main-search__input"
        ref="searchInput"
        v-model="search"
        type="text"
        :placeholder="placeholder"
      />
      <button
        class="d-flex main-search__close"
        @click="search = ''"
        v-show="search?.length > 1"
        title="Reset search"
        type="reset"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.827 10.5002L16.7258 4.60135C17.0922 4.23517 17.0922 3.64104 16.7258 3.27487C16.3593 2.90838 15.7658 2.90838 15.3993 3.27487L9.50047 9.17367L3.60135 3.27487C3.23486 2.90838 2.64135 2.90838 2.27487 3.27487C1.90838 3.64104 1.90838 4.23517 2.27487 4.60135L8.17399 10.5002L2.27487 16.399C1.90838 16.7651 1.90838 17.3593 2.27487 17.7254C2.45811 17.9084 2.69826 18 2.93811 18C3.17795 18 3.4181 17.9084 3.60135 17.7251L9.50047 11.8263L15.3993 17.7251C15.5825 17.9084 15.8227 18 16.0625 18C16.3024 18 16.5425 17.9084 16.7258 17.7251C17.0922 17.359 17.0922 16.7648 16.7258 16.3987L10.827 10.5002Z"
            fill="#1D1B20"
            fill-opacity="0.2"
          />
        </svg>
      </button>
      <UiButton
        class="d-flex main-search__send"
        title="Search"
        :variant="variant"
        @click="redirectToSearch"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_417_350)">
            <path
              class="svg-fill"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.3 11.0583L17.075 15.8333L15.8333 17.075L11.0583 12.3C10.1667 12.9417 9.09167 13.3333 7.91667 13.3333C4.925 13.3333 2.5 10.9083 2.5 7.91667C2.5 4.925 4.925 2.5 7.91667 2.5C10.9083 2.5 13.3333 4.925 13.3333 7.91667C13.3333 9.09167 12.9417 10.1667 12.3 11.0583ZM7.91667 4.16667C5.84167 4.16667 4.16667 5.84167 4.16667 7.91667C4.16667 9.99167 5.84167 11.6667 7.91667 11.6667C9.99167 11.6667 11.6667 9.99167 11.6667 7.91667C11.6667 5.84167 9.99167 4.16667 7.91667 4.16667Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_417_350">
              <rect
                class="svg-fill"
                width="20"
                height="20"
                rx="10"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>
      </UiButton>
    </div>
    <div class="main-search__options box-shadow-default" v-show="isShow">
      <template v-if="products?.length">
        <NuxtLink
          class="main-search-option"
          :to="`/products/${product?.link_name}`"
          @click="isShow = false"
          v-for="product in products"
          :key="product?.id"
        >
          <div class="main-search-option__image">
            <img
              class="main-search-option__img"
              :scr="product?.main_image?.image?.path_webp"
              :alt="product?.title"
              decoding="async"
              loading="lazy"
              v-lazy-load
              width="48"
              height="48"
            />
          </div>
          <!-- <div class="main-search-option__title">{{ product?.title }}</div> -->
        </NuxtLink>
        <NuxtLink
          class="main-search-option__more"
          v-if="productMeta?.last_page > 1"
          :to="`/search?search=${search}`"
          @click="isShow = false"
          >Посмотреть все результаты</NuxtLink
        >
      </template>
      <div class="color-red" v-else>Отсутствуют результаты</div>
    </div>
  </div>
</template>

<script setup>
import debounce from "lodash/debounce";

const areEnoughLetters = (valLength) => valLength >= 2;

const searchInput = ref();

const props = defineProps({
  placeholder: {
    type: String,
    default: "Поиск товаров",
  },
  variant: String,
});

const search = ref("");
const isShow = ref();

const wrapper = ref();
const onFocusin = () =>
  areEnoughLetters(search.value?.length) && (isShow.value = true);
const onFocusout = (e) =>
  !wrapper.value.contains(e.relatedTarget) && (isShow.value = false);

watch(
  () => search.value?.length,
  debounce((newV) => {
    isShow.value = areEnoughLetters(newV) ? true : false;
  }, 200)
);

const { filters } = useFilters({
  initialFilters: {
    search: "",
  },
});

const { data: products, meta: productMeta } = await useApi({
  name: "products.getAll",
  filters,
  params: {
    // extendsCount: "cars",
    // sort: "cars_count,-name",
    limit: 6,
  },
});

const redirectToSearch = () => navigateTo(`/search?search=${search.value}`);

watch(
  () => search.value,
  debounce(async (newV) => {
    if (!isShow.value) return;

    filters.value["search"] = newV;
  }, 500)
);
</script>

<style lang="scss" scoped>
.main-search {
  position: relative;

  &__field {
    // background-color: var(--color-basic);
    border-radius: 8px;
    display: flex;
    position: relative;
  }

  &__input {
    border: 1px solid rgb(var(--color-blue-light));
    border-radius: 8px;
    font-size: 16px;
    padding: 8px;
    position: relative;
    width: 100%;

    &::placeholder {
      color: rgb(var(--color-grey), 0.6);
    }
  }

  &__close {
    align-self: center;
    position: absolute;
    right: 72px;
  }

  &__send {
    padding: 10px 20px;
    margin-left: -10px;
    padding-left: 30px;
  }

  &__options {
    background-color: rgb(var(--color-white));
    border-radius: 8px;
    // box-shadow: 0 5px 15px -5px rgb(var(--color-dark), 0.25);
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    padding: 12px 10px;
    position: absolute;
    overflow: auto;
    width: calc(100% - 60px);
    z-index: 2;
  }

  &-option {
    display: flex;
    column-gap: 10px;

    &__image {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
    }

    &__img {
      object-fit: contain;
    }

    &__more {
      color: rgb(var(--color-grey));
      margin-top: 8px;
    }
  }

  @media (max-width: 768px) {
    &__send {
      padding: 11.25px;
      padding-left: 26px;
    }

    &__close {
      right: 60px;
    }

    &__options {
      width: 100%;
    }
  }
}
</style>

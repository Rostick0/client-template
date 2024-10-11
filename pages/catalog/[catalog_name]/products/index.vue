<template>
  <div class="catalog">
    <div class="container">
      <div class="catalog__top">
        <h1 class="catalog__h1 h1">{{ $t(catalogData?.name) }}</h1>
        {{ withNumWord(meta?.total, ["товар", "товара", "товаров"]) }}
      </div>
      <div class="catalog-content">
        <div class="catalog-content__left">
          <div class="catalog-content__filter"></div>
        </div>
        <div class="catalog-content__right">
          <div class="catalog-content__sorts box-shadow-default">
            <button
              class="catalog-content__sorts_btn"
              :class="{
                active: filters.sort?.replace?.('-', '') === item.value,
              }"
              v-for="item in sorts"
              :key="item.value"
              @click="updateSort(item.value)"
            >
              {{ item.name }}
              <span
                class="catalog-content__sorts_btn_arrow"
                v-if="filters.sort?.replace?.('-', '') === item.value"
              >
                {{ filters.sort?.startsWith?.("-", 0) ? "↓" : "↑" }}
              </span>
            </button>
          </div>
          <div class="catalog-content__products">
            <ProductList :products="data" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "~/api";

const route = useRoute();

// const { data: catalogData, get: catalogGet } = await useApi({
//   name: "categories.getAll",
//   params: {
//     "filterEQ[name]": route.params?.catalog_name,
//     limit: 1,
//   },
// });
// await catalogGet();

const catalogData = await api.categories
  .getAll({
    params: {
      "filterEQ[name]": route.params?.catalog_name,
      limit: 1,
    },
  })
  .then((res) => res?.data?.[0]);

if (!catalogData) throw navigateTo("/404");

const { filters } = useFilters({
  initialFilters: {
    sort: "id",
  },
});

const { data, get, meta } = await useApi({
  name: "products.getAll",
  params: {
    "filterEQ[category.name]": route.params?.catalog_name,
  },
  filters,
});
await get();

const sorts = [
  {
    name: "По цене",
    value: "price",
  },
  {
    name: "По новизне",
    value: "id",
  },
  {
    name: "По названию",
    value: "title",
  },
  {
    name: "По рейтингу",
    value: "raiting",
  },
];

const updateSort = (value) => {
  console.log(filters.value.sort);
  if (filters.value.sort?.replace?.("-", "") === value) {
    filters.value.sort = filters.value.sort?.startsWith?.("-", 0)
      ? value
      : "-" + value;
    return;
  }

  filters.value.sort = value;
};
</script>

<style lang="scss" scoped>
.catalog {
  &__top {
    margin-bottom: 40px;
  }

  &__h1 {
    margin-bottom: 0;
  }

  &-content {
    display: flex;
    align-items: flex-start;
    column-gap: 32px;

    &__right {
      flex-grow: 1;
    }

    &__sorts {
      border-radius: 8px;
      display: flex;
      column-gap: 12px;
      padding: 16px 20px;
      margin-bottom: 20px;

      &_btn {
        position: relative;
        transition: 0.3s;

        &.active {
          font-weight: 700;
        }

        &:hover {
          color: rgb(var(--color-blue-light));
        }

        &_arrow {
          font-family: "Roboto";
        }
      }
    }

    &__products {
    }
  }
}
</style>

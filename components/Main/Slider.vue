<template>
  <Swiper class="main-slider" :modules="[Navigation]" :navigation="{}">
    <SwiperSlide
      class="main-slider__item"
      v-for="item in slides"
      :key="item?.image"
    >
      <NuxtLink class="main-slider__link" :to="item?.link_name">
        <img
          class="main-slider__img"
          :src="item?.image?.image?.path_webp"
          :alt="item?.title"
          v-lazy-load
          decoding="async"
          loading="lazy"
          width="1380"
          height="350"
        />
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
await import("swiper/css");
await import("swiper/css/navigation");
// import "swiper/css/pagination";

const props = defineProps({
  slides: Array,
});

// const images = [
//   {
//     link: "/products",
//     title: "",
//     image:
//       "https://cms.mvideo.ru/magnoliaPublic/.imaging/webp/dam/a73f8496-2220-454e-8ad3-eede8f1832c1",
//   },
//   {
//     link: "/posts",
//     title: "",
//     image:
//       "https://cms.mvideo.ru/magnoliaPublic/.imaging/webp/dam/484bbb92-e76a-47dc-8120-9fd1185c73c6",
//   },
// ];
</script>

<style lang="scss" scoped>
.main-slider {
  display: flex;
  height: 350px;

  &__img {
    object-fit: cover;
    width: 100%;
  }
}
</style>

<style lang="scss">
.main-slider {
  .swiper-button {
    &-prev,
    &-next {
      background-color: rgb(var(--color-dark), 0.75);
      color: rgb(var(--color-white));
      border-radius: 50%;
      width: 32px;
      height: 32px;

      &::after {
        font-size: 16px;
      }
    }

    &-prev {
      &::after {
        margin-left: -3px;
      }
    }

    &-next {
      &::after {
        margin-left: 3px;
      }
    }
  }
}
</style>

<template>
  <Swiper class="main-slider" :modules="[Navigation]" :navigation="{}">
    <SwiperSlide
      class="main-slider__item"
      v-for="item in images"
      :key="item?.image"
    >
      <img
        class="main-slider__img"
        :src="item?.image"
        :alt="item?.title"
        v-lazy-load
        decoding="async"
        loading="lazy"
        width="1420"
        height="350"
      />
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
await import("swiper/css");
import "swiper/css/navigation";
// import "swiper/css/pagination";

const images = [
  {
    link: "",
    title: "",
    image:
      "https://cms.mvideo.ru/magnoliaPublic/.imaging/webp/dam/a73f8496-2220-454e-8ad3-eede8f1832c1",
  },
  {
    link: "",
    title: "",
    image:
      "https://cms.mvideo.ru/magnoliaPublic/.imaging/webp/dam/484bbb92-e76a-47dc-8120-9fd1185c73c6",
  },
];
</script>

<style lang="scss" scoped>
.main-slider {
  &__img {
    object-fit: cover;
    // object-position: center;
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

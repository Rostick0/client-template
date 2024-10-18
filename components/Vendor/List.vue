<template>
  <div class="vendors">
    <NuxtLink
      class="vendor"
      v-for="vendor in vendors"
      :key="vendor?.id"
      :to="`/vendors/${vendor?.name?.toLowerCase()}`"
    >
      <div class="vendor__image">
        <img
          class="vendor__img"
          :src="vendor?.main_image?.image?.path_webp"
          :alt="vendor?.name"
          v-lazy-load
          decoding="async"
          loading="lazy"
          width="290"
          height="174"
        />
      </div>
      <!-- <div class="vendor__title">{{ vendor?.name }}</div> -->
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  vendors: Array,
});
</script>

<style lang="scss" scoped>
.vendors {
  display: flex;
  grid-gap: 20px;
  overflow: auto;
}

.vendor {
  display: flex;
  transition-property: transform;
  transition-duration: 0.3s;
  width: 160px;

  &:hover {
    // opacity: 0.75;
    transform: scale(1.05);
  }

  &__image {
    padding-top: 80%;
    position: relative;
    width: 100%;
  }

  &__img {
    display: flex;
    object-fit: contain;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

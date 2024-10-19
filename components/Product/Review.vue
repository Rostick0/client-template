<template>
  <div class="product-review">
    <div class="product-review__top">
      <div class="product-review-user">
        <UserAvatar class="product-review-user__avatar" :user="review?.user" />
        <div class="product-review-user__info">
          <div class="product-review-user__info_top">
            <div class="product-review-user__name">
              {{ review?.user?.name }}
            </div>
            <div class="product-review-user__mark">
              <IconStar class="product-review-user__star" />
              &nbsp;
              <span>{{ review?.mark }}</span>
            </div>
          </div>
          <time
            class="product-review-user__date"
            :datetime="review?.created_at"
          >
            {{ moment(review?.created_at).format("DD.MM.YY") }}
          </time>
        </div>
      </div>
    </div>
    <div class="product-review__center">
      <ul class="product-review-descriptions">
        <li class="product-review-description">
          <div class="product-review-description__title">Преимущества:</div>
          <div class="product-review-description__content">
            {{ review?.dignities }}
          </div>
        </li>
        <li class="product-review-description">
          <div class="product-review-description__title">Недостатки:</div>
          <div class="product-review-description__content">
            {{ review?.disadvantages }}
          </div>
        </li>
        <li class="product-review-description">
          <div class="product-review-description__title">Комментарий:</div>
          <div class="product-review-description__content">
            {{ review?.comment }}
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="product-review__bottom"></div> -->
  </div>
</template>

<script setup>
import moment from "moment";

const props = defineProps({
  review: Object,
});
</script>

<style lang="scss" scoped>
.product-review {
  &__top {
    margin-bottom: 12px;
  }

  &-user {
    display: flex;
    column-gap: 10px;

    &__info {
      &_top {
        display: flex;
        column-gap: 10px;
      }
    }

    &__mark {
      display: flex;
      align-items: center;
    }

    &__star {
      fill: rgb(var(--color-yellow));
    }

    &__date {
      color: rgb(var(--color-grey));
      font-size: 13px;
    }
  }

  &-descriptions {
    display: grid;
    row-gap: 8px;
  }

  &-description {
    display: grid;
    row-gap: 4px;

    &__title {
      font-weight: 700;
    }
  }
}
</style>

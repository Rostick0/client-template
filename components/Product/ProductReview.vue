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
              <span class="product-review-user__mark_star">★</span>&nbsp;{{
                review?.mark
              }}
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
      <div class="product-review__text">
        {{ review?.comment }}
      </div>
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
.product {
  &-review {
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
        &_star {
          color: rgb(var(--color-yellow));
        }
      }

      &__date {
        color: rgb(var(--color-grey));
        font-size: 13px;
      }
    }
  }
}
</style>

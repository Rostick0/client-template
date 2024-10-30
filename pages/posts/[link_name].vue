<template>
  <div class="post">
    <div class="container">
      <div class="post__container box-shadow-default">
        <div class="post__image">
          <img
            class="post__img"
            :src="post?.main_image?.image?.path_webp"
            :alt="post?.title"
            v-lazy-load
            decoding="async"
            loading="lazy"
          />
        </div>
        <div class="post__inner">
          <PostInfo :post="post" />
          <div class="post__content" v-html="post?.content"></div>
          <a
            class="post__source link"
            :href="post?.source"
            target="_blank"
            rel="nofollow noopener"
            >Источник</a
          >
        </div>
      </div>

      <div class="post__comments box-shadow-default">
        <PostFormComment :postId="post?.id" @createComment="commentsAdd" />
        <PostComments :comments="comments" />
      </div>

      <div class="post__similar">
        <h2 class="h2">Похожие статьи</h2>
        <PostList :posts="similarPosts" />
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "~/api";

const route = useRoute();

const fetchPost = await api.posts.getAll({
  params: {
    // extends:
    // "images.image,category,vendor,user,product_properties.property.property_type,product_properties.property_value",
    "filterEQ[link_name]": route.params?.link_name,
  },
});

const post = await fetchPost?.data?.[0];

// if (!product) throw { statusCode: 404 };

const { data: comments, get: commentsGet } = await useApi({
  name: "comments.getAll",
  params: {
    extends: "user.image.image",
    "filterEQ[comment_relatsable_type]": "App\\Models\\Post",
    "filterEQ[comment_relatsable_id]": post?.id,
  },
});
await commentsGet();

const commentsAdd = (comment) =>
  (comments.value = [...comments.value, comment]);

const similarPosts = await api.posts
  .getAll({
    params: {
      "filterEQ[rubric_id]": post?.rubric_id,
      limit: 4,
    },
  })
  .then((res) => res?.data);

useSeoMeta({
  title: `${post?.title} | JShoP`,
  ogTitle: post?.title,
  description: post?.description,
  ogDescription: post?.description,
  ogImage: post?.main_image?.image?.path,
  ogImageWidth: post?.main_image?.image?.width,
  ogImageHeight: post?.main_image?.image?.height,
  ogImageType: "image/jpeg",
});
</script>

<style lang="scss" scoped>
.post {
  &__container {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &__image {
    // margin-bottom: 32px;
    position: relative;
    width: 100%;
    height: 50vh;
  }

  &__img {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  &__inner {
    background-color: rgb(var(--color-white));
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    padding: 20px;
  }

  &__source {
    display: inline-block;
    margin-top: 20px;
  }

  &__comments {
    background-color: rgb(var(--color-white));
    border-radius: 8px;
    display: grid;
    row-gap: 20px;
    padding: 20px;
    margin-top: 20px;
  }

  &__similar {
    margin-top: 48px;
  }
}
</style>

<style lang="scss">
.post {
  &__content {
    a {
      color: rgb(var(--color-blue-light));
      text-decoration: underline;
    }
  }
}
</style>

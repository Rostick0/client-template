<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-list">
          <div class="footer-item">
            <div class="footer-item__title">Компания</div>
            <div class="footer-item__list">
              <NuxtLink class="footer-item__link" to="/posts">Новости</NuxtLink>
              <NuxtLink class="footer-item__link" to="/faq">Вопрос - Ответ</NuxtLink>
              <NuxtLink class="footer-item__link" to="/docs"
                >Документы</NuxtLink
              >
              <a
                class="footer-item__link"
                href="https://hh.ru/"
                rel="noopener nofollow"
                target="_blank"
                >Вакансии</a
              >
            </div>
          </div>
          <div class="footer-item">
            <div class="footer-item__title">Каталог</div>
            <div class="footer-item__list">
              <NuxtLink class="footer-item__link" to="/vendors">Производители</NuxtLink>
              <NuxtLink class="footer-item__link" to="/categories"
                >Категории</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom"></div>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer {
  background-color: rgb(var(--color-dark), 0.95);
  color: rgb(var(--color-white));
  padding: 20px 0;

  &-list {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 24px;
  }

  &-item {
    &__list {
      display: flex;
      flex-direction: column;
      row-gap: 4px;
    }

    &__title {
      color: rgb(var(--color-blue-light));
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    &__link {
      color: rgb(var(--color-white));
      font-size: 14px;
    }
  }
}
</style>

<template>
  <div
    class="default"
  >
    <app-picture
      src="image.jpg"
      style="width: 500px; height: 300px;"
    />
    <app-icon
      mod="icon"
      name="icon"
    />
    <h1>nuxt-boilerplate</h1>
    <p
      class="p"
    >
      RATIO Project
    </p>
    <p
      class="p"
    >
      <span>current device: {{ $mq }}</span>
    </p>
  </div>
</template>
<script>
/**
 * @module pages/index
 * @vue-computed {Object} seoObject - Объект настройки SEO для данной страницы
 */

export default {
  middleware({ store }) {
    store.dispatch('test/FETCH_PHOTO');
  },
  computed: {
    seoObject() {
      return {
        title: 'Главная страница Boilerplate',
        description: 'Описание главной Бойлерплейта',
      };
    },
  },

  /**
   * Подключение SEO с помощью тега функция head прдоставляемой Nuxt
   * @returns {{meta, title: *}}
   */
  head() {
    return this.$setMeta(this.$store, this.seoObject);
  },
};
</script>
<style lang="scss" scoped>
.default {
  @include flex-base;
  @include typography-base;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  h1 {
    margin-bottom: 16px;
  }

  p {
    span {
      color: blue;
    }
  }
}
</style>

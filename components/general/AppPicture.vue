<template>
  <div v-if="image" class="app-picture">
    <picture class="picture">
      <source
        v-if="image.webp"
        srcset=""
        :data-srcset="getSrcSet(image.webp)"
        type="image/webp"
      >
      <img
        v-if="image.lqip && image['1x']"
        :src="image.lqip || image['1x']"
        :data-src="image['1x']"
        :data-srcset="getSrcSet(image)"
        class="lazyload"
        :alt="alt"
      >
    </picture>
  </div>
</template>
<script>
/**
 * @module general/AppPicture
 * @desc Данный компонент позволяет автоматизировать работу с картинками
 * @vue-prop { Object } [mod=''] src - Набор путей к картинке
 * @vue-prop { String } alt - Тег альт для картинки
 * @vue-prop { Boolean } [local=true] local - тут должен Дима дописать. Я не знаю :D
 */

export default {
  props: {
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: 'Alternate text for the image',
    },
    local: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      size: 0,
      path: '/images/gen',
      image: {},
    };
  },

  mounted() {
    if (this.local) {
      this.init();
    }
  },

  methods: {
    getSrcSet(image) {
      return `${image['1x']} 1x, ${image['2x']} 2x`;
    },
    init() {
      const { src, path } = this;
      const fileSpit = src.split('.');
      const fileName = fileSpit.slice(0, -1).join('.');
      const fileEnd = fileSpit[fileSpit.length - 1];
      this.image = {
        '1x': `${path}/${fileName}/${fileName}--1x.${fileEnd}`,
        '2x': `${path}/${fileName}/${fileName}--2x.${fileEnd}`,
        lqip: `${path}/${fileName}/${fileName}--lqip.${fileEnd}`,
        webp: {
          '1x': `${path}/${fileName}/${fileName}--1x.webp`,
          '2x': `${path}/${fileName}/${fileName}--2x.webp`,
        },
      };
    },
  },

};
</script>
<style lang="scss" scoped>
.app-picture {
  border-radius: 5px;
  background-color: $loading-color;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div class="app-slider swiper-container">
    <div class="swiper-wrapper">
      <slot />
    </div>
    <div class="swiper-pagination" />
  </div>
</template>
<script>
import Swiper from 'swiper';

export default {

  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  data() {
    return {
      swiper: {},
    };
  },

  mounted() {
    this.swiper = new Swiper(this.$el, this.options);
    this.swiper.on('slideChange', () => {
      this.$emit('slideChange', this.swiper.realIndex);
    });
    this.swiper.slideToLoop(this.index);
  },

  destroyed() {
    // Таймаут нужен чтобы дестроить после перехода на другую страницу
    setTimeout(() => {
      this.swiper.destroy();
    });
  },

};
</script>

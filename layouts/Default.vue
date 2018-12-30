<template lang="pug">
  .page
    Header
    main.main
      nuxt
    Footer
</template>

<script>
import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';

export default {
  components: { Header, Footer },
};
</script>

<style lang="sass" scoped>
.page
  height: 100%

.main
  display: block
  min-height: calc(100% - 109px - 170px)
  max-width: 1140px
  margin: 0 auto
  overflow: hidden

@media #{$tablet}
  .main
    min-height: calc(100% - 75px - 120px)

@media #{$mobile}
  .main
    min-height: calc(100% - 44px - 115px)
</style>

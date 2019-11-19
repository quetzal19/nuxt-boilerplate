<template lang="pug">
  .app-dropout(:class="{'_active': isActive}")
    slot(v-if="!isDestroyed || isActive")
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    isDestroyed: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus" scoped>
.app-dropout
  z-index 10
  background #f
  border 1px solid #ececec
  opacity 0
  visibility hidden
  height 0
  width 0
  overflow hidden
  transition opacity .2s
  box-shadow 0px 8px 16px 0px rgba(72, 81, 91, 0.12)

  &._active
    opacity 1
    visibility visible
    height auto
    width auto

  &._auth .item
    min-width 218px
</style>

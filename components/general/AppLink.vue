<template>
  <nuxt-link
    class="app-link"
    :class="mod"
    :to="to"
  >
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    mod: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="sass" scoped>

.app-link
  @include a-reset()

  border-radius: 2px
  outline: none
  font-size: 14px
  font-weight: 600
  border: 2px solid
  width: 100%
  height: 48px
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  transition: .2s
  letter-spacing: 0.3px
  background: #fff
  color: $red
  border-color: #c7d0d8

  &:hover
    color: #fff
    background: $red
    border-color: $red

    .question
      color: #fff
      opacity: 1

  &._small
    font-size: 12px
    height: 44px

.app-button[disabled]
  background-color: transparent
  border-color: #ececec
  color: $grayLight
  pointer-events: none
</style>

<template>
  <button
    class="app-button"
    :class="mod"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: '',
    },
    mod: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleClick() {
      if (this.href) {
        window.open(this.href, '_blank');
      } else {
        this.$emit('click');
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.question
  color #65686a
  opacity .5

.app-button
  border-radius 2px
  outline none
  font-size 14px
  font-weight 600
  border 2px solid
  width 100%
  height 48px
  display flex
  align-items center
  justify-content center
  cursor pointer
  transition .2s
  letter-spacing 0.3px
  background #f
  color $red
  border-color #c7d0d8

  &:hover
    color #f
    background $red
    border-color $red

    .question
      color #f
      opacity 1

  &._red
    color #f
    background $red
    border-color $red

    .question
      color #f
      opacity 1

    &:hover
      opacity .7

  &._cyan
    color #f
    background $cyan
    border-color $cyan

    &:hover
      opacity .7

    &[disabled]
      background: #f8f8f8
      color: #9e9e9e

  &._cyan-text
    color $cyan
    border-width: 1px;
    background transparent

    &:hover
      border-color: $cyan

  &._white-text
    color #ffffff
    border: 1px solid #ffffff;
    background transparent

    &:hover
      border-color: #ffffff
      background transparent

  &._small
    font-size 12px
    height 44px

  &._catalog-item
    font-size 12px
    border none

  &._extra-small
    font-size 12px
    height 32px
    border-width: 1px

  &._shaking
    transition all .2s
    animation shake 3s cubic-bezier(.36,.07,.19,.97) infinite
    transform translate3d(0, 0, 0)

  &._green
    color #f
    background $green
    border-color $green

    &:hover
      opacity .7


.app-button[disabled]
  background-color transparent
  border-color #ec
  color $grayLight
  pointer-events none

+tablet()

  .app-button
    height 40px

  .app-button[disabled]
    border-color #ec
</style>

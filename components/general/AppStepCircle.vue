<template lang="pug">
  .app-step-circle(:class="status ? `_${status}` : ''")
    template(v-if="status === 'completed'")
      app-icon.link-arrow(
        name="check"
        stroke="#04b400"
      )
    template(v-else-if="status === 'failed'")
      app-icon.link-arrow(
        name="close"
        stroke="#04b400"
      )
    template(v-else)
      slot
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="stylus" scoped>
.app-step-circle
  width 40px
  min-width 40px
  height 40px
  border-radius 50%
  border 1px solid #ec
  display flex
  align-items center
  justify-content center
  font-size 14px
  font-weight 500
  transition .2s
  background-color #f
  color #000

  &._disabled
    background-color transparent
    color $grayLight

  &._completed
    border-color $green
    background-color rgba($green, .1)
    color $green

  &._failed
    border-color $red
    background-color rgba($red, .1)
    color $red

.link-arrow
  width 19px
  height 15px

+tablet()
  .app-step-circle
    width 28px
    min-width 28px
    height 28px
    font-size 12px
    font-weight 600

  .link-arrow
    width 12px
    height 8px
</style>

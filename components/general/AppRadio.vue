<template lang="pug">
  component.app-radio(
    :is="wrapper"
    :class="mod"
  )
    input.control(
      type="radio"
      :name="name"
      :disabled="disabled"
      :value="value"
      v-model="innerChecked"
    )
    .fake: .circle
    .text(v-if="this.$slots.default")
      slot
</template>

<script>
export default {
  props: {
    wrapper: {
      type: String,
      default: 'label',
    },
    mod: {
      type: String,
      default: '',
    },
    checked: {
      type: [String, Number],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },

  computed: {
    innerChecked: {
      get() {
        return this.checked;
      },
      set() {
        this.$emit('change', this.value);
      },
    },
  },
};
</script>

<style lang="stylus" scoped>
.app-radio
  position relative
  cursor pointer
  display flex
  align-items center
  cursor pointer

.control
  position absolute
  width 1px
  height 1px
  overflow hidden
  opacity 0
  visibility hidden

.fake
  display flex
  align-items center
  justify-content center
  border-radius 50%
  border 1px solid #c7d0d8
  width 20px
  height 20px
  min-width 20px
  background-color #f

.circle
  width 8px
  height 8px
  border-radius 50%
  opacity 0
  transition .2s
  background-color $cyan

.control:checked ~ .fake .circle
  opacity 1

.control[disabled] ~ .fake
  background #f8

.text
  white-space nowrap
  margin-left 14px
  font-size 13px
  font-weight 500
  color $grayLight
  flex-grow 1

+tablet()
  .fake
    width 22px
    height 22px
    min-width 22px

  .circle
    width 10px
    height 10px

  .text
    white-space nowrap
    margin-left 8px
    font-size 12px
    line-height: 14px
    font-weight: 600
</style>

<template>
  <div
    class="app-input"
    :class="[{'_valid': valid && !error, '_error': error}, mod]"
  >
    <input
      :key="name"
      v-model="innerValue"
      class="control"
      :placeholder="placeholder"
      :name="name"
      :type="type"
      :disabled="disabled"
      :maxlength="maxlength"
      @input="inputHandler"
      @blur="$emit('blur')"
      @focus="(e) => $emit('focus', e)"
    >
    <div
      v-if="valid"
      class="icon _green"
    >
      <app-icon
        name="check"
        width="15"
        height="11"
      />
    </div>

    <div
      v-else-if="error"
      class="icon _red"
    >
      <app-icon
        name="ban"
        width="14"
        height="14"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    maxlength: {
      type: Number,
      default: 200,
    },
    error: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Number, String],
      default: '',
    },
    valid: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    mod: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      innerValue: this.value,
    };
  },

  watch: {
    value(value) {
      this.innerValue = value;
    },
  },

  methods: {
    inputHandler(e) {
      this.$emit('input', this.innerValue, e);
    },
  },
};
</script>

<style lang="stylus" scoped>
  .app-input
    position relative
    font-size 14px
    font-weight 500

    &._valid .control:focus
      border-color #04b400

    &._error .control:focus
      border-color #e4002b

  .control
    font-family 'Montserrat'
    font-weight inherit
    font-size inherit
    text-transform inherit
    line-height 20px
    border 1px solid #c7d0d8
    border-radius 2px
    padding 11px 18px
    min-height 44px
    -webkit-appearance none
    outline none
    display block
    width 100%
    transition border-color .5s cubic-bezier(.23, 1, .32, 1),
    color .5s cubic-bezier(.23, 1, .32, 1),
    background-color .5s cubic-bezier(.23, 1, .32, 1)
    resize vertical
    background-color #fff
    text-overflow ellipsis
    color #0

    +placeholder()
      color $grayLight
      font-weight normal

    &:focus
      border-color #0a50a5

    &[type=number]::-webkit-inner-spin-button,
    &[type=number]::-webkit-outer-spin-button
      -webkit-appearance none
      margin 0

    &[type=number]
      -moz-appearance textfield

    &[disabled]
      background-color #f8

  .icon
    position absolute
    top 0
    bottom 0
    right 0
    width 40px
    display flex
    align-items center
    justify-content center
    margin auto

    &._green
      color #04b400

    &._red .app-icon
      fill #e4002b

  +tablet()
    .app-input
      font-size 12px

    .control
      min-height 36px
      padding 7px 12px

    .app-input._subscribe

      .control
        padding 11px 18px
        min-height 44px
</style>

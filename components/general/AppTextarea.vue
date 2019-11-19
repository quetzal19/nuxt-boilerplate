<template lang="pug">
  .app-textarea(
    :class="[{'_valid': valid && !error, '_error': error}, mod]"
  )
    textarea.control(
      ref="textarea"
      :rows="rows"
      :placeholder="placeholder"
      :name="name"
      :disabled="disabled"
      :maxlength="maxlength"
      v-model="innerValue"
      @input="inputHandler"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    )
    .error(v-if="error") {{ error }}
</template>

<script>
export default {
  props: {
    rows: {
      type: Number,
      default: 1,
    },
    maxlength: {
      type: Number,
      default: 2000,
    },
    placeholder: {
      type: String,
      default: '',
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
      type: String,
      default: '',
    },
    mod: {
      type: String,
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
  updated() {
    this.inputHandler();
  },
  methods: {
    inputHandler() {
      const el = this.$refs.textarea;
      el.style.cssText = 'height:auto;';
      el.style.cssText = '-moz-box-sizing:content-box';
      el.style.cssText = `min-height:${el.scrollHeight}px`;
      this.$emit('input', this.innerValue);
    },
  },
};
</script>

<style lang="stylus" scoped>
.textarea
  box-sizing border-box
  -webkit-tap-highlight-color rgba(0, 0, 0, 0)
  &._error .control
    border-color red

.control
  font-size 14px
  line-height 1.4
  border 1px solid #c7d0d8
  border-radius 2px
  padding 11px 18px
  -webkit-appearance none
  display block
  width 100%
  font-family inherit
  outline none
  resize none
  overflow hidden
  word-wrap break-word
  transition border-color .5s cubic-bezier(.23,1,.32,1),
             color .5s cubic-bezier(.23,1,.32,1),
             background-color .5s cubic-bezier(.23,1,.32,1)

  +placeholder()
    color $grayLight

  &:focus
    border-color #0a50a5

.error
  font-size 14px
  color $red
  padding-top 10px

+tablet()

  .control
    font-size 12px
    padding 7px 12px
</style>

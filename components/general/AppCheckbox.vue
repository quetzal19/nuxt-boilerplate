<template>
  <label
    class="app-checkbox"
    :class="mod"
  >
    <input
      v-model="innerChecked"
      class="control"
      :name="name"
      :value="value"
      type="checkbox"
      :disabled="disabled"
      @change="change"
    >
    <span class="fake">
      <app-icon
        class="icon"
        name="check"
      />
    </span>

    <span
      v-if="this.$slots.default"
      class="text"
    >
      <slot />
    </span>

  </label>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change',
  },

  props: {
    mod: {
      type: String,
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      innerChecked: this.checked,
    };
  },

  watch: {
    checked(value) {
      this.innerChecked = value;
    },
  },

  methods: {
    change(e) {
      if (this.modelValue) {
        this.$emit('change', this.innerChecked);
      } else {
        const innerEvent = e;
        innerEvent.checked = this.innerChecked;
        this.$emit('change', innerEvent);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.app-checkbox
  position: relative
  cursor: pointer
  display: flex
  align-items: center
  font-size: 13px
  color: $grayLight

  &._big

    .fake
      width: 24px
      height: 24px
      border-color: #cdd5dc
      border-radius: 3px

    .icon
      width: 15px
      height: 14px

.control
  position: absolute
  width: 1px
  height: 1px
  overflow: hidden
  opacity: 0
  visibility: hidden

.fake
  display: flex
  align-items: center
  justify-content: center
  border-radius: 1px
  border: 1px solid #ececec
  width: 14px
  height: 14px
  min-width: 12px
  background-color: #fff

.icon
  opacity: 0
  transition: .2s
  width: 10px
  height: 9px
  color: #229595

.control:checked ~ .fake .icon
  opacity: 1

.control[disabled] ~ .fake
  background-color: #f8f8f8

.text
  white-space: nowrap
  margin: 0 0 0 14px
  font-weight: 500
  flex-grow: 1

.app-checkbox._between .text
  display: flex
  align-items: center
  justify-content: space-between
  width: 100%

@include tablet()
  .app-checkbox

    &._big

      .fake
        width: 22px
        height: 22px
        min-width: 22px
        border-color: #ececec
        border-radius: 0

      .icon
        width: 12px
        height: 11px

  .fake
    width: 22px
    height: 22px
    min-width: 22px

  .icon
    width: 12px
    height: 11px
</style>

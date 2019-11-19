<template lang="pug">
  .app-date-picker(
    :class="[{'_valid': valid && !error, '_error': error}, mod]"
  )
    client-only
      datepicker.control(
        :placeholder="placeholder"
        :name="name"
        ref="control"
        :disabled="disabled"
        input-class="field"
        v-model="innerValue"
        :language="language"
        :disabledDates="disabledDates"
        @selected="date => $emit('selected', date)"
      )
    app-icon.icon(
      name="calendar-alt-solid"
      width="13"
      height="15"
      )
    .error(v-if="error") {{ error }}
</template>

<script>

export default {
  props: {
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
      type: [String, Date],
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
      disabledDates: {
        from: new Date(),
      },
      language: {
        language: 'Russian',
        months: [
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь',
        ],
        monthsAbbr: [
          'Янв',
          'Февр',
          'Март',
          'Апр',
          'Май',
          'Июнь',
          'Июль',
          'Авг',
          'Сент',
          'Окт',
          'Нояб',
          'Дек',
        ],
        days: [
          'Вс',
          'Пн',
          'Вт',
          'Ср',
          'Чт',
          'Пт',
          'Сб',
        ],
        yearSuffix: ' год',
      },
    };
  },

  watch: {
    value(value) {
      this.innerValue = value;
    },
  },
};
</script>

<style lang="stylus" scoped>
.app-date-picker
  position relative
  font-size 14px

.icon
  position absolute
  top: 0
  bottom: 0
  left: 16px
  margin: auto

>>>.field
  border: none
  width: 100%
  height: 100%
  font-family 'Montserrat'
  font-size inherit
  line-height 20px
  outline none

.control
  border 1px solid #c7d0d8
  border-radius 2px
  padding 12px 18px 10px 37px
  min-height 44px
  -webkit-appearance none
  display block
  width 100%
  transition border-color .5s cubic-bezier(.23,1,.32,1),
             color .5s cubic-bezier(.23,1,.32,1),
             background-color .5s cubic-bezier(.23,1,.32,1)
  resize vertical
  text-overflow ellipsis
  color #0
  position: relative
  z-index 10

  +placeholder()
    color $grayLight

  &:focus
    border-color #0a50a5

+tablet()
  >>>.field
    font-size 12px
    line-height: 14px
  .control
    min-height: 36px
    padding:7px 11px
</style>

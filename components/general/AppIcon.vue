<template>
  <div
    class="app-icon"
    :class="getClass"
  >
    <svg-icon
      ref="icon"
      :name="name"
      :width="width"
      :height="height"
    />
  </div>
</template>
<script>
/**
 * @module general/AppIcon
 * @desc Данный компонент позволяет автоматизировать работу с иконками
 * @vue-prop { String } [mod=''] mod - Класс который ТОЧНО применится к корневому элементу
 * @vue-prop { String } name - Название иконки
 * @vue-prop { String|Number } [width='100%'] width - Ширина иконки в px
 * @vue-prop { String|Number } [height='100%'] height - Высота иконки в px
 */

export default {

  props: {
    mod: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    width: {
      type: [String, Number],
      default: '100%',
    },
    height: {
      type: [String, Number],
      default: '100%',
    },
  },

  computed: {
    getClass() {
      const { mod } = this;
      return [
        mod,
      ];
    },
  },

};
</script>
<style lang="scss" scoped>
.app-icon {
  background-color: transparent;
}
</style>

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

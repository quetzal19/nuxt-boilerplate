<template lang="pug">
  svg-icon.app-icon(
    :name="name"
    :fill="fill"
    :stroke="stroke"
  )
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    fill: {
      type: String,
      default: '',
    },
    stroke: {
      type: String,
      default: '',
    },
  },
};
</script>

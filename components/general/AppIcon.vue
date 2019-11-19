<template lang="pug">
  svg.app-icon(
    :fill="fill"
    :stroke="stroke"
  )
    use(
      :xlink:href="`#icon-${name}`"
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

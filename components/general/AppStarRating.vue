<template lang="pug">
  .app-star-rating
    .content
      .container
        .icon-wrapper(
          v-for="(star, index) in maxStars"
          :class="{'_read-only': readOnly}"
          @mouseover="handleMouseover(index)"
          @mouseleave="handleMouseleave"
          @click="$emit('click', index)"
        )
          app-icon.icon(
            :class="{'_visible': (index + 1) > currentRating}"
            ref="star-regular"
            name="star-regular"
            width="16"
            height="15"
            :title="index + 1"
          )
          app-icon.icon._solid(
            :class="{'_visible': (index + 1) <= currentRating}"
            ref="star-solid"
            name="star-solid"
            width="16"
            height="15"
            :title="index + 1"
            :fill="starColor"
          )
</template>

<script>
export default {
  props: {
    currentRating: {
      type: Number,
      default: 0,
    },

    readOnly: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    maxStars: 5,
  }),

  computed: {
    starColor() {
      return this.readOnly ? '#65686a' : '#229595';
    },
  },

  methods: {
    handleMouseover(hoverIndex) {
      if (!this.readOnly) {
        this.$refs['star-solid'].forEach((star, index) => {
          if (index <= hoverIndex) {
            star.$el.classList.add('_visible-temp');
          } else {
            star.$el.classList.add('_invisible-temp');
            this.$refs['star-regular'][index].$el.classList.add('_visible-temp');
          }
        });
      }
    },

    handleMouseleave() {
      if (!this.readOnly) {
        this.$refs['star-solid'].forEach((star) => {
          star.$el.classList.remove('_visible-temp');
          star.$el.classList.remove('_invisible-temp');
        });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.container
  display flex
  align-items center

.icon-wrapper
  position relative
  width 20px
  height 19px
  padding 2px
  cursor pointer

  &._read-only
    cursor inherit

.icon
  position absolute
  opacity 0
  visibility hidden

  &._solid
    transition opacity .2s

  &._visible,
  &._visible-temp
    opacity 1
    visibility visible

  &._invisible-temp
    opacity 0
    visibility hidden
</style>

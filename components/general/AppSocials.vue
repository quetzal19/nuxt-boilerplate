<template lang="pug">
  nav.app-socials(:class="mod")
    .container
      a.link(
        v-for="item in list"
        target="_blank"
        :href="item.link ? item.link : 'javascript:void(0);'"
      )
        template(v-if="item.type === 'vkontakte'")
          app-icon.icon(
            name="vk"
            width="20"
            height="14"
          )
        template(v-else-if="item.type === 'facebook'")
          app-icon.icon(
            name="fb"
            width="9"
            height="14"
          )
        template(v-else-if="item.type === 'instagram'")
          app-icon.icon(
            name="instagram"
            width="13"
            height="13"
          )
        template(v-else-if="item.type === 'whatsapp'")
          app-icon.icon(
            name="whatsapp"
            width="15"
            height="15"
          )
        template(v-else-if="item.type === 'telegram'")
          app-icon.icon(
            name="telegram"
            width="14"
            height="11"
          )
        template(v-else-if="item.type === 'youtube'")
          app-icon.icon(
            name="youtube"
            width="14"
            height="12"
          )
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => ({}),
    },
    mod: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="stylus" scoped>
.container
  display flex
  align-items center

.title
  font-size 13px
  font-weight 500
  color $gray
  letter-spacing -0.3px
  margin-bottom 20px

.link
  display flex
  align-items center
  justify-content center
  text-decoration none
  border-radius 50%
  border 1px solid #000
  color #0
  width 34px
  height 34px
  color #000
  opacity .25
  transition opacity .2s

  &:hover
    opacity 1

  & + &
    margin-left 8px

.app-socials._vertical

  .container
    flex-direction: column

  .link

    & + .link
      margin-left 0
      margin-top: 8px
</style>

<template lang="pug">
  .app-tabs(:class="view ? `_${view}` : ''")
    .heads-wrapper(ref="wrapper")
      .heads-scroll-container(ref="container")
        .heads(ref="heads")
          .head(
            v-for="(slot, index) in getTabs"
            :key="index + 1"
            :class="{'_active': slot.active}"
            @click="toggleTab(index)"
          )
            slot(:name="`head_${index}`")
    .contents
      .content(
        v-for="(slot, index) in getTabs"
        :key="index + 1"
        v-show="slot.active"
      )
        slot(:name="`content_${index}`")
</template>

<script>
export default {
  props: {
    view: {
      type: String,
      default: '',
    },

    structure: {
      type: Array,
      default: () => ([]),
    },
  },

  data: () => ({
    tabs: [],
  }),

  computed: {
    getTabs() {
      if (this.tabs.length !== this.structure.length) {
        return this.structure;
      }

      return this.tabs;
    },
  },

  methods: {
    toggleTab(index) {
      if (this.tabs.length !== this.structure.length) {
        this.tabs = this.structure;
      }
      this.tabs = this.tabs.map((obj, i) => {
        if (i === index) {
          return Object.assign({}, obj, { active: true });
        }

        return Object.assign({}, obj, { active: false });
      });
      this.$emit('toggle', index);
    },
  },
};
</script>

<style lang="stylus" scoped>
.heads-wrapper
  border-bottom 1px solid #ec

.heads
  display flex

.title
  padding 5px 5px 13px
  border-bottom 2px solid transparent
  font-size 18px
  font-weight 700
  color #0
  transition color .2s, border-color .2s

.head
  display flex
  cursor pointer

  & + &
    margin-left 51px

  &._active
    cursor inherit

.head._active .title
  color $red
  border-color $red

.amount
  font-size 10px
  font-weight 700
  color $grayLight
  position relative
  top 3px

.head:first-child .title
  padding-left 0

// Попап логина
.app-tabs._auth
  width 100%

  .head
    display flex
    cursor pointer
    width 50%
    min-width 50%

    .title
      width 100%
      text-align center
      font-size 16px
      font-weight 600
      height 60px
      padding 0
      display flex
      align-items center
      justify-content center

    &._active .title
      color #0
      border-color $red

  .head + .head
    margin-left 0

+tablet()
  // Попап вопросов в лк
  .app-tabs._account

    .title
      font-size 14px

    .heads-wrapper
      border none

    .head + .head
      margin-left 28px

+mobile()
  .app-tabs._auth

    .head

      .title
        font-size 13px
        height 46px

  // Попап вопросов в лк
  .app-tabs._account

    .head

      .title,
      &._active .title
        border none

    .title
      padding-bottom 5px

    .heads-wrapper
      border none

    .head + .head
      margin-left 16px

</style>

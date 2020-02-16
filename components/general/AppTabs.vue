<template>
  <div
    class="app-tabs"
    :class="view ? `_${view}` : ''"
  >
    <div
      ref="wrapper"
      class="heads-wrapper"
    >
      <div
        ref="container"
        class="heads-scroll-container"
      >
        <div
          ref="heads"
          class="heads"
        />

        <div
          v-for="(slot, index) in getTabs"
          :key="index + 1"
          class="head"
          :class="{'_active': slot.active}"
          @click="toggleTab(index)"
        >
          <slot :name="`head_${index}`" />
        </div>
      </div>
    </div>
    <div class="contents">
      <div
        v-for="(slot, index) in getTabs"
        v-show="slot.active"
        :key="index + 1"
        class="content"
      >
        <slot :name="`content_${index}`" />
      </div>
    </div>
  </div>
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
          return { ...obj, active: true };
        }

        return { ...obj, active: false };
      });
      this.$emit('toggle', index);
    },
  },
};
</script>

<style lang="sass" scoped>
.heads-wrapper
  border-bottom: 1px solid #ecec

.heads
  display: flex

.title
  padding: 5px 5px 13px
  border-bottom: 2px solid transparent
  font-size: 18px
  font-weight: 700
  color: #000
  transition: color .2s, border-color .2s

.head
  display: flex
  cursor: pointer

  & + &
    margin-left: 51px

  &._active
    cursor: inherit

.head._active .title
  color: $red
  border-color: $red

.amount
  font-size: 10px
  font-weight: 700
  color: $grayLight
  position: relative
  top: 3px

.head:first-child .title
  padding-left: 0

</style>

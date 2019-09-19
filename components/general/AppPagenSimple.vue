<template lang="pug">
  .app-pagen-symple
    .page._prev(
      v-if="prev"
      key="prev"
      @click="handleClickPage(prevValue)"
    ) . . .
    .page(
      v-for="(page, index) in rangePages"
      :key="index + 1"
      :class="{'_active': page === activePage}"
      @click="handleClickPage(page)"
    ) {{ page }}
    .page._next(
      v-if="next"
      key="next"
      @click="handleClickPage(nextValue)"
    ) . . .
</template>

<script>
export default {
  props: {
    pages: {
      type: [String, Number],
      default: 1,
    },
    stepPage: {
      type: [String, Number],
      default: 2,
    },
  },

  data: () => ({
    activePage: 1,
    prev: false,
    next: false,
    rangePages: [],
  }),

  computed: {
    prevValue() {
      return this.activePage - 2 * this.stepPage - 1;
    },

    nextValue() {
      return this.activePage + 2 * this.stepPage + 1;
    },
  },

  beforeMount() {
    this.rangePages = this.setRangePages();
  },

  methods: {
    handleClickPage(page) {
      this.activePage = page;
      if (page < 1) {
        this.activePage = 1;
      } else if (page > this.pages) {
        this.activePage = this.pages;
      }
      this.rangePages = this.setRangePages();

      this.$emit('change', this.activePage);
    },

    setRangePages() {
      let range = [];
      let start = this.activePage - 2 * this.stepPage;
      let end = this.activePage + 2 * this.stepPage;

      if (start < 1) {
        start = 1;
        end = start + 2 * this.stepPage;
        this.prev = false;
        this.next = true;

        if (end >= this.pages) {
          this.next = false;
          end = this.pages;
        }
      } else if (end > this.pages) {
        end = this.pages;
        start = end - 2 * this.stepPage;
        this.next = false;
        this.prev = true;

        if (start <= 1) {
          this.prev = false;
          start = 1;
        }
      } else {
        start = this.activePage - this.stepPage;
        end = this.activePage + this.stepPage;
        this.prev = true;
        this.next = true;
      }

      for (let i = start; i <= end; i += 1) {
        range = [...range, i];
      }

      return range;
    },
  },
};
</script>

<style lang="stylus" scoped>
  .app-pagen-symple
    display flex
    align-items center

  .page
    font-size 14px
    font-weight 600
    color #0
    cursor pointer
    transition color .2s
    & + &
      margin-left 20px

    &:hover,
    &._active
      color $red
</style>

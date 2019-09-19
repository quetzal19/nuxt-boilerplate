<template lang="pug">
  .app-suggestions(
    v-click-outside="handleClose"
  )
    app-input(
      v-model="query"
      @input="handleInput"
      @keydown.native="handleKeys"
      :name="name"
      :error="error"
      :valid="valid"
      :placeholder="placeholder"
    )
    app-dropout(:is-active="isDropoutVisible")
      .results
        ul.list
          li.item(
            v-for="item, index in list"
            :class="{'_active': item.value === activeItem.value}"
            @mouseover="handleItemHover(index)"
            @click="handleSelect(item)"
          )
            span(
              v-html="getSearchCaption(item.value)"
            )
            span.status(
              v-if="item.status"
            ) {{ item.status }}
</template>

<script>
import dadataSuggest from '@/helpers/dadataSuggest';
import debounce from '@/helpers/debounce';

export default {
  props: {
    bounds: {
      type: Array,
      default: () => ([]),
    },
    initialValue: {
      type: String,
      default: '',
    },
    autoSelectValue: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    count: {
      type: Number,
      default: 3,
    },
    savedResults: {
      type: Array,
      default: () => ([]),
    },
    error: {
      type: Boolean,
      default: false,
    },
    valid: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    query: '',
    currentIndex: 0,
    results: [],
    isDropoutVisible: false,
  }),

  computed: {
    activeItem: {
      get() {
        if (this.list.length && this.list[this.currentIndex]) {
          return this.list[this.currentIndex];
        }

        return {};
      },
      set(value) {
        return value;
      },
    },

    list() {
      return [...this.savedResults, ...this.results];
    },
  },

  watch: {
    autoSelectValue(value) {
      if (value && value.length) {
        this.handleSelect({ value });
      }
    },
    initialValue() {
      this.init();
    },
  },

  mounted() {
    this.init();
  },

  methods: {
    handleInput() {
      return debounce(this.handleSearch(), 500);
    },

    async handleSearch() {
      this.$emit('input', this.query);
      try {
        if (this.query.length > 2) {
          this.results = await dadataSuggest(this, {
            query: this.query,
            count: this.count,
            location: this.location,
            bounds: this.bounds,
          });
          this.isDropoutVisible = true;
        }
      } catch (e) {
        this.$modal.show('info', {
          title: 'Ошибка',
          text: e.message,
        });
        this.isDropoutVisible = false;
      }
    },

    async handleSelect(item) {
      try {
        if (item.status) {
          this.$emit('select', item);
          this.query = item.value;
          this.isDropoutVisible = false;
        } else {
          const result = await dadataSuggest(this, {
            query: item.value,
            count: 1,
            location: this.location,
            bounds: this.bounds,
          });

          if (result.length) {
            this.query = result[0].value;
            this.$emit('select', result[0]);
          } else {
            this.query = item.value;
            this.$emit('select', item.value);
          }

          this.isDropoutVisible = false;
        }
      } catch (e) {
        this.$modal.show('info', {
          title: 'Ошибка',
          text: e.message,
        });
        this.isDropoutVisible = false;
      }
    },

    handleItemHover(index) {
      this.currentIndex = index;
    },

    handleKeys(e) {
      switch (e.keyCode) {
        case 38:
          e.preventDefault();
          if (this.currentIndex > 0) {
            this.currentIndex -= 1;
          } else {
            this.currentIndex = this.results.length - 1;
          }
          break;
        case 40:
          e.preventDefault();
          if (this.currentIndex < (this.results.length - 1)) {
            this.currentIndex += 1;
          } else {
            this.currentIndex = 0;
          }
          break;
        case 13:
          e.preventDefault();
          if (this.activeItem.value) {
            this.handleSelect(this.activeItem);
          }
          this.handleClose();
          break;
        default:
      }
    },

    getSearchCaption(caption = '') {
      const wrapQuery = query => `<b>${query}</b>`;
      const escape = query => query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const { query } = this;

      if (query) {
        const re = new RegExp(escape(query), 'ig');
        return caption.replace(re, wrapQuery);
      }

      return caption;
    },

    handleClose() {
      this.isDropoutVisible = false;
      this.results = [];
    },

    init() {
      if (this.initialValue.length) {
        this.handleSelect({
          value: this.initialValue,
        });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.app-suggestions
  position relative

.app-dropout
  position absolute
  left 0
  top 100%
  right 0

.list
  ul-reset()

.item
  min-height 44px
  font-size 14px
  color #0
  cursor pointer
  padding 13px 18px
  transition background-color .2s
  display flex
  justify-content space-between
  align-items center

  &._active
    background-color #f8

.status
  font-size 12px
  color $grayLight

+mobile()
  .item
    font-size 12px
    min-height 36px
    padding 7px 12px
    flex-direction column
    align-items flex-start
    line-height 1.5

  .status
    font-size 10px
</style>

<template>
  <div
    class="default"
  >
    <app-picture
      src="image.jpg"
      style="width: 500px; height: 300px;"
    />
    <app-icon
      mod="icon"
      name="icon"
    />
    <h1>nuxt-boilerplate</h1>
    <p
      class="p"
    >
      RATIO Project
    </p>
    <p
      class="p"
    >
      current device: {{ $mq }}
    </p>
    <el-button>open docs</el-button>
  </div>
</template>
<script>
export default {
  computed: {
    seoObject() {
      return {
        title: 'Главная страница Boilerplate',
        description: 'Описание главной Бойлерплейта',
      };
    },
  },

  head() {
    return this.$setMeta(this.$store, this.seoObject);
  },
};
</script>
<style lang="scss" scoped>
.default {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>

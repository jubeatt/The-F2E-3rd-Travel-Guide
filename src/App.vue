<template>
  <NavBar />
  <router-view v-if="!isLoading"/>
  <div class="loading" v-if="isLoading">
    <img class="loading__img" src="@/assets/images/loading.gif" alt="loading">
  </div>
  <Footer />
</template>

<script>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  data () {
    return {
      isLoading: true
    }
  },
  components: {
    NavBar,
    Footer
  },
  mounted () {
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  }
}
</script>

<style lang="scss">
// 引入 google font
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=Roboto:wght@700&display=swap');
.loading {
  width: 50%;
  min-height: 700px;
  margin: auto;
  text-align: center;
  &__img {
    width: 100%;
    height: 100%;
    max-width: 300px;
    object-fit: cover;
  }
}
</style>

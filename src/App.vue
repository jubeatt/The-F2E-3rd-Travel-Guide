<template>
  <NavBar />
  <router-view/>
  <Footer />
</template>

<script>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  }
}
</script>

<style lang="scss">
// 引入 google font
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=Roboto:wght@700&display=swap');
</style>

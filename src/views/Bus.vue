<template>
  <BusSearchForm />
  <BusDirection />
  <div class="box">
    <h1 class="box__heading">Coming Soon....<i class="fas fa-plane"></i></h1>
  </div>
</template>
<script>
import BusSearchForm from '../components/BusSearchForm.vue'
import BusDirection from '../components/BusDirection.vue'
export default {
  name: 'Bus',
  components: {
    BusSearchForm,
    BusDirection
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 70%;
  max-width: 1200px;
  height: 500px;
  margin: auto;
  margin-top: 100px;
  &__heading {
    font-size: 4rem;
    font-weight: 500;
    text-align: center;
    color: var(--pink);
  }
}

</style>

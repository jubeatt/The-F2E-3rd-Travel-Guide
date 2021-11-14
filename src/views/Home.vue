<template>
  <MainSearchForm />
  <CityCollection />
  <Events />
  <Foods />
</template>

<script>
import MainSearchForm from '../components/MainSearchForm.vue'
import CityCollection from '../components/CityCollection.vue'
import Events from '../components/Events.vue'
import Foods from '../components/Foods.vue'

export default {
  name: 'Home',
  components: {
    MainSearchForm,
    CityCollection,
    Events,
    Foods
  }
}
</script>

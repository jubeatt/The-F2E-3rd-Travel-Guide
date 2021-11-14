<template>
  <MainSearchForm />
  <Events />
  <ScenicSpots />
</template>
<script>
import MainSearchForm from '../components/MainSearchForm.vue'
import Events from '../components/Events.vue'
import ScenicSpots from '../components/ScenicSpots.vue'

export default {
  name: 'EventsAndScenicSpot',
  components: {
    MainSearchForm,
    Events,
    ScenicSpots
  }
}
</script>

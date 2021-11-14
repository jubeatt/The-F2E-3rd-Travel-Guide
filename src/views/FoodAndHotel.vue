<template>
  <MainSearchForm />
  <Foods />
  <Hotesl />
</template>
<script>
import MainSearchForm from '../components/MainSearchForm.vue'
import Foods from '../components/Foods.vue'
import Hotesl from '../components/Hotesl.vue'

export default {
  name: 'FoodAndHotel',
  components: {
    MainSearchForm,
    Foods,
    Hotesl
  }
}
</script>

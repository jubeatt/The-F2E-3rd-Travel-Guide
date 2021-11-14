<template>
  <BusSearchForm />
  <BusDirection />
  <h1>Bus Page</h1>
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

<template>
  <div class="modal">
    <div class="modal__background"></div>
    <div class="modal__content">
      <img class="modal__img" src="" alt="...">
      <div class="modal__buttons">
        <button class="modal__button-prev button-direction button-direction--prev button-direction--disabled"></button>
        <button class="modal__button-next button-direction button-direction--next"></button>
      </div>
      <h3 class="modal__title">XXX</h3>
      <p class="modal__description">XXX</p>
      <div class="modal__information-group">
        <div class="modal__information-item">
          <div class="modal__information-content">
            <i class="modal__information-icon far fa-clock"></i>
            <p class="modal__information-text">XXX</p>
          </div>
          <div class="modal__information-content">
            <i class="modal__information-icon fas fa-map-marker-alt"></i>
            <address class="modal__information-text"></address>
          </div>
        </div>
        <div class="modal__information-item">
          <div class="modal__information-content">
            <i class="modal__information-icon fas fa-ticket-alt"></i>
            <p class="modal__information-text">XXX</p>
          </div>
          <div class="modal__information-content">
            <i class="modal__information-icon fas fa-phone-alt"></i>
            <a class="modal__information-text disabled-link" href="#"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/components.scss";
</style>

<script>
export default {
  name: 'Modal',
  props: {
    data: {
      type: Array
    }
  }
}
</script>

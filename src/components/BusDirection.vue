<template>
  <!-- 行駛方向區塊 -->
  <div class="direction">
    <span class="direction__mask"></span>
    <div class="direction__content">
      <div class="direction__container">
        <h3 class="hide">行駛方向</h3>
        <div class="direction__stations">
          <button class="direction__button-choose direction__button-choose--current">往<span
              class="direction__station-name">蘭潭</span></button>
          <button class="direction__button-choose">往<span class="direction__station-name">港坪運動公園</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusDirection'
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components.scss";
@import "@/assets/scss/bus-direction.scss";
</style>

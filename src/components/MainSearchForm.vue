<template>
   <!-- MV 區塊 -->
  <div class="main-search">
    <span class="main-search__mask"></span>
    <div class="main-search__content">
      <div
        tooltip="請至少選擇類別"
        flow="down"
        :class="{ 'tooltip-active' : showTooltip }"
        class="main-search__container"
      >
        <!-- 背景圖片區塊 -->
        <div class="main-search__background">
          <!-- 內容區塊 -->
          <div class="main-search__text">
            <h1 class="main-search__title">Welcome to <span class="text-color-pink">Taiwan°</span></h1>
            <p class="main-search__description">台北、台中、台南、屏東、宜蘭……遊遍台灣</p>
            <!-- 表單組件（搜尋） -->
            <form class="main-search__form-search form-search">
              <input
                class="main-search__input form-search__input"
                type="text"
                placeholder="搜尋關鍵字"
              >
              <button class="button-search">
                <i class="button-search__icon fas fa-search"></i>
              </button>
            </form>
            <!-- 表單組件（選取） -->
            <div class="main-search__form-select-box form-select-box">
              <form class="form-select-box__form">
                <select
                  class="form-select-box__select"
                  name="category"
                  id="category"
                  v-model="selectedCategory"
                >
                  <option value="">請選擇類別</option>
                  <option>景點</option>
                  <option>活動</option>
                  <option>美食</option>
                  <option>住宿</option>
                </select>
                <select
                  class="form-select-box__select"
                  name="category"
                  id="category"
                  v-model="selectedCity"
                >
                  <option value="">不分縣市</option>
                  <option>臺北市</option>
                  <option>新北市</option>
                  <option>桃園市</option>
                  <option>臺中市</option>
                  <option>臺南市</option>
                  <option>高雄市</option>
                  <option>基隆市</option>
                  <option>新竹市</option>
                  <option>新竹縣</option>
                  <option>苗栗縣</option>
                  <option>彰化縣</option>
                  <option>南投縣</option>
                  <option>雲林縣</option>
                  <option>嘉義縣</option>
                  <option>嘉義市</option>
                  <option>屏東縣</option>
                  <option>宜蘭縣</option>
                  <option>花蓮縣</option>
                  <option>臺東縣</option>
                  <option>金門縣</option>
                  <option>澎湖縣</option>
                  <option>連江縣</option>
                </select>
              </form>
              <!-- 過濾按鈕組件 -->
              <button
                tooltip-pconly="請至少選擇類別"
                flow="right"
                :class="{ 'tooltip-active' : showTooltip }"
                class="button-filter form-select-box__button"
                @click="$emit('sendFilter', selectedCategory, selectedCity)"
              >
                <i class="button-filter__icon fas fa-filter"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MainSearchForm',
  props: {
    'show-tooltip': Boolean
  },
  data () {
    return {
      selectedCategory: '',
      selectedCity: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components.scss";
@import "@/assets/scss/main-search-form.scss";
</style>

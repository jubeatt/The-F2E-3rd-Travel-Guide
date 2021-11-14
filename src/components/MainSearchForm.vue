<template>
   <!-- MV 區塊 -->
  <div class="main-search">
    <span class="main-search__mask"></span>
    <div class="main-search__content">
      <div class="main-search__container">
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
                  class="form-select-box__select text-spacing"
                  name="category"
                  id="category"
                >
                  <option value="類別">類別</option>
                  <option value="景點">景點</option>
                  <option value="活動">活動</option>
                  <option value="美食">美食</option>
                  <option value="住宿">住宿</option>
                </select>
                <select
                  class="form-select-box__select"
                  name="category"
                  id="category"
                >
                  <option value="不分縣市">不分縣市</option>
                  <option value="臺北市">臺北市</option>
                  <option value="新北市">新北市</option>
                  <option value="桃園市">桃園市</option>
                  <option value="台中市">台中市</option>
                  <option value="台南市">台南市</option>
                  <option value="高雄市">高雄市</option>
                  <option value="基隆市">基隆市</option>
                  <option value="新竹市">新竹市</option>
                  <option value="新竹縣">新竹縣</option>
                  <option value="苗栗縣">苗栗縣</option>
                  <option value="彰化縣">彰化縣</option>
                  <option value="南投縣">南投縣</option>
                  <option value="雲林縣">雲林縣</option>
                  <option value="嘉義縣">嘉義縣</option>
                  <option value="嘉義市">嘉義市</option>
                  <option value="屏東縣">屏東縣</option>
                  <option value="宜蘭縣">宜蘭縣</option>
                  <option value="花蓮縣">花蓮縣</option>
                  <option value="台東縣">台東縣</option>
                  <option value="金門縣">金門縣</option>
                  <option value="澎湖縣">澎湖縣</option>
                  <option value="連江縣">連江縣</option>
                </select>
              </form>
              <!-- 定位按鈕組件 -->
              <button class="button-position form-select-box__button">
                <svg
                  width="18"
                  height="24"
                  viewBox="0 0 18 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5019 8.82648C17.5019 4.12638 13.6922 0.310059 9.00011 0.310059C4.30807 0.310059 0.498291 4.12638 0.498291 8.82648C0.498291 12.683 3.18519 16.1378 6.87466 17.1019L7.59651 19.0301C5.59136 19.1506 2.22272 19.6327 2.22272 21.3199C2.22272 23.6097 8.31836 23.6901 9.04021 23.6901C9.76206 23.6901 15.8577 23.6097 15.8577 21.3199C15.8577 19.5925 12.449 19.1506 10.4438 19.0301L11.1256 17.1421C14.815 16.1779 17.5019 12.7232 17.5019 8.82648ZM11.7672 8.82648C11.7672 10.353 10.524 11.5983 9.00011 11.5983C7.4762 11.5983 6.23301 10.353 6.23301 8.82648C6.23301 7.29996 7.4762 6.05463 9.00011 6.05463C10.524 6.05463 11.7672 7.29996 11.7672 8.82648ZM14.414 21.3199C14.013 21.7216 12.0479 22.3242 9.00011 22.3242C5.99239 22.3242 4.02735 21.7216 3.58622 21.3199C3.94714 20.9584 5.59136 20.4361 8.07774 20.3558L8.51888 21.5208C8.59908 21.7216 8.75949 21.8422 9.00011 21.8422C9.20063 21.8422 9.40114 21.7216 9.48135 21.5208L9.88237 20.3558C12.4089 20.4361 14.013 20.9584 14.414 21.3199Z"
                    fill="white"
                  />
                </svg>
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
  name: 'MainSearchForm'
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components.scss";
@import "@/assets/scss/main-search-form.scss";
</style>

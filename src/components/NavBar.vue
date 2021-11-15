<template>
  <header>
      <!-- nav 置頂區塊 -->
      <div class="navbar">
        <span class="navbar__mask"></span>
        <div class="navbar__content">
          <div class="navbar__container">
            <div class="navbar__group">
              <!-- 首頁路由 -->
              <router-link to="/" class="logo navbar__logo">
                <img
                  class="logo__img"
                  src="../assets/images/logo.png"
                  alt="台灣旅遊景點導覽"
                >
              </router-link>
              <!-- navigation -->
              <nav class="navigation navbar__navigation">
                <ul class="menu-list">
                  <li class="menu-list__item">
                    <span class="menu-list__icon menu-list__icon--triangle"></span>
                    <router-link to="/EventsAndScenicSpot" class="menu-list__link">
                      景點活動
                    </router-link>
                  </li>
                  <li class="menu-list__item">
                    <span class="menu-list__icon menu-list__icon--square"></span>
                      <router-link to="/FoodAndHotel" class="menu-list__link">
                      美食住宿
                    </router-link>
                  </li>
                  <li class="menu-list__item">
                    <span class="menu-list__icon menu-list__icon--circle"></span>
                     <router-link to="/Bus" class="menu-list__link">
                      景點交通
                    </router-link>
                  </li>
                </ul>
              </nav>
              <!-- 搜尋頁面連結 -->
              <router-link to="/Search" class="navbar__button-search button-search">
                <i class="button-search__icon fas fa-search"></i>
              </router-link>
              <!-- 定位按鈕 -->
              <button class="button-position navbar__button-position">
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
  </header>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components.scss";
@import "@/assets/scss/navbar.scss";
</style>

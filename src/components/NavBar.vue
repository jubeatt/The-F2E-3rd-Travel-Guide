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
              <!-- link-search-page -->
              <router-link to="/Search" class="navbar__button-search button-search">
                <i class="button-search__icon fas fa-search"></i>
              </router-link>
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

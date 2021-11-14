<template>
  <section class="section-multiple">
    <div class="section-multiple__container">
      <h2 class="heading heading--square" id="foodsHeading">全臺灣餐飲總覽</h2>
      <div class="section-multiple__group">
        <!-- API抓資料 -->
        <template v-for="food in foods" :key="food.ID">
          <a href="#" class="card-portrait section-multiple__item floating-effect">
            <span class="card-portrait__mask"></span>
            <div class="card-portrait__content">
              <img class="card-portrait__img" :src="isProvideImage(food.Picture.PictureUrl1)" :alt="food.Picture.PictureDescription1 ? food.Picture.PictureDescription1 : '未提供'">
              <h3 class="card-portrait__name">{{ food.Name }}</h3>
              <address class="card-portrait__address">
                <i class="card-portrait__icon fas fa-map-marker-alt"></i>{{ food.City }}
              </address>
            </div>
          </a>
        </template>
      </div>
      <div class="pagination-buttons">
        <button class="button-direction button-direction--prev" :class="{ 'button-direction--disabled' : pagination.currentPage === 1 }" :disabled="pagination.currentPage === 1" @click="toPreviousPage"></button>
        <span class="pagination-buttons__current-page">{{ pagination.currentPage + '/' + pagination.totalPages }}</span>
        <button class="button-direction button-direction--next" :class="{ 'button-direction--disabled' : pagination.currentPage === pagination.totalPages }" :disabled="pagination.currentPage === pagination.totalPages" @click="toNextPage"></button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Foods',
  data () {
    return {
      // 已過濾 City 值為 null 的資料
      url: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$filter=City%20ne%20null&$top=240&$format=JSON',
      defaultImageUrl: require('@/assets/images/default.png'),
      foods: null,
      cacheFoods: [],
      pagination: {}
    }
  },
  methods: {
    async fetchEvents () {
      return await fetch(this.url).then((response) => response.json())
    },
    async initFirstPage () {
      // API 抓資料
      this.cacheFoods = await this.fetchEvents()
      // 總共有幾筆資料
      this.pagination.totalResults = this.cacheFoods.length
      // 每一頁要顯示幾筆資料
      this.pagination.perPage = 8
      // 總頁數
      this.pagination.totalPages = Math.ceil(this.pagination.totalResults / this.pagination.perPage)
      // 目前頁數
      this.pagination.currentPage = 1
      // 根據目前頁數來過濾出需要的資料（用來顯示）
      this.foods = this.filterCurrentData(this.cacheFoods)
    },
    filterCurrentData (totalData) {
      // 儲存過濾後的資料
      const result = []
      // 根據資料的範圍來過濾正確的資料
      totalData.forEach((item, index) => {
        // 頁數是從 1 開始，所以 index(0) 要加上 1
        const num = index + 1
        if (num >= this.minPage && num <= this.maxPage) {
          result.push(item)
        }
      })
      return result
    },
    isProvideImage (imgUrl) {
      if (!imgUrl) {
        return this.defaultImageUrl
      } else {
        return imgUrl
      }
    },
    toPreviousPage () {
      this.pagination.currentPage = this.pagination.currentPage - 1
    },
    toNextPage () {
      this.pagination.currentPage = this.pagination.currentPage + 1
    }
  },
  computed: {
    minPage () {
      // 根據目前頁數來定義資料的起始值、結尾值
      // 第一頁 = 1 ~ 12 的資料
      // 第二頁 = 13 ~ 24 的資料
      return (this.pagination.currentPage * this.pagination.perPage) - this.pagination.perPage + 1
    },
    maxPage () {
      return (this.pagination.currentPage * this.pagination.perPage)
    }
  },
  created () {
    this.initFirstPage()
  },
  watch: {
    'pagination.currentPage': function () {
      // 更新顯示的資料
      this.foods = this.filterCurrentData(this.cacheFoods)
      document.querySelector('#foodsHeading').scrollIntoView(true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components.scss";
</style>

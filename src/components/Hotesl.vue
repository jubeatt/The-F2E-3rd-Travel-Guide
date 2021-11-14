<template>
  <section class="section-multiple">
    <div class="section-multiple__container">
      <h2 class="heading heading--square" id="hotelsHeading">全臺灣旅宿總覽</h2>
      <div class="section-multiple__group">
        <!-- API抓資料 -->
        <template v-for="hotel in hotels" :key="hotel.ID">
          <a @click.prevent="openModal(hotel)" href="#" class="card-portrait section-multiple__item floating-effect">
            <span class="card-portrait__mask"></span>
            <div class="card-portrait__content">
              <img class="card-portrait__img" :src="isProvideImage(hotel.Picture.PictureUrl1)" :alt="hotel.Picture.PictureDescription1 ? hotel.Picture.PictureDescription1 : '未提供'">
              <h3 class="card-portrait__name">{{ hotel.Name }}</h3>
              <address class="card-portrait__address">
                <i class="card-portrait__icon fas fa-map-marker-alt"></i>{{ hotel.City }}
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
  <!-- 詳情彈跳視窗 -->
  <div v-if="modal.isOpen" class="modal">
    <div @click="closeModal" class="modal__background"></div>
    <div class="modal__content">
      <img class="modal__img" :src="checkPictureUrl(modal.content.Picture)" :alt="checkPictureDescription(modal.content.Picture)">
      <div class="modal__buttons">
        <button class="modal__button-prev button-direction button-direction--prev" :class="{ 'button-direction--disabled' : modal.pictureIndex === 1}" :disabled="modal.pictureIndex === 1" @click="changePicture(-1)"></button>
        <button class="modal__button-next button-direction button-direction--next" :class="{ 'button-direction--disabled' : modal.pictureIndex === modal.pictureLength }" :disabled="modal.pictureIndex === modal.pictureLength" @click="changePicture(1)"></button>
      </div>
      <h3 class="modal__title">{{ modal.content.Name }}</h3>
      <p class="modal__description">{{ modal.content.Description }}</p>
      <div class="modal__information-group">
        <div class="modal__information-item">
          <div class="modal__information-content">
            <i class="modal__information-icon fas fa-dollar-sign"></i>
            <p class="modal__information-text">{{ checkSpec(modal.content.Spec) }}</p>
          </div>
          <div class="modal__information-content">
            <i class="modal__information-icon fas fa-map-marker-alt"></i>
            <a class="modal__information-text" :class="{ 'disabled-link' : !modal.content.MapUrl}" :href="modal.content.MapUrl ? modal.content.MapUrl : '#'" target="_blank">{{ modal.content.Address }}</a>
          </div>
           <div class="modal__information-content">
            <i class="modal__information-icon fas fa-star"></i>
            <p class="modal__information-text">{{ checkGrade(modal.content.Grade ) }}</p>
          </div>
        </div>
        <div class="modal__information-item">
          <div class="modal__information-content">
            <i class="modal__information-icon fas fa-tags"></i>
            <p class="modal__information-text">{{ checkClass(modal.content.Class) }}</p>
          </div>
           <div class="modal__information-content">
            <i class="modal__information-icon fas fa-globe-americas"></i>
            <a class="modal__information-text" :class="{ 'disabled-link' : !modal.content.WebsiteUrl }" :href="modal.content.WebsiteUrl ? modal.content.WebsiteUrl : '#'" target="_blank">{{ checkWebsiteUrl(modal.content.WebsiteUrl ) }}</a>
          </div>
          <div class="modal__information-content">
            <i class="modal__information-icon fas fa-phone-alt"></i>
            <a class="modal__information-text" :class="{ 'disabled-link' : !modal.content.Phone}" :href="modal.content.Phone ? 'tel:' + modal.content.Phone : '#'">{{ checkPhone(modal.content.Phone) }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hotels',
  data () {
    return {
      // 過濾 City 值為 null、根據經度由北到南排序、跳過前120筆資料
      url: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel?$filter=City%20ne%20null&$orderby=Position%2FPositionLat%20desc&$top=400&$skip=166&$format=JSON',
      defaultImageUrl: require('@/assets/images/default.png'),
      hotels: null,
      cacheHotels: [],
      pagination: {},
      modal: {
        content: null,
        isOpen: false,
        pictureIndex: 1,
        pictureLength: 1
      }
    }
  },
  methods: {
    async fetchHotels () {
      return await fetch(this.url).then((response) => response.json())
    },
    async initFirstPage () {
      // API 抓資料
      this.cacheHotels = await this.fetchHotels()
      // 總共有幾筆資料
      this.pagination.totalResults = this.cacheHotels.length
      // 每一頁要顯示幾筆資料
      this.pagination.perPage = 8
      // 總頁數
      this.pagination.totalPages = Math.ceil(this.pagination.totalResults / this.pagination.perPage)
      // 目前頁數
      this.pagination.currentPage = 1
      // 根據目前頁數來過濾出需要的資料（用來顯示）
      this.hotels = this.filterCurrentData(this.cacheHotels)
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
    },
    openModal (data) {
      console.log('Open Modal')
      // 將傳入的活動資料儲存到 modal 中
      this.modal.content = data
      this.modal.isOpen = true
    },
    closeModal () {
      console.log('Close Modal')
      // 初始化
      this.modal.pictureIndex = 1
      this.modal.pictureLength = 1
      this.modal.isOpen = false
    },
    checkSpec (text) {
      if (!text) {
        return '未提供價目資料'
      } else {
        return text
      }
    },
    checkClass (classString) {
      if (!classString) {
        return '未分類'
      } else {
        return classString
      }
    },
    checkPictureUrl (pictureObject) {
      if (!pictureObject.PictureUrl1) {
        // 回傳預設圖片路徑
        return this.defaultImageUrl
      } else {
        // 儲存圖片數量（圖片物件中包含圖片敘述，所以最後要再除以2）
        this.modal.pictureLength = (Object.keys(pictureObject).length / 2)
        // 回傳圖片網址（利用索引值變更屬性值）
        return pictureObject['PictureUrl' + this.modal.pictureIndex]
      }
    },
    checkPictureDescription (pictureObject) {
      if (!pictureObject.PictureDescription1) {
        return '未提供圖片敘述'
      } else {
        return pictureObject['PictureDescription' + this.modal.pictureIndex]
      }
    },
    changePicture (direction) {
      console.log('click')
      console.log(direction)
      // 根據參數對索引值 +1 或 -1
      this.modal.pictureIndex = this.modal.pictureIndex + direction
      // 當索引值超出圖片長度時的處理
      if (this.modal.pictureIndex > this.modal.pictureLength) {
        this.modal.pictureIndex = this.modal.pictureLength
      }
      // 當索引值低於 1 時的處理
      if (this.modal.pictureIndex < 1) {
        this.modal.pictureIndex = 1
      }
    },
    checkPhone (phone) {
      if (!phone) {
        return '未提供聯絡資料'
      } else {
        return phone
      }
    },
    checkWebsiteUrl (url) {
      if (!url) {
        return '未提供旅宿網站'
      } else {
        return '旅宿網站'
      }
    },
    checkGrade (text) {
      if (!text) {
        return '未提供星級資料'
      } else {
        return text
      }
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
      this.hotels = this.filterCurrentData(this.cacheHotels)
      // document.querySelector('#hotelsHeading').scrollIntoView(true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components.scss";
</style>

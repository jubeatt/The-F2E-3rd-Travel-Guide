<template>
  <section class="section-single">
    <div class="section-single__container">
      <h2 class="heading heading--triangle" id="eventsHeading">全臺灣活動總覽</h2>
      <div class="section-single__group">
        <!-- API抓資料 -->
        <template v-for="event in events" :key="event.ID">
          <a @click.prevent="openModal(event)" href="#" class="card-landscape section-single__item floating-effect">
            <span class="card-landscape__mask"></span>
            <div class="card-landscape__content">
              <div class="card-landscape__picture">
                <img class="card-landscape__img" :src="isProvideImage(event.Picture.PictureUrl1)" :alt="event.Picture.PictureDescription1 ? event.Picture.PictureDescription1 : '未提供'">
              </div>
              <div class="card-landscape__text">
                <h3 class="card-landscape__name">{{ event.Name }}</h3>
                <p class="card-landscape__description">{{ checkTextLength(event.Description) }}</p>
                <div class="card-landscape__info">
                  <address class="card-landscape__address">
                    <i class="card-landscape__icon fas fa-map-marker-alt"></i>{{ event.City }}
                  </address>
                  <button class="button-detail card-landscape__button">活動詳情</button>
                </div>
              </div>
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
            <i class="modal__information-icon far fa-clock"></i>
            <p class="modal__information-text">{{ checkDate(modal.content.StartTime, modal.content.EndTime) }}</p>
          </div>
          <div class="modal__information-content">
            <i class="modal__information-icon fas fa-map-marker-alt"></i>
            <address class="modal__information-text">{{ modal.content.Address }}</address>
          </div>
        </div>
        <div class="modal__information-item">
          <div class="modal__information-content">
            <i class="modal__information-icon fas fa-ticket-alt"></i>
            <p class="modal__information-text">{{ checkCharge(modal.content.Charge) }}</p>
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
  name: 'Events',
  data () {
    return {
      // 過濾 City 值為 null、根據經度由北到南排序、跳過前5筆資料
      url: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$filter=City%20ne%20null&$orderby=Position%2FPositionLat%20desc&$top=400&$skip=5&$format=JSON',
      defaultImageUrl: require('@/assets/images/default.png'),
      events: null,
      cacheEvents: [],
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
    async fetchEvents () {
      return await fetch(this.url).then((response) => response.json())
    },
    async initFirstPage () {
      // API 抓資料
      this.cacheEvents = await this.fetchEvents()
      // 總共有幾筆資料
      this.pagination.totalResults = this.cacheEvents.length
      // 每一頁要顯示幾筆資料
      this.pagination.perPage = 4
      // 總頁數
      this.pagination.totalPages = Math.ceil(this.pagination.totalResults / this.pagination.perPage)
      // 目前頁數
      this.pagination.currentPage = 1
      // 根據目前頁數來過濾出需要的資料（用來顯示）
      this.events = this.filterCurrentData(this.cacheEvents)
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
    checkTextLength (text) {
      // 最大字數限制
      const maxLength = 100
      // 儲存結果字串
      let resultString = ''
      // 判斷是否超過最大字數限制
      if (text.length > maxLength) {
        // 選取第 0 ~ 100 之間的文字
        const selectedText = text.slice(0, 100)
        // 字尾加上 '...'
        resultString = selectedText.concat('...')
        // 回傳結果字串
        return resultString
      } else {
        // 回傳原始字串
        return text
      }
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
    checkDate (startDateString, endDateString) {
      if (!startDateString || !endDateString) {
        return '未提供活動日期'
      } else {
        const startDate = new Date(startDateString).toLocaleDateString()
        const endDate = new Date(endDateString).toLocaleDateString()
        return startDate + '～' + endDate
      }
    },
    checkCharge (chargeString) {
      if (chargeString && chargeString !== '0') {
        return chargeString
      } else {
        return '免費'
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
      this.events = this.filterCurrentData(this.cacheEvents)
      // document.querySelector('#eventsHeading').scrollIntoView(true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components.scss";
</style>

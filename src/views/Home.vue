<template>
  <MainSearchForm @sendFilter="getFilterData" :show-tooltip="isGetError"/>
  <CityCollection v-if="!isSearchResultActive" />
  <Events v-if="!isSearchResultActive" />
  <Foods v-if="!isSearchResultActive" />
  <FilterContent v-if="isSearchResultActive" @toNextPage="updateData" @toPreviousPage="updateData" :search-data="resultData" :pagination="paginationInfo"/>
</template>

<script>
import MainSearchForm from '../components/MainSearchForm.vue'
import CityCollection from '../components/CityCollection.vue'
import Events from '../components/Events.vue'
import Foods from '../components/Foods.vue'
import FilterContent from '../components/FilterContent.vue'
import GetAuthorizationHeader from '../lib/Authorization.js'

export default {
  name: 'Home',
  components: {
    MainSearchForm,
    CityCollection,
    Events,
    Foods,
    FilterContent
  },
  data () {
    return {
      isGetError: false,
      isSearchResultActive: false,
      cacheSearchData: [],
      resultData: [],
      paginationInfo: {}
    }
  },
  methods: {
    async getFilterData (selectedCategory, selectedCity) {
      this.resultData = []
      let category = ''
      let city = ''
      // 至少需選擇類別
      if (!selectedCategory) {
        // 開啟 tooltips
        this.isGetError = true
      } else {
        switch (selectedCategory) {
          case '景點':
            category = 'ScenicSpot'
            break
          case '活動':
            category = 'Activity'
            break
          case '美食':
            category = 'Restaurant'
            break
          case '住宿':
            category = 'Hotel'
            break
        }
        switch (selectedCity) {
          case '臺北市':
            city = 'Taipei'
            break
          case '新北市':
            city = 'NewTaipei'
            break
          case '桃園市':
            city = 'Taoyuan'
            break
          case '臺中市':
            city = 'Taichung'
            break
          case '臺南市':
            city = 'Tainan'
            break
          case '高雄市':
            city = 'Kaohsiung'
            break
          case '基隆市':
            city = 'Keelung'
            break
          case '新竹市':
            city = 'Hsinchu'
            break
          case '新竹縣':
            city = 'HsinchuCounty'
            break
          case '苗栗縣':
            city = 'MiaoliCounty'
            break
          case '彰化縣':
            city = 'ChanghuaCounty'
            break
          case '南投縣':
            city = 'NantouCounty'
            break
          case '雲林縣':
            city = 'YunlinCounty'
            break
          case '嘉義縣':
            city = 'ChiayiCounty'
            break
          case '嘉義市':
            city = 'Chiayi'
            break
          case '屏東縣':
            city = 'PingtungCounty'
            break
          case '宜蘭縣':
            city = 'YilanCounty'
            break
          case '花蓮縣':
            city = 'HualienCounty'
            break
          case '臺東縣':
            city = 'TaitungCounty'
            break
          case '金門縣':
            city = 'KinmenCounty'
            break
          case '澎湖縣':
            city = 'PenghuCounty'
            break
          case '連江縣':
            city = 'LienchiangCounty'
            break
        }
        // 發送請求
        this.cacheSearchData = await this.sendAPIRequest(category, city)
        // 總共有幾筆資料
        this.paginationInfo.totalResults = this.cacheSearchData.length
        // 每一頁要顯示幾筆資料
        this.paginationInfo.perPage = 8
        // 總頁數
        this.paginationInfo.totalPages = Math.ceil(this.paginationInfo.totalResults / this.paginationInfo.perPage)
        // 目前頁數
        this.paginationInfo.currentPage = 1
        // 儲存分頁資料範圍
        this.paginationInfo.minPage = (this.paginationInfo.currentPage * this.paginationInfo.perPage) - this.paginationInfo.perPage + 1
        this.paginationInfo.maxPage = (this.paginationInfo.currentPage * this.paginationInfo.perPage)

        // 過濾要顯示的資料
        this.cacheSearchData.forEach((item, index) => {
          const num = index + 1
          if (num >= this.paginationInfo.minPage && num <= this.paginationInfo.maxPage) {
            this.resultData.push(item)
          }
        })
        // 關閉 tooltips
        this.isGetError = false
        this.isSearchResultActive = true
      }
    },
    async sendAPIRequest (category, city) {
      // fetch 過濾資料，將 json 資料轉成物件存入實體 data 中
      return await fetch(`https://ptx.transportdata.tw/MOTC/v2/Tourism/${category}/${city}?$top=2000&$format=JSON`, { headers: GetAuthorizationHeader() }).then((response) => response.json())
    },
    updateData (direction) {
      console.log('收到')
      if (direction > 0) {
        console.log('下一頁')
        this.paginationInfo.currentPage = this.paginationInfo.currentPage + 1
        // 儲存分頁資料範圍
        this.paginationInfo.minPage = (this.paginationInfo.currentPage * this.paginationInfo.perPage) - this.paginationInfo.perPage + 1
        this.paginationInfo.maxPage = (this.paginationInfo.currentPage * this.paginationInfo.perPage)
        // 初始化資料內容
        this.resultData = []
        // 過濾要顯示的資料
        this.cacheSearchData.forEach((item, index) => {
          const num = index + 1
          if (num >= this.paginationInfo.minPage && num <= this.paginationInfo.maxPage) {
            this.resultData.push(item)
          }
        })
      } else {
        console.log('上一頁')
        this.paginationInfo.currentPage = this.paginationInfo.currentPage - 1
        // 儲存分頁資料範圍
        this.paginationInfo.minPage = (this.paginationInfo.currentPage * this.paginationInfo.perPage) - this.paginationInfo.perPage + 1
        this.paginationInfo.maxPage = (this.paginationInfo.currentPage * this.paginationInfo.perPage)
        // 初始化資料內容
        this.resultData = []
        // 過濾要顯示的資料
        this.cacheSearchData.forEach((item, index) => {
          const num = index + 1
          if (num >= this.paginationInfo.minPage && num <= this.paginationInfo.maxPage) {
            this.resultData.push(item)
          }
        })
      }
    }
  }
}
</script>

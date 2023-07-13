<template>
  <div class="recommend" v-loading:[loadingText]="loading">
    <scroll class="recommend-content">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <slider v-if="sliders.length" :sliders="sliders" />
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title" v-show="!loading">热门歌单推荐</h1>
          <recommend-list :albums="albums" />
        </div>
      </div>
    </scroll>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { getRecommend } from '@/service/recommend'
import Slider from '@/components/base/slider/slider.vue'
import RecommendList from '@/components/recommend-list/recommend-list.vue'
import Scroll from '@/components/wrap-scroll'

const loadingText = ref('等待加载...')
const loading = computed(() => {
  return !sliders.value.length && !albums.value.length
})

const sliders = ref([])
const albums = ref([])
async function getRecommendList() {
  const { result } = await getRecommend()
  sliders.value = result.sliders
  albums.value = result.albums
}
getRecommendList()
</script>

<style scoped lang="scss">
.recommend {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
  overflow: scroll;
  min-height: 1px;
  &-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
      padding-top: 40%;
      .slider-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
    }
  }
}
</style>

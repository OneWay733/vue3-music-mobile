<template>
  <div class="singer-detail">
    <music-list :songs="songs" :pic="pic" :title="title" :loading="loading" />
  </div>
</template>

<script>
import { SINGER_KEY } from '@/assets/js/constant'
import { getSingerDetail } from '@/service/singer'
import createDetailComponent from '@/assets/js/create-detail-component'
export default createDetailComponent(SINGER_KEY, getSingerDetail)
</script>

<style scoped lang="scss">
.singer-detail {
  position: fixed;
  inset: 0;
  background: $color-background;
  z-index: 10;
}
</style>

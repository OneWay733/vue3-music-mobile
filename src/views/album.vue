<template>
  <div class="album">
    <music-list :songs="songs" :title="title" :pic="pic" :loading="loading"></music-list>
  </div>
</template>

<script>
import createDetailComponent from '@/assets/js/create-detail-component'
import { ALBUM_KEY } from '@/assets/js/constant'
import { getAlbum } from '@/service/recommend'

export default createDetailComponent(ALBUM_KEY, getAlbum)
</script>

<style scoped lang="scss">
.album {
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $color-background;
}
</style>

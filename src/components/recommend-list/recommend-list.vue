<template>
  <ul class="recommend-list">
    <li v-for="album in albums" :key="album.id" class="item" @click="selectItem(album)">
      <div class="icon">
        <img width="60" height="60" v-lazy="album.pic" />
      </div>
      <div class="text">
        <h2 class="name">
          {{ album.username }}
        </h2>
        <p class="title">
          {{ album.title }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  albums: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['selectAlbum'])
function selectItem(album) {
  emit('selectAlbum', album)
}
</script>

<style scoped lang="scss">
.recommend-list {
  .item {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 20px 20px 20px;
    .icon {
      flex: 0 0 60px;
      width: 60px;
      padding-right: 20px;
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      font-size: $font-size-medium;
    }
    .name {
      margin-bottom: 10px;
      color: $color-text;
    }
    .title {
      color: $color-text-d;
    }
  }
}
</style>

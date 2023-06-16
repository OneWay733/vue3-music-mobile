<template>
  <scroll class="index-list">
    <ul ref="groupRef">
      <li class="group" v-for="item in data" :key="item.title">
        <h2 class="title">{{ item.title }}</h2>
        <ul>
          <li class="item" v-for="singer in item.list" :key="singer.id">
            <img class="avatar" v-lazy="singer.pic" />
            <span class="name">{{ singer.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed">
      <h2 class="title">123</h2>
    </div>
  </scroll>
</template>

<script setup>
import Scroll from '@/components/base/scroll/scroll.vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

console.log('data', props.data)
</script>

<style scoped lang="scss">
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
  .fixed {
    position: fixed;
    top: 88px;
    width: 100%;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
}
</style>

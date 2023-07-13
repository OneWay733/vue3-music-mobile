<template>
  <scroll class="index-list" :probe-type="3" @scroll="onScroll" ref="scrollRef">
    <ul ref="groupRef">
      <li class="group" v-for="item in data" :key="item.title">
        <h2 class="title">{{ item.title }}</h2>
        <ul>
          <li
            class="item"
            v-for="singer in item.list"
            :key="singer.id"
            @click="onItemClick(singer)"
          >
            <img class="avatar" v-lazy="singer.pic" />
            <span class="name">{{ singer.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed" v-show="fixedTitle" :style="fixedStyle">
      <h2 class="title">{{ fixedTitle }}</h2>
    </div>
    <div
      class="shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
      @touchend.stop.prevent="onShortcutTouchEnd"
    >
      <ul>
        <li
          class="item"
          :class="{ current: currentIndex === index }"
          v-for="(item, index) in shortcutList"
          :key="item"
          :data-index="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script setup>
import Scroll from '@/components/wrap-scroll'
import useFixed from '@/components/index-list/use-fixed'
import useShortcut from '@/components/index-list/use-shortcut'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
const { groupRef, onScroll, fixedTitle, fixedStyle, currentIndex } = useFixed(props)
const { shortcutList, onShortcutTouchStart, onShortcutTouchEnd, onShortcutTouchMove, scrollRef } =
  useShortcut(props, groupRef)

const emit = defineEmits(['select'])
function onItemClick(singer) {
  emit('select', singer)
}
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
    position: absolute;
    top: 0;
    left: 0;
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
  .shortcut {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    background: $color-background-d;
    border-radius: 10px;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
      text-align: center;
      &.current {
        color: $color-theme;
      }
    }
  }
}
</style>

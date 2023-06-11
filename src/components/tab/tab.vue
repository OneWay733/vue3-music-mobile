<template>
  <div class="tab">
    <router-link v-for="tab in tabs" :key="tab.path" :to="tab.path" class="tab-item">
      <span class="tab-link">{{ tab.name }}</span>
    </router-link>
  </div>
</template>

<script setup>
const tabs = [
  {
    path: '/recommend',
    name: '推荐'
  },
  {
    path: '/singer',
    name: '歌手'
  },
  {
    path: '/top-list',
    name: '排行'
  },
  {
    path: '/search',
    name: '搜索'
  }
]
</script>

<style scoped lang="scss">
.tab {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;
  .tab-item {
    flex: 1;
    text-align: center;
  }
  .tab-link {
    padding-bottom: 5px;
    color: $color-text-l;
  }
  & .router-link-active {
    .tab-link {
      color: $color-theme;
      border-bottom: 2px solid $color-theme;
    }
  }
}
</style>

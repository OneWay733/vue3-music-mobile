<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24" />
    <p class="desc">{{ tip }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tip = ref('')
function setTitle(title) {
  tip.value = title
}

defineExpose({
  setTitle
})
</script>

<style scoped lang="scss">
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
  .desc {
    line-height: 20px;
    font-size: $font-size-small;
    color: $color-text-l;
  }
}
</style>

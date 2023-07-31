<template>
  <div class="search-input">
    <i class="icon-search"></i>
    <input class="input-inner" :placeholder="placeholder" v-model="query" />
    <i class="icon-dismiss" @click="clear" v-show="query"></i>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { debounce } from 'throttle-debounce'

const props = defineProps({
  placeholder: {
    type: String,
    default: '搜索歌曲、歌手'
  },
  modelValue: String
})

const emits = defineEmits(['update:modelValue'])
const query = ref(props.modelValue)

watch(
  query,
  debounce(300, (newQuery) => {
    emits('update:modelValue', newQuery.trim())
  })
)
watch(
  () => props.modelValue,
  (newValue) => {
    query.value = newValue
  }
)

function clear() {
  query.value = ''
}
</script>

<style scoped lang="scss">
.search-input {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 32px;
  background: $color-highlight-background;
  border-radius: 6px;
  .input-inner {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: $color-highlight-background;
    color: $color-text;
    font-size: $font-size-medium;
    outline: 0;
    &::placeholder {
      color: $color-text-d;
    }
  }
  .icon-dismiss {
    font-size: 16px;
    color: $color-text-d;
  }
}
</style>

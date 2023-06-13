<template>
  <div>recommend</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { getRecommend } from '@/service/recommend'

onMounted(() => {
  getRecommendList()
})

async function getRecommendList() {
  const result = await getRecommend()
  console.log(result)
}
</script>

<style scoped lang="scss"></style>

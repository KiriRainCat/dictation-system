<template>
  <div class="relative flex min-h-screen items-center justify-center bg-gray-100">
    <el-card class="min-w-[720px] max-w-[960px] rounded-lg shadow-lg my-20">
      <div class="text-2xl font-bold mb-4 text-center">{{ listName }}</div>
      <v-md-preview :text="text"></v-md-preview>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import axios from 'axios'

const listName = router.currentRoute.value.params.listName

const text = ref('')

onMounted(() => {
  axios
    .get(`/lists/${listName}.md`)
    .then((res) => {
      text.value = res.data
    })
    .catch((err) => {
      text.value = '未找到文件：' + err
      ElMessage.error(err)
    })
})
</script>

<style scoped></style>

<template>
  <div class="relative flex min-h-screen items-center justify-center bg-gray-100 text-center">
    <el-card class="min-w-[720px] max-w-[1024px] rounded-lg shadow-lg my-20">
      <div class="text-2xl font-bold mb-4">{{ $t('result.result') }}</div>
      <el-table :data="resultList" rowKey="name" class="select-none">
        <el-table-column :label="t('result.standardAns')" prop="str1"></el-table-column>
        <el-table-column :label="t('result.inputtedAns')" prop="str2"></el-table-column>
        <el-table-column :label="t('result.similarity')" prop="similarity"></el-table-column>
      </el-table>
      <div class="mt-4 font-bold">
        {{ $t('result.avgSimilarity') + (similaritySum / resultList?.length!).toFixed(2) + '%' }}
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store'
import type { dictationResult } from 'env'

const store = useStore()

const resultList: Array<dictationResult> = store.resultList

const similaritySum = ref(0)

const { t } = useI18n()

onMounted(() => {
  resultList.forEach((val) => {
    val.similarity = calculateSimilarity(val.str1, val.str2)
  })

  console.log(resultList)
})

const calculateSimilarity = (str1: string, str2: string) => {
  const len1 = str1.length
  const len2 = str2.length

  if (len1 === 0 && len2 === 0) {
    return '100%' // 两个空字符串，相似度为 100%
  }

  const distance = Array(len1 + 1)
    .fill(null)
    .map(() => Array(len2 + 1).fill(null))

  for (let i = 0; i <= len1; i++) {
    distance[i][0] = i
  }

  for (let j = 0; j <= len2; j++) {
    distance[0][j] = j
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1
      distance[i][j] = Math.min(
        distance[i - 1][j] + 1, // 删除操作
        distance[i][j - 1] + 1, // 插入操作
        distance[i - 1][j - 1] + cost // 替换操作
      )
    }
  }

  const maxLen = Math.max(len1, len2)
  const similarity = ((maxLen - distance[len1][len2]) / maxLen) * 100
  similaritySum.value += similarity
  return similarity.toFixed(2) + '%'
}
</script>

<style scoped></style>

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
        {{
          $t('result.avgSimilarity') +
          ((similaritySum * 100) / resultList?.length!).toFixed(2) +
          '%'
        }}
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
    val.similarity = calculateStringSimilarity(val.str1, val.str2)
  })

  console.log(resultList)
})

function calculateStringSimilarity(str1: string, str2: string): string {
  // 去除特殊字符
  // eslint-disable-next-line no-useless-escape
  const cleanStr1 = str1.replace(/[\/\|\[\]]/g, '').trim()
  // eslint-disable-next-line no-useless-escape
  const cleanStr2 = str2.replace(/[\/\|\[\]]/g, '').trim()

  // 分割为词语数组
  const words1 = cleanStr1.split(' ')
  const words2 = cleanStr2.split(' ')

  // 构建词语向量
  const wordVector1 = createWordVector(words1)
  const wordVector2 = createWordVector(words2)

  // 计算余弦相似度
  const similarity = cosineSimilarity(wordVector1, wordVector2)
  similaritySum.value += similarity
  return (similarity * 100).toFixed(2) + '%'
}

// 创建词语向量
function createWordVector(words: string[]): Map<string, number> {
  const wordVector = new Map<string, number>()

  for (const word of words) {
    const cleanedWord = word.replace(/['’]/g, '') // 去除特殊符号
    if (wordVector.has(cleanedWord)) {
      wordVector.set(cleanedWord, wordVector.get(cleanedWord)! + 1)
    } else {
      wordVector.set(cleanedWord, 1)
    }
  }

  return wordVector
}

// 计算余弦相似度
function cosineSimilarity(vector1: Map<string, number>, vector2: Map<string, number>): number {
  let dotProduct = 0
  let magnitude1 = 0
  let magnitude2 = 0

  for (const [word, count] of vector1) {
    magnitude1 += count * count
    if (vector2.has(word)) {
      dotProduct += count * vector2.get(word)!
    }
  }

  for (const count of vector2.values()) {
    magnitude2 += count * count
  }

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0 // 避免除以 0
  }

  const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2))
  return similarity
}
</script>

<style scoped></style>

<template>
  <div class="relative flex min-h-screen items-center justify-center bg-gray-100 text-center">
    <el-card class="min-w-[540px] max-w-[640px] rounded-lg shadow-lg my-20">
      <div class="text-2xl font-bold mb-4">{{ $t('list.dictation-list-index') }}</div>

      <el-divider direction="horizontal" class="bg-gray-400">
        <div class="font-bold">请从选择想要默写的内容 ~</div>
      </el-divider>

      <el-tree
        ref="treeRef"
        :data="data"
        show-checkbox
        default-expand-all
        node-key="title"
        highlight-current
        :props="props"
        @change="getCheckedDictations"
      />

      <el-divider direction="horizontal" class="bg-gray-400">
        <div class="font-bold">字数预估：{{ totalWords }} words</div>
      </el-divider>

      <el-button @click="handleStartTest" type="primary" class="min-w-[120px]">冲鸭！</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useStore } from '@/store/store'
import axios from 'axios'
import type { ElTree } from 'element-plus'
import type { dictation } from 'env'

const store = useStore()

const listName = router.currentRoute.value.params.listName

const data = ref()
const props = {
  label: 'title',
  children: 'children',
}
const treeRef = ref<InstanceType<typeof ElTree>>()

onMounted(() => {
  axios
    .get(`/lists/${listName}.json`)
    .then((res) => {
      data.value = res.data
    })
    .catch((err) => {
      data.value = '未找到文件：' + err
      ElMessage.error(err)
    })
})

/**
 * 获取过滤后的题目节点，并统计字数
 * @returns filteredNodes
 */
const getCheckedDictations = (): Array<dictation> => {
  totalWords.value = 0
  const nodes = treeRef.value!.getCheckedNodes(false, false)
  const filteredNodes = nodes.filter((obj) => {
    let bool = obj.contents && obj.contents.length > 0
    if (bool) {
      obj.contents.forEach((str: string) => {
        totalWords.value += countWords(str)
      })
    }
    return bool
  })
  return filteredNodes as Array<dictation>
}

const handleStartTest = () => {
  ElMessageBox.confirm('确定开始吗？', '开始默写', {
    confirmButtonText: '芜湖起飞~',
    cancelButtonText: '再想想...',
    type: 'warning',
  }).then(() => {
    store.dictationList?.push(...getCheckedDictations())
    router.push('/dictation')
  })
}

const totalWords = ref(0)

function countWords(str: string): number {
  // 使用正则表达式匹配单词
  const regex = /[a-zA-Z0-9]+/g
  const matches = str.match(regex)

  // 如果匹配结果为 null 或者空数组，则返回 0
  if (matches === null || matches.length === 0) {
    return 0
  }

  // 返回匹配到的单词数量
  return matches.length
}
</script>

<style scoped></style>

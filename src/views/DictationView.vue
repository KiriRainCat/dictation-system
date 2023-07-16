<template>
  <div class="relative flex min-h-screen items-center justify-center bg-gray-100 text-center">
    <transition-group name="el-fade-in" :duration="{ enter: 500, leave: 50 }">
      <el-card
        v-if="isMemorizing"
        @click="handleContinue"
        class="min-w-[540px] max-w-[640px] rounded-lg shadow-lg my-20 cursor-pointer select-none"
      >
        <div class="font-bold text-2xl mb-2">
          {{
            topicList[currentTopicIndex].title +
            (topicList[currentTopicIndex].contents.length > 1 ? '(ex)' : '')
          }}：记忆
        </div>
        <template
          v-for="item in topicList[currentTopicIndex].contents[currentContentIndex].split(' / ')"
          :key="item"
        >
          <li class="mb-2 text-justify">{{ item }}</li>
        </template>
      </el-card>

      <el-card v-else class="min-w-[540px] max-w-[640px] rounded-lg shadow-lg my-20 select-none">
        <div class="font-bold text-2xl mb-2">
          {{
            topicList[currentTopicIndex].title +
            (topicList[currentTopicIndex].contents.length > 1 ? '(ex)' : '')
          }}：默写
        </div>
        <template
          v-for="(item, index) in topicList[currentTopicIndex].contents[currentContentIndex].split(
            ' / '
          )"
          :key="item"
        >
          <li class="mb-2 text-justify">
            <el-input v-model="inputs[index]" class="max-w-[240px]"></el-input>
          </li>
        </template>
        <el-link type="success" @click="handleContinue" class="mt-2">
          <div class="text-lg font-bold">提交</div>
        </el-link>
      </el-card>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useStore } from '@/store/store'

const store = useStore()

const topicList = store.dictationList
const currentTopicIndex = ref(0)
const currentContentIndex = ref(0)

const isMemorizing = ref(true)

const inputs = ref([])

const handleContinue = () => {
  if (!isMemorizing.value) {
    const answer = inputs.value.join(' / ')
    store.resultList.push({
      str1: topicList[currentTopicIndex.value].contents[currentContentIndex.value],
      str2: answer,
    })
    inputs.value = []

    if (currentContentIndex.value < topicList[currentTopicIndex.value].contents.length - 1) {
      currentContentIndex.value++
    } else if (currentTopicIndex.value < topicList.length - 1) {
      currentTopicIndex.value++
      currentContentIndex.value = 0
    } else {
      router.push('/result')
      ElMessage.success('棒棒哒 ~(｡≧3≦)ﾉ⌒☆')
    }
  }

  isMemorizing.value = !isMemorizing.value
}
</script>

<style scoped></style>

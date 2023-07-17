<template>
  <div class="bg-slate-400 flex rounded-lg">
    <div
      @click="
        () => {
          beforeAll()
          router.push('/')
        }
      "
      class="font-mono font-black text-white text-xl ml-4 mt-1.5 cursor-pointer hover:text-emerald-100 transition-all duration-500"
    >
      {{ $t('messages.appName') + ' ~' }}
    </div>
    <div class="flex-1 justify-end flex">
      <template v-if="router.currentRoute.value.name === 'list'">
        <div
          @click="router.push(`/start/${router.currentRoute.value.params.listName}`)"
          class="font-mono font-black text-white text-xl ml-4 mt-1.5 cursor-pointer hover:text-emerald-100 transition-all duration-500"
        >
          {{ '开始默写！' }}
        </div>
        <div class="bg-slate-300 w-1 h-full ml-4" />
      </template>
      <div
        @click="
          () => {
            beforeAll
            router.push('/history')
          }
        "
        class="font-mono font-black text-white text-xl ml-4 mt-1.5 cursor-pointer hover:text-emerald-100 transition-all duration-500"
      >
        {{ '过往默写记录' }}
      </div>
      <div class="bg-slate-300 w-1 h-full ml-4" />
      <div
        @click="
          () => {
            beforeAll()
            router.back()
          }
        "
        class="font-mono font-black text-white text-xl ml-4 mt-1.5 cursor-pointer hover:text-gray-200 text-right mr-4"
      >
        {{ '返回' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useStore } from '@/store/store'

const store = useStore()

const beforeAll = () => {
  store.dictationList = []
  store.resultList = []
}
</script>

<style scoped></style>

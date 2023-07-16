import type { dictation, dictationResult } from 'env'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('store', () => {
  const isLogin = ref(true)
  const dictationList = ref<Array<dictation>>([])
  const resultList = ref<Array<dictationResult>>([])
  return { isLogin, dictationList, resultList }
})

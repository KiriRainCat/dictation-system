<template>
  <nav>
    <CommonNav
      class="fixed top-0 z-[1] w-[calc(100vw-60px)] h-10 mx-6 mt-1 bg-opacity-60 hover:bg-opacity-100 transition-all duration-300"
    />
  </nav>
  <main class="bg-gray-100">
    <router-view v-slot="{ Component }">
      <transition name="el-fade-in" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie'
import { useStore } from './store/store'

const { locale, t } = useI18n()

const store = useStore()

onBeforeMount(() => {
  locale.value = localStorage.getItem('LANG')!
  document.title = t('messages.appName')

  if (Cookies.get('user') !== undefined) {
    store.isLogin = true
  }
})
</script>

<style scoped></style>
